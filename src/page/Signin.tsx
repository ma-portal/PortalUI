import React from 'react';
import { Image } from 'semantic-ui-react';
import Typed from 'typed.js';

export default class Signin extends React.Component {

    input: any = null

    componentDidMount() {
        new Typed('#title', {
            strings: ['Mobile AI Portal'],
            typeSpeed: 20,
            backSpeed: 0,
            fadeOut: true,
            loop: false,
            cursorChar: ''
        })
        let inputingAccount = true
        this.input.onchange = () => {
            
        }
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'rgb(210, 220, 230)',
                width: '100%', height: '100%',
                position: 'relative'
            }}>
                <div style={{
                    width: 350, height: 120,
                    border: '1px solid gray',
                    borderRadius: 5,
                    textAlign: 'center',
                    position: 'absolute',
                    top: '50%', marginTop: -60,
                    left: '50%', marginLeft: -175
                }}>
                    <Image src={require('../res/logo.png')} size='mini' style={{
                        display: 'inline-block',
                        position: 'relative',
                        top: -5
                    }}/>
                    <h2 id='title' style={{
                        display: 'inline-block',
                        fontFamily: 'Comic Sans MS, Verdana',
                        fontSize: '2em'
                    }}></h2>
                    <br/>
                    <input ref={(e: HTMLInputElement) => this.input = e} placeholder='input your credential' spellCheck={false} style={{
                        backgroundColor: 'rgb(200, 200, 200, 0.5)',
                        outline: 'none',
                        textDecoration: 'none',
                        border: '1px solid gray',
                        borderRadius: 5,
                        width: '60%', padding: '1px 3px',
                        boxSizing: 'border-box'
                    }}/>
                </div>
            </div>
        )
    }
}