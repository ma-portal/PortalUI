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
                        <Tab defaultActiveIndex={0} panes={[
                            { menuItem: intl.get('Home.Profile.Tab.Project'),
                                render: () => <Project account={this.props.account} /> },
                        ]} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

interface ProjectEntity {
    name: string;
    fork: boolean;
    disabled: boolean;
    description: string;
    htmlUrl: string;
    language: string;
    updatedAt: string;
    commit: number;
    stargazersCount: number;
    forksCount: number;
}

const weeklyCommitCount = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    20,
    46,
    5
];

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
                console.log(this.projects)
                // this.forceUpdate();
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
                                                <Label ribbon color='olive' as='a' href={e.htmlUrl}>{e.name}</Label>
                                                {e.fork && <Label circular><Icon name='food' />fork</Label>}
                                                {e.disabled && <Label circular>disabled</Label>}
                                            </List.Header>
                                            <p>{e.description}</p>
                                            { e.language &&
                                                <span className='margin2'>
                                                    {/* <Icon name='circle thin' style={{color: e.language.color}} /> */}
                                                    <span>{e.language}</span>
                                                </span>
                                            }
                                            <span className='margin2'>{e.updatedAt}</span>
                                            <WeeklyCommitCounts width={200} height={50} data={weeklyCommitCount} />
                                        </GridColumn>
                                        <GridColumn style={{
                                            textAlign: 'right',
                                            verticalAlign: 'bottom'
                                        }}>
                                            <Label>{e.commit} commits</Label>
                                            <Label><Icon name='star' />{e.stargazersCount}</Label>
                                            <Label><Icon name='fork' />{e.forksCount}</Label>
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

interface WCProps {
    width: number;
    height: number;
    data: number[];
    style?: any;
}

class WeeklyCommitCounts extends React.Component<WCProps> {

    componentDidMount() {
        const { width, height, data } = this.props;

        let canvas = this.refs.canvas as HTMLCanvasElement
        canvas.width = width
        canvas.height = height

        let ctx = canvas.getContext('2d')
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgb(100, 190, 170)'
        ctx.lineJoin = 'round'
        ctx.moveTo(0, height)
        let r = width / 52.0
        data.forEach((v, i) => {
            ctx.lineTo(r * i, height - v)
        })
        ctx.stroke()
    }

    render() {
        const {width, height, style} = this.props;
        return (
            <canvas ref='canvas' width={width} height={height} style={style} />
        )
    }

}