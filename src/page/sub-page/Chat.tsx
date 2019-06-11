import React from "react";
import { Grid, List, Image, Segment, Input, Label, TextArea, Form, Dimmer, Loader } from "semantic-ui-react";
import Intl from "../../com/Intl";
import format from 'string-template';
import AcceleratorManager, { CombineKey, KEYS } from "../../com/AcceleratorManager";
import Axios from "axios";
import APIs from "../../APIs";

const ReactEmoji = require('react-emoji') as any;

interface State {
    focusSearchInput: boolean;
    onlineNumber: number;
    loading: boolean;
}

interface Member {
    account: string;
    avatar: string;
    online: boolean;
    unreceivedMsg: number;
}

interface Message {
    timestamp: number;
    content: string;
    out: boolean;
}

export default class Chat extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            focusSearchInput: false,
            onlineNumber: 3,
            loading: false
        };
    }

    private members: {[account: string]: Member} = {};

    componentWillMount() {
        Axios.get(APIs.chat.member)
            .then((rep) => {
                this.members = {};
                for (let member of rep.data) {
                    this.members[member.account] = member;
                }
                this.forceUpdate();
            });
    }

    componentDidMount() {
        AcceleratorManager.enable(() => alert('send'),
            new CombineKey(KEYS.ENTER, false, true));
    }

    componentWillUnmount() {
        // AcceleratorManager.
    }
    
    private searchKey: string;

    search() {
        alert('search for: ' + this.searchKey);
    }

    private chatTarget: Member = {} as Member;
    private chatHistory: Message[] = [];

    chatWith(target: string) {
        this.setState({loading: true});
        Axios.get(APIs.chat.history + target)
            .then((rep) => {
                this.chatTarget = this.members[target];
                this.chatHistory = rep.data;
                this.setState({loading: false});
            });
    }

    render() {
        const { focusSearchInput, onlineNumber, loading } = this.state;
        let memberElems: JSX.Element[] = [];
        Object.keys(this.members).forEach((key, i) => {
            let member = this.members[key];
            memberElems.push(
                <List.Item key={i} onClick={() => this.chatWith(member.account)}>
                    <Image avatar src={member.avatar}
                        style={{filter: member.online ? 'none' : 'grayscale(100%)'}} />
                    <List.Content>
                        <List.Header>{member.account}</List.Header>
                    </List.Content>
                    { member.unreceivedMsg > 0 &&
                        <Label color='olive' circular style={{float: 'right'}}>
                            {member.unreceivedMsg}
                        </Label>
                    }
                </List.Item>
            );
        })
        return (
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Segment>
                            <Label ribbon color='blue'>
                                {format(Intl.get('Home.Chat.Online'), {num: onlineNumber})}
                            </Label>
                            <Input fluid size='mini'
                                onFocus={() => this.setState({focusSearchInput: true})}
                                onBlur={() => this.setState({focusSearchInput: false})}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key ==='Enter') {
                                        this.search();
                                    }
                                }}
                                onChange={(e) => this.searchKey = e.target.value }
                                placeholder={ Intl.get('Home.Chat.' + 
                                (!focusSearchInput ? 'SearchInputPlaceholder1' : 'SearchInputPlaceholder2')) }
                                style={{marginTop: 5}} />
                            <List animated selection verticalAlign='middle'>{memberElems}</List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment style={{
                            width: '100%', height: '100%',
                        }}>
                            <div style={{
                                width: '100%', height: 'calc(100% - 100px)'
                            }}>
                                <List>
                                    { this.chatHistory.map((v, i) =>
                                        <List.Item key={i}>
                                            <Image avatar src={this.chatTarget.avatar}
                                                style={{filter: this.chatTarget.online ? 'none' : 'grayscale(100%)'}} />
                                            <RichText content={v.content} />
                                        </List.Item>
                                    ) }
                                </List>
                            </div>
                            <Form>
                                <TextArea rows={4} placeholder={Intl.get('Home.Chat.SendMessagePlaceholder')}
                                    style={{resize: 'none'}}/>
                            </Form>
                            <Dimmer inverted active={loading}>
                                <Loader />
                            </Dimmer>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>              
            </Grid>
        )
    }

}

interface RichTextProps {
    content: string;
}

class RichText extends React.Component<RichTextProps> {

    parse() {
        const { content } = this.props;
        let ret: JSX.Element[] = [];
        let reg = /\[:(emoji|image)=(.*?)\]/g;
        let len = content.length, key = 0, lastIndex = reg.lastIndex;
        while (lastIndex < len) {
            let item = reg.exec(content);

            if (item) {
                if (item.index > lastIndex) {
                    ret.push(<span key={key++}>{content.substring(item.index, lastIndex)}</span>);
                }

                let type = item[1], value = item[2];
                if (type === 'emoji') {
                    ret.push(<span key={key++}>{ReactEmoji.emojify(value)}</span>);
                } else if (type === 'image') {

                } else {
                    throw new Error('unknown text command: ' + type + '=' + value);
                }

                lastIndex = reg.lastIndex;
            } else break;
        }
        if (lastIndex < len) {
            ret.push(<span key={key++}>{content.substring(lastIndex)}</span>);
        }
        return ret;
    }

    render() {
        return (
            <Label style={{
                marginLeft: 7,
                backgroundColor: 'rgb(100, 180, 220)'
            }} >
                {this.parse()}
            </Label>
        )
    }

}