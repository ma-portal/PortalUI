import React from 'react';
import { Image } from 'semantic-ui-react';
import Typed from 'typed.js';
import {Motion, spring} from 'react-motion';
import Events from '../Events';
import Axios from 'axios';

import Intl from '../com/Intl';

import Input from '../com/Input';
import Waiting from '../com/Waiting';
import eventService from '../com/EventService';
import APIs from '../APIs';
import BubbleMessage from '../com/BubbleMessage';

interface State {
    justSignin: boolean;
    waiting: boolean;
    focusPwInput: boolean;
    avatar: {
        account: string;
        url: string;
    };
}

// TODO: there is an obvious delay after the initial animation of signin bar to do signin action
export default class Signin extends React.Component<any, State> {

    private account: string;
    private password: string;
    private bubbleMessage: BubbleMessage;

    constructor(props: any) {
        super(props);
        this.state = {
            justSignin: false,
            waiting: false,
            focusPwInput: false,
            avatar: {
                account: '',
                url: ''
            }
        };
        this.bubbleMessage = new BubbleMessage();
    }

    componentDidMount() {
        if (!Intl.initialized()) {
            eventService.subscribe(Events.LocaleInitDone,
                () => {
                    new Typed('#quotes', {
                        strings: Intl.get('Signin.Quotes'),
                        typeSpeed: 50,
                        backSpeed: 0,
                        backDelay: 3000,
                        fadeOut: true,
                        loop: true,
                        cursorChar: '_'
                    });
                    this.forceUpdate();
            }, true);
        }
    }

    inputAccount(e: React.ChangeEvent<HTMLInputElement>) {
        this.account = e.target.value;
    }

    inputPassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.password = e.target.value;
    }

    signin() {
        // 值校验
        if (!this.account || !this.valueCheck(this.account)
            || !this.password || !this.valueCheck(this.password)) {
            this.bubbleMessage.message(
                Intl.get('Signin.IdentifyFailed'))
        } else {
            // 发起验证请求
            let credential = this.account + ':' + this.password;
            this.setState({waiting: true});
            Axios.get(APIs.account.signin + credential)
                .then((rep) => {
                    if (rep.data.identified) {
                        this.setState({justSignin: true});
                    } else {
                        Intl.get('Signin.IdentifyFailed');
                    }
                })
                .finally(() =>  this.setState({waiting: false}));
        }
    }

    private valueCheck(value: string): boolean {
        for (let c of value) {
            if (c.charCodeAt(0) === 95   // '_'
                || ('0' <= c && c <= '9')
                || ('A' <= c && c <= 'Z')
                || ('a' <= c && c <= 'z')
            )
                continue;
            return false;
        }
        return true;
    }

    afterSignin() {
        // TODO: jump page
        alert('jump page');
    }

    loadAvatar() {
        Axios.get(APIs.account.avatar + this.account)
            .then((rep) => {
                this.setState({
                    avatar: {
                        account: this.account,
                        url: rep.data.url
                    }
                });
                console.debug('avatar loaded, account: ' + this.account);
            })
    }

    render() {
        const { justSignin, waiting, focusPwInput, avatar } = this.state;

        let signinBarContent = ([
                <Image key='avatar' src={avatar.url || require('../res/img/default-avatar.png')}
                    circular size='small' style={{
                    position: 'absolute',
                    right: 330, top: 0,
                    transform: 'scale(0.8)',
                }}/>,
                <div key='input-group' style={{
                    width: 350, height: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 0, right: 0
                }}>
                    {this.bubbleMessage.render()}
                    <Image src={require('../res/img/logo.png')} size='mini' style={{
                        display: 'inline-block',
                        position: 'relative',
                        mixBlendMode: 'screen',
                        top: -8,
                    }}/>
                    <h2 id='title' style={{
                        display: 'inline-block',
                        fontFamily: 'Verdana',
                        textShadow: '1px 1px 3px black',
                        fontSize: '2em', color: 'white'
                    }}>Mobile AI Portal</h2>
                    <br/>
                    <Input transparent onChange={this.inputAccount.bind(this)}
                        onBlur={() => {
                            if (this.account &&
                                this.account !== avatar.account &&
                                this.valueCheck(this.account))
                                this.loadAvatar();
                            }
                        }
                        onKeyPress={(e) => {if (e.key === 'Enter') this.signin()}}
                        placeholder={Intl.get('Signin.AccountInputPlaceholder')}
                        style={{
                            textAlign: 'center',
                            color: 'white'}}
                        />
                    <Input transparent onChange={this.inputPassword.bind(this)} type='password'
                        onFocus={() => this.setState({focusPwInput: true})}
                        onBlur={() => this.setState({focusPwInput: false})}
                        onKeyPress={(e) => {if (e.key === 'Enter') this.signin()}}
                        placeholder={ Intl.get('Signin.' + 
                            (!focusPwInput ? 'PasswordInputPlaceholder1' : 'PasswordInputPlaceholder2')) }
                        style={{
                            textAlign: 'center',
                            color: 'white'}}
                        />
                    { waiting && <Waiting /> }
                </div>
        ])
        let baseStyle: {[key: string]: any;} = {
            width: 750, height: 150,
            position: 'absolute',
            top: '60%', marginTop: -75,
            left: -10,
            marginLeft: 0,
            borderRadius: 5,
            backgroundColor: 'rgb(65, 65, 65)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)'
        };
        let signinBar;
        if (justSignin) {
            signinBar = 
                <Motion key='motion' defaultStyle={{left: -10}}
                    onRest={this.afterSignin.bind(this)}
                    style={{left: spring(-750, {stiffness: 60, damping: 10})}}>
                    { value => <div style={Object.assign({}, baseStyle, {left: value.left})}>{signinBarContent}</div> }
                </Motion>;
        } else {
            signinBar = 
                <Motion key='motion' defaultStyle={{left: -750}}
                    style={{left: spring(-10, {stiffness: 60, damping: 15})}}>
                    { value => <div style={Object.assign({}, baseStyle, {left: value.left})}>{signinBarContent}</div> }
                </Motion>;
        }
        return ([
            signinBar,
            <div key='quotes' style={{
                width: 500,
                position: 'absolute',
                top: '10%', left: '78%',
                marginLeft: -250,
                textAlign: 'center',
                lineHeight: '1.5em',
                fontSize: '2em', color: 'white'
            }}>
                <span id='quotes'></span>
            </div>
        ])
    }

}