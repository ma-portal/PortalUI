import React from "react";
import { Input, Select, Button, Icon, Image, Dimmer } from "semantic-ui-react";
import { toast } from "react-toastify";
import Intl from "../../com/Intl";
import eventService from "../../com/EventService";
import Events from "../../Events";

const searchFilter = [
    { key: 'article', text: 'Article', value: 'article' },
    { key: 'code', text: 'Code', value: 'code' },
]

let displayed = false;

export default class KBS extends React.Component {

    componentDidMount() {
        if (!displayed) {
            let notify = () => toast.warn(
                <span dangerouslySetInnerHTML={{
                    __html: Intl.get('Home.KBS.notSupported')
                }} />,
                { autoClose: false, position: toast.POSITION.BOTTOM_LEFT }
            );
            if (Intl.initialized()) {
                notify();
            } else {
                eventService.subscribe(Events.LocaleInitDone, notify, true);
            }
            displayed = true;
        }
    }

    render() {
        return (
            <Dimmer.Dimmable dimmed={true} style={{
                position: 'relative',
                width: '100%', height: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    height: 300, width: 500,
                    marginTop: -150, marginLeft: -250
                }}>
                    <Dimmer active={true} inverted />
                    <Image src={require('../../res/img/KBS-Title.png')} size='medium' />
                    <Input fluid type='text' placeholder='Search...' action>
                        <input />
                        <Select compact options={searchFilter} defaultValue='article' />
                        <Button type='submit'>
                            <Icon name='search' />
                        </Button>
                    </Input>
                </div>
            </Dimmer.Dimmable>
        )
    }

}