import React from 'react';
import Signin from './page/Signin';
import Home from './page/Home';

interface State {
    inHomePage: boolean;
}

export default class App extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            inHomePage: true
        }
    }

    render() {
        const { inHomePage } = this.state;
        return (
            <div style={{
                    position: 'relative',
                    width: '100%', height: '100%',
                }}>
                <div style={{
                    backgroundImage: 'url(' + require('./res/backimg.jpg') + ')',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    width: '100%', height: '100%',
                    top: 0, left: 0,
                    filter: inHomePage ? 'blur(2px)' : ''
                }} />
                {/* <Signin /> */}
                <Home />
            </div>
        );
    }

}
