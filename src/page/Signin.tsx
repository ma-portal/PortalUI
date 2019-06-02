import React from 'react';
import { Image } from 'semantic-ui-react';

const Signin: React.FC = () => {
    return (
        <div style={{
            backgroundImage: 'url(' + require('../res/backimg.png') + ')',
            backgroundSize: 'cover',
            width: '100%', height: '100%',
            position: 'relative'
        }}>
            <div style={{
                border: '1px solid black',
                position: 'absolute',
                width: 300, height: 300,
                right: 100, bottom: 100
            }}>
                <Image src={require('../res/logo.png')} size='small' />
            </div>
        </div>
    )
}

export default Signin;