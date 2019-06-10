import React from 'react';
import Signin from './page/Signin';
import Home from './page/Home';
import eventService, { EventHandler } from './com/EventService';
import Events from './Events';
import Intl from 'react-intl-universal';

const locales = {
    'en-US': require('./res/locale/en-US.json'),
    'zh-CN': require('./res/locale/zh-CN.json'),
};

const defaultLocale = 'zh-CN';

export default class App extends React.Component {

    private localeChangeHandler: EventHandler;

    componentDidMount() {
        // 当locale变化之后刷新整个application
        Intl.init({ currentLocale: defaultLocale, locales, warningHandler: () => {} })
            .then(() => {
                eventService.publish(Events.LocaleInitDone);
                this.forceUpdate();
                console.debug('intl-universal initialized');
            });
        this.localeChangeHandler = eventService.subscribe(Events.LocaleChange,
            () => this.forceUpdate());
    }

    componentWillUnmount() {
        eventService.unsubscribe(this.localeChangeHandler);
    }

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
                {/* <Signin /> */}
                <Home newGuyHere={true} />
            </div>
        );
    }

}
