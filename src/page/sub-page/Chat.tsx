import React from "react";
import { Grid, List, Image, Segment, Input, Label, TextArea, Form, Dimmer, Loader, Modal, Button, Icon } from "semantic-ui-react";
import Intl from "../../com/Intl";
import format from 'string-template';
import AcceleratorManager, { CombineKey, KEYS } from "../../com/AcceleratorManager";
import Axios from "axios";
import APIs from "../../APIs";
import EmojiNames from '../../res/emoji-names.json';
import 'emoji.css/dist/emoji.min.css';

interface Props {
    account: string;
    avatar: string;
}

interface State {
    focusSearchInput: boolean;
    onlineNumber: number;
    imageModalOpen: boolean;
    activeDimmer: boolean;
    loading: boolean;
    editingMessage: string;
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

/**
 * 图片不能包含在文本消息中，但是连续的消息上传到服务器后会被合并为一条
 */
export default class Chat extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            focusSearchInput: false,
            onlineNumber: 3,
            imageModalOpen: false,
            activeDimmer: false,
            loading: false,
            editingMessage: ''
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
        AcceleratorManager.disable(new CombineKey(KEYS.ENTER, false, true));
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
                this.setState({activeDimmer: false, loading: false});
            });
    }

    parseRichText(content: string) {
        let ret: JSX.Element[] = [];
        let reg = /\[:(emoji|image|html)=(.*?)\]/g;
        let len = content.length, key = 0, lastIndex = reg.lastIndex;
        while (lastIndex < len) {
            let item = reg.exec(content);

            if (item) {
                if (item.index > lastIndex) {
                    ret.push(<span key={key++}>{content.substring(item.index, lastIndex)}</span>);
                }

                let type = item[1], value = item[2];
                if (type === 'emoji') {
                    ret.push(<span key={key++} className={'ec ' + value}></span>);
                } else if (type === 'image') {
                    ret.push(<Image key={key++} src={value} onClick={() => this.showImage(value)}
                        size='massive' style={{margin: '2px 0px'}} />);
                } else if (type === 'html') {
                    ret.push(<span key={key++} dangerouslySetInnerHTML={{__html: value}} />);
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

    private imageToDisplay: string;

    showImage(url: string) {
        this.imageToDisplay = url;
        this.setState({imageModalOpen: true});
    }

    sendMessage() {

    }

    render() {
        const { account, avatar } = this.props;
        const { focusSearchInput, onlineNumber, imageModalOpen,
                activeDimmer, loading, editingMessage } = this.state;

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
        });

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
                                display: 'block', position: 'relative',
                                width: '100%', height: 'calc(100% - 140px)',
                            }}>
                                {/* TODO: scroll */}
                                <List style={{
                                    height: '100%',
                                    display: 'block',
                                }}>
                                    { this.chatHistory.map((v, i) =>
                                        <List.Item key={i} style={{marginTop: 8, marginBottom: 8}}>
                                            <List.Content floated={v.out ? 'right' : 'left'}>
                                                <Image avatar src={v.out ? this.props.avatar : this.chatTarget.avatar}
                                                    style={{filter: v.out || this.chatTarget.online ? 'none' : 'grayscale(100%)'}} floated={v.out ? 'right' : 'left'} />
                                                <Label style={{
                                                    marginLeft: 7,
                                                    backgroundColor: 'rgb(100, 150, 220)',
                                                    borderRadius: 10,
                                                    color: 'white',
                                                    letterSpacing: 1,
                                                    lineHeight: 2
                                                }}>
                                                    {this.parseRichText(v.content)}
                                                </Label>
                                            </List.Content>
                                        </List.Item>
                                    ) }
                                </List>
                            </div>
                            <Modal open={imageModalOpen} basic size='large'
                                onClose={() => {
                                    this.setState({imageModalOpen: false});
                                    this.imageToDisplay = require('../../res/img/image.png')
                                }} >
                                <Modal.Content>
                                    <Image src={this.imageToDisplay} fluid />
                                </Modal.Content>
                            </Modal>
                            <Form>
                                <div style={{margin: '5px 0px'}}>
                                    <Button icon compact onClick={() => (this.refs.imageInput as any).click()}>
                                        <Icon name='image' />
                                        <input ref='imageInput' type='file' style={{display: 'none'}} />
                                    </Button>
                                    <LazyLoadList length={EmojiNames.length}
                                        load={(i) =>
                                            <Button compact key={i} size='mini' onClick={
                                                () => this.setState((prev) => ({editingMessage: prev.editingMessage})) }>
                                                <span className={'ec ' + EmojiNames[i]} />
                                            </Button>
                                        }
                                        style={{
                                            display: 'inline-block'
                                        }}
                                    />
                                </div>
                                <TextArea rows={4} placeholder={Intl.get('Home.Chat.SendMessagePlaceholder')}
                                    onChange={(e) => this.setState({editingMessage: e.currentTarget.value})}
                                    value={editingMessage}
                                    style={{
                                        resize: 'none',
                                        letterSpacing: 1
                                    }}/>
                            </Form>
                            <Dimmer inverted active={activeDimmer}>
                                { loading && <Loader /> }
                            </Dimmer>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>              
            </Grid>
        )
    }

}

interface LazyLoadListProps {
    capacity?: number;
    length: number;
    load: (index: number) => JSX.Element;
    style?: any;
}

const defaultCapacity = 10;

interface LazyLoadListState {
    start: number;
}

class LazyLoadList extends React.Component<LazyLoadListProps, LazyLoadListState> {

    constructor(props: LazyLoadListProps) {
        super(props);
        this.state = {
            start: 0
        };
    }

    prevPage() {
        this.setState((prev) =>
            ({start: prev.start - (this.props.capacity || defaultCapacity)}));
    }

    nextPage() {
        this.setState((prev) =>
            ({start: prev.start + (this.props.capacity || defaultCapacity)}));
    }

    render() {
        const { capacity=defaultCapacity, length, load, style } = this.props;
        const { start } = this.state;

        let items: JSX.Element[] = [];
        for (let i = start, limit = start + capacity; i < limit && i < length; i++) {
            items.push(load(i))
        }

        return (
            <div style={Object.assign({}, {margin: 5}, style)}>
                <Button icon size='mini' onClick={() => this.prevPage()}
                    disabled={start === 0}
                    style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                    <Icon name='angle left' />
                </Button>
                { items }
                <Button icon size='mini' onClick={() => this.nextPage()}
                    disabled={start + capacity >= length }
                    style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                    <Icon name='angle right' />
                </Button>
            </div>
        );
    }

}