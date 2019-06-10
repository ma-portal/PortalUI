import React from "react";
import { Sidebar, Segment, Menu } from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AcceleratorManager, { CombineKey, KEYS } from '../com/AcceleratorManager';
import Intl from "../com/Intl";

import eventService from "../com/EventService";
import Events from "../Events";
import KBS from "./sub-page/KBS";
import Profile from "./sub-page/Profile";
import Chat from "./sub-page/Chat";
import Main from "./sub-page/Main";
import Choose from "../com/Choose";
import Settings from "./sub-page/Settings";

interface Props {
    newGuyHere: boolean
}

interface State {
    sideBarVisible: boolean;
    activePage: number;
}

export default class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sideBarVisible: false,
            activePage: 2
        };
    }

    componentDidMount() {
        // 绑定快捷键
        AcceleratorManager.register(() => this.toggleSideBar(),
            new CombineKey(KEYS.Q, false, true));
        // send toast if needed
        if (this.props.newGuyHere) {
            let notify = () => toast(
                <span dangerouslySetInnerHTML={{
                    __html: Intl.get('', 'Home.Profile.forNewHere')
                }} />,
                { position: toast.POSITION.BOTTOM_LEFT }
            );
            if (Intl.initialized()) {
                notify();
            } else {
                eventService.subscribe(Events.LocaleInitDone, notify, true);
            }
        }
    }

    toggleSideBar() {
        this.setState(
            prevState => ({sideBarVisible: !prevState.sideBarVisible}));
    }

    render() {
        const { sideBarVisible, activePage } = this.state;
        const createClickHandler = (i: number) => {
            return () => this.setState({activePage: i});
        }
        return (
            <Sidebar.Pushable as={Segment} style={{
                width: '100%', height: '100%',
                margin: 0, border: 'none',
                borderRadius: '0',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    direction='right'
                    vertical
                    visible={sideBarVisible}
                    width='thin'
                    style={{ borderLeft: '5px solid rgb(50, 150, 205)' }}>
                    { [ 'Main', 'KBS', 'Chat', 'Profile', 'Settings' ].map(
                        (v, i) => 
                            <Menu.Item key={v} as='a' onClick={createClickHandler(i)}>
                                {Intl.get(v, 'Home.NavigationItems.' + v)}
                            </Menu.Item>
                    ) }
                </Sidebar>
                <Sidebar.Pusher dimmed={false} style={{
                    width: '100%', height: '100%',
                }}>
                    <Segment basic style={{
                        position: 'relative',
                        padding: 0,
                        width: '100%', height: '100%',
                    }}>
                        <Choose activeItem={activePage}
                            items={[
                                <Main />,
                                <KBS />,
                                <Chat />,
                                // TODO: replace with real account
                                <Profile account='Luncert' />,
                                <Settings />
                            ]} />
                        <ToastContainer autoClose={8000} />
                    </Segment>
                </Sidebar.Pusher>
                {/* <Button onClick={this.toggleSideBar.bind(this)}
                    style={{
                        position: 'absolute',
                        height: 50, width: 50,
                        bottom: -25, left: '50%',
                        marginLeft: -25,
                        borderRadius: '50%',
                        // border: '5px solid rgb(50, 150, 205)',
                        backgroundColor: 'rgb(50, 150, 205)',
                        boxShadow: '0px 0px 2px gray',
                        margin: 0, padding: 0,
                        zIndex: 100
                    }}>
                    <Icon inverted name='circle outline' style={{position: 'relative', top: -10, margin: '0px auto'}}></Icon>
                </Button> */}
            </Sidebar.Pushable>
        )
    }

}