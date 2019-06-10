import React from "react";
import { Grid, List, Image, Segment, Input, Label } from "semantic-ui-react";
import Intl from "../../com/Intl";
import format from 'string-template';

interface State {
    focusSearchInput: boolean;
    onlineNumber: number;
}

export default class Chat extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            focusSearchInput: false,
            onlineNumber: 3
        };
    }
    
    private searchKey: string;

    search() {
        alert('search for: ' + this.searchKey);
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
                                {format(Intl.get('online: {num}', ''), {num: onlineNumber})}
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
                                placeholder={ Intl.get('Search', 'Home.Chat.' + 
                                (!focusSearchInput ? 'SearchInputPlaceholder1' : 'SearchInputPlaceholder2')) }
                                style={{marginTop: 5}} />
                            <List animated selection verticalAlign='middle'>
                                <List.Item>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'
                                    style={{filter: 'grayscale(100%)'}} />
                                    <List.Content>
                                        <List.Header>Helen</List.Header>
                                    </List.Content>
                                    <Label color='olive' circular style={{float: 'right'}}>1</Label>
                                </List.Item>
                                <List.Item>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                                    <List.Content>
                                        <List.Header>Christian</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                                    <List.Content>
                                        <List.Header>Daniel</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: 5,
                            backgroundColor: 'rgb(120, 120, 120)'
                        }}>
                        </div>
                    </Grid.Column>
                </Grid.Row>                
            </Grid>
        )
    }

}