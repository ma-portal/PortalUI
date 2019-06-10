import React from "react";
import { Grid, List, Image, Segment, Input, Label, TextArea, Form } from "semantic-ui-react";
import Intl from "../../com/Intl";
import format from 'string-template';
import AcceleratorManager, { CombineKey, KEYS } from "../../com/AcceleratorManager";
import Axios from "axios";
import APIs from "../../APIs";

interface State {
    focusSearchInput: boolean;
    onlineNumber: number;
}

interface Member {
    account: string;
    avatar: string;
    online: boolean;
    unreceivedMsg: number;
}

export default class Chat extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            focusSearchInput: false,
            onlineNumber: 3
        };
    }

    private members: Member[] = [];

    componentWillMount() {
        Axios.get(APIs.chat.member)
            .then((rep) => {
                this.members = rep.data;
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

    chatWith(target: string) {
        alert('chat with: ' + target);
    }

    render() {
        const { focusSearchInput, onlineNumber } = this.state;
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
                            <List animated selection verticalAlign='middle'>
                                { this.members.map((v, i) => 
                                    <List.Item onClick={() => this.chatWith(v.account)}>
                                        <Image avatar src={v.avatar}
                                            style={{filter: v.online ? 'none' : 'grayscale(100%)'}} />
                                        <List.Content>
                                            <List.Header>{v.account}</List.Header>
                                        </List.Content>
                                        { v.unreceivedMsg > 0 &&
                                            <Label color='olive' circular style={{float: 'right'}}>
                                                {v.unreceivedMsg}
                                            </Label>
                                        }
                                    </List.Item>
                                ) }
                            </List>
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
                                    <List.Item>hi
                                    </List.Item>
                                </List>
                            </div>
                            <Form>
                                <TextArea rows={4} placeholder={Intl.get('Home.Chat.SendMessagePlaceholder')}
                                    style={{resize: 'none'}}/>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>              
            </Grid>
        )
    }

}