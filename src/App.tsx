import React from 'react';

import Signin from './page/Signin';
import Home from './page/Home';
import eventService, { EventHandler } from './com/EventService';
import Events from './Events';
import Choose from './com/Choose';

interface State {
    activePage: number;
}

// TODO: redux
export default class App extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            activePage: 0
        }
    }

    private localeChangeHandler: EventHandler;

    componentDidMount() {
        // 当locale变化之后刷新整个application
        this.localeChangeHandler = eventService.subscribe(Events.LocaleChange,
            () => this.forceUpdate());
    }

    componentWillUnmount() {
        eventService.unsubscribe(this.localeChangeHandler);
    }

    render() {
        const { activePage } = this.state;
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
                <Choose activeItem={activePage}
                    items={[
                        <Signin afterSignin={() => this.setState({activePage: 1})} />,
                        <Home newGuyHere={true} />
                    ]} />
            </div>
        );
    }

}
