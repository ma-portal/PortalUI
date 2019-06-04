import React from 'react';
import { Image } from 'semantic-ui-react';
import Typed from 'typed.js';
import {Motion, spring} from 'react-motion';

import Input from '../com/Input';
import Waiting from '../com/Waiting';

const quotes = [
    'The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.',
    'Failure is simply the opportunity to begin again, this time more intelligently.',
    'There are no great limits to growth because there are no limits of human intelligence, imagination, and wonder.',
    'Being busy does not always mean real work. The object of all work is production or accomplishment and to either of these ends there must be forethought, system, planning, intelligence, and honest purpose, as well as perspiration. Seeming to do is not doing.',
    'I know that I am intelligent, because I know that I know nothing.',
    'People who fail to use their emotional intelligence skills are more likely to turn to other, less effective means of managing their mood. They are twice as likely to experience anxiety, depression, substance abuse, and even thoughts of suicide.',
]

interface State {
    justInit: boolean;
    justSignin: boolean;
    waiting: boolean;
}

interface Props {

}

// TODO: there is an obvious delay after the initial animation of signin bar to do signin action
export default class Signin extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            justInit: true,
            justSignin: false,
            waiting: false
        };
    }

    componentDidMount() {
        new Typed('#quotes', {
            strings: quotes,
            typeSpeed: 50,
            backSpeed: 0,
            backDelay: 3000,
            fadeOut: true,
            loop: true,
            cursorChar: '_'
        })
    }

    inputAccount(e: any) {}

    inputPassword(e: any) {}

    afterInitialize() {
        this.setState({justInit: false});
    }

    signin() {
        if (!this.state.justInit) {
            this.setState({justSignin: true});
        }
    }

    afterSignin() {
        // TODO: jump page
        alert('jump page');
    }

    render() {
        const { justInit, justSignin, waiting } = this.state;

        let signinBarContent = ([
                <Image key='avatar' src={require('../res/avatar.png')} size='small' style={{
                    position: 'absolute',
                    right: 330, top: 0,
                    transform: 'scale(0.8)',
                    mixBlendMode: 'exclusion'
                }}/>,
                <div key='input-group' style={{
                    width: 350, height: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 0, right: 0
                }}>
                    <Image src={require('../res/logo.png')} size='mini' style={{
                        display: 'inline-block',
                        position: 'relative',
                        mixBlendMode: 'screen',
                        top: -8,
                    }}/>
                    <h2 id='title' style={{
                        display: 'inline-block',
                        fontFamily: 'Verdana',
                        fontSize: '2em', color: 'white'
                    }}>Mobile AI Portal</h2>
                    <br/>
                    <Input transparent onChange={this.inputAccount} placeholder='Account'
                        style={{
                            textAlign: 'center',
                            color: 'white'}}
                        />
                    <Input transparent onChange={this.inputPassword} placeholder='Password' type='password'
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
            backgroundColor: 'rgba(0, 0, 0, 0)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)'
        };
        let signinBar;
        if (justInit) {
            signinBar = 
                <Motion key='motion' defaultStyle={{left: -750}}
                    onRest={this.afterInitialize.bind(this)}
                    style={{left: spring(-10, {stiffness: 60, damping: 15})}}>
                    { value => <div style={Object.assign({}, baseStyle, {left: value.left})}>{signinBarContent}</div> }
                </Motion>;
        } else if (justSignin) {
            signinBar = 
                <Motion key='motion' defaultStyle={{left: -10}}
                    onRest={this.afterSignin.bind(this)}
                    style={{left: spring(-750, {stiffness: 60, damping: 10})}}>
                    { value => <div style={Object.assign({}, baseStyle, {left: value.left})}>{signinBarContent}</div> }
                </Motion>;
        } else {
            signinBar = <div key='non-motion' style={baseStyle}>{signinBarContent}</div>;
        }
        return ([
            signinBar,
            <div key='quotes' style={{
                width: 500, height: 500,
                position: 'absolute',
                top: '10%',
                left: '78%', marginLeft: -250,
                textAlign: 'center',
                lineHeight: '1.5em',
                fontSize: '2em', color: 'white'
            }}>
                <span id='quotes'></span>
            </div>
        ])
    }

}