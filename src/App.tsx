import React from 'react';
import Signin from './page/Signin';
import Home from './page/Home';

export default class App extends React.Component {

    render() {
        return (
            <div style={{
                    position: 'relative',
                    width: '100%', height: '100%',
                }}>
                <div style={{
                    backgroundImage: 'url(' + require('./res/img/backimg.jpg') + ')',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    width: '100%', height: '100%',
                    top: 0, left: 0,
                }} />
                <Signin />
                {/* <Home /> */}
            </div>
        );
    }

}
