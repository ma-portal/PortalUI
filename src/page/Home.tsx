import React from "react";
import { Sidebar, Segment, Header, Image, Menu, Icon } from "semantic-ui-react";

export default class Home extends React.Component {

    render() {
        return (
            <Sidebar.Pushable as={Segment} style={{
                
            }}>
                <Sidebar
                    as={Menu}
                    animation='slide out'
                    direction='left'
                    icon='labeled'
                    inverted
                    vertical
                    visible={true}
                    width='thin'
                >
                    <Menu.Item as='a'>
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                    <Menu.Item as='a'>
                    <Icon name='gamepad' />
                    Games
                    </Menu.Item>
                    <Menu.Item as='a'>
                    <Icon name='camera' />
                    Channels
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={true}>
                    <Segment basic>
                    <Header as='h3'>Application Content</Header>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }

}