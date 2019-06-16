import React from "react";
import { Card, Image, Grid, Tab, List, Label, Icon, GridRow, GridColumn } from "semantic-ui-react";
import Axios from "../../com/Axios";
import format from 'string-template';

import APIs from "../../APIs";
import intl from "../../com/Intl";
import Division from "../../com/Division";

const VIS = require('react-vis') as any;
const randomColor = require('random-color') as any;

interface Props {
    account: string;
}

export default class Profile extends React.Component<Props> {

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
        Axios.get(APIs.user.profile)
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
                                    <span>{format(intl.get('Home.Profile.ClassOf'), { classOf })}</span>
                                    <span>{format(intl.get('Home.Profile.JoinedTime'), { year, month })}</span>
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
                        <Tab defaultActiveIndex={1} panes={[
                            { menuItem: intl.get('Home.Profile.Tab.Statistics'),
                                render: () => <Statistics /> },
                            { menuItem: intl.get('Home.Profile.Tab.Project'),
                                render: () => <Project account={this.props.account} /> },
                        ]} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

// TODO:
class Statistics extends React.Component {

    render() {
        return (
            <Tab.Pane>
                <VIS.XYPlot
                    width={300}
                    height={300}>
                    <VIS.HorizontalGridLines />
                    <VIS.LineSeries
                        data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                        ]}/>
                    <VIS.XAxis />
                    <VIS.YAxis />
                </VIS.XYPlot>
            </Tab.Pane>
        );
    }

}

interface ProjectEntity {
    name: string;
    link: string;
    language: {
        type: string;
        color: string;
    };
    lastUpdate: string;
    commit: number;
    start: number;
}

class Project extends React.Component<Props> {

    private projects: ProjectEntity[];

    constructor(props: Props) {
        super(props);
        this.projects = [];
    }

    componentDidMount() {
        Axios.get(APIs.user.project)
            .then((rep) => {
                this.projects = rep.data;
                this.forceUpdate();
            });
    }

    render() {
        return (
            <Tab.Pane>
                <List divided relaxed>
                    { this.projects.map((e, i) =>
                        <List.Item key={i}>
                            <List.Content>
                                <Grid divided='vertically'>
                                    <GridRow columns={2}>
                                        <GridColumn>
                                            <List.Header>
                                                <Label ribbon color='olive' as='a' href={e.link}>{e.name}</Label>
                                            </List.Header>
                                            { e.language &&
                                                <span className='margin2'>
                                                    <Icon name='circle thin' style={{color: e.language.color}} />
                                                    <span>{e.language.type}</span>
                                                    <Division vertical style={{height: '30%', marginBottom: 0}}/>
                                                </span>
                                            }
                                            <span className='margin2'>{e.lastUpdate}</span>
                                        </GridColumn>
                                        <GridColumn style={{
                                            textAlign: 'right',
                                            verticalAlign: 'bottom'
                                        }}>
                                            <Label>{e.commit} commits</Label>
                                            <Label><Icon name='star' />{e.start}</Label>
                                        </GridColumn>
                                    </GridRow>
                                </Grid>
                            </List.Content>
                        </List.Item>
                    )}
                </List>
            </Tab.Pane>
        );
    }
    
}