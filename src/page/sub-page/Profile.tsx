import React from "react";
import { Card, Image, Grid, Tab, List, Label } from "semantic-ui-react";
import Axios from "axios";
import APIs from "../../APIs";
import format from 'string-template';
import intl from "../../com/IntlWrapper";
const randomColor = require('random-color') as any;

interface State {
    // profile
}

interface Props {
    account: string;
}

export default class Profile extends React.Component<Props, State> {

    private profile: {[key: string]: any};

    constructor(props: Props) {
        super(props);
        this.profile = {
            account: '',
            realName: '',
            classOf: 0,
            joinedTime: {
                year: 0,
                month: 0,
            },
            desc: '',
            tags: [],
            email: '',
            qq: '',
            phone: '',
            avatar: ''
        };
    }

    componentDidMount() {
        Axios.get(APIs.account.profile + this.props.account)
            .then((rep) => {
                for (let key of Object.keys(rep.data)) {
                    this.profile[key] = rep.data[key];
                }
                this.forceUpdate();
            });
    }
    
    render() {
        const { account, realName, classOf, joinedTime, desc, tags, email, qq, phone, avatar } = this.profile;
        const { year, month } = joinedTime;
        return (
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Card>
                            <Image src={avatar || require('../../res/img/default-avatar.png')} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{account}</Card.Header>
                                <Card.Meta>
                                    <strong>{realName}</strong>
                                    <span>{format(intl.get('Class {classOf}', 'Home.Profile.ClassOf'), { classOf })}</span>
                                    <span>{format(intl.get('Joined in {year}/{month}', 'Home.Profile.JoinedTime'), { year, month })}</span>
                                </Card.Meta>
                                { (tags as string[]).map((tag, index) =>
                                    <Label key={index} style={{
                                        backgroundColor: randomColor().rgbString(),
                                        margin: 2
                                         }}>
                                        {tag}
                                    </Label>) }
                                <Card.Description>{desc}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <List>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>
                                            <a href='mailto:jack@semantic-ui.com'>{email}</a>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='qq' />
                                        <List.Content>
                                            <span>{qq}</span>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='phone' />
                                        <List.Content>
                                            <span>{phone}</span>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Tab panes={[
                            { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
                            { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
                            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
                        ]} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}