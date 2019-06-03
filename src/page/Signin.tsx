import React from 'react';
import { Image } from 'semantic-ui-react';
import Typed from 'typed.js';

import Input from '../com/Input';

const quotes = [
    'The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.',
    'Failure is simply the opportunity to begin again, this time more intelligently.',
    'There are no great limits to growth because there are no limits of human intelligence, imagination, and wonder.',
    'Being busy does not always mean real work. The object of all work is production or accomplishment and to either of these ends there must be forethought, system, planning, intelligence, and honest purpose, as well as perspiration. Seeming to do is not doing.',
    'I know that I am intelligent, because I know that I know nothing.',
    'People who fail to use their emotional intelligence skills are more likely to turn to other, less effective means of managing their mood. They are twice as likely to experience anxiety, depression, substance abuse, and even thoughts of suicide.',
]

export default class Signin extends React.Component {

    componentDidMount() {
        new Typed('#title', {
            strings: ['Mobile AI Portal'],
            typeSpeed: 20,
            backSpeed: 0,
            fadeOut: true,
            loop: false,
            cursorChar: ''
        })
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

    signin() {}

    render() {
        return (
            <div style={{
                backgroundImage: 'url(' + require('../res/backimg.jpg') + ')',
                backgroundSize: 'cover',
                width: '100%', height: '100%',
                position: 'relative'
            }}>
                <div style={{
                    width: 750, height: 150,
                    position: 'absolute',
                    top: '60%', marginTop: -75,
                    left: -10, marginLeft: 0,
                    borderRadius: 5,
                    backgroundColor: 'rgba(100, 100, 100, 0.1)',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)'
                }}>
                    <Image src={require('../res/avatar.png')} size='small' style={{
                        position: 'absolute',
                        right: 330, top: 0,
                        transform: 'scale(0.8)',
                        mixBlendMode: 'exclusion'
                    }}/>
                    <div style={{
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
                        }}></h2>
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
                    </div>
                </div>
                <div style={{
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
            </div>
        )
    }
}