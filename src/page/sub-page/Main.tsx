import React from "react";
import { Grid, Segment, Pagination, List, Label, Statistic } from "semantic-ui-react";
import { Motion, spring } from "react-motion";
import Intl from "../../com/Intl";
import Input from "../../com/Input";
import Loading from "../../com/Loading";

interface State {
    focusSearchInput: boolean;
    loading: boolean;
}

export default class Main extends React.Component<any, State> {

    private searchKey: string;

    constructor(props: any) {
        super(props);
        this.state = {
            focusSearchInput: false,
            loading: false
        };
    }

    inputSearch(e: React.ChangeEvent<HTMLInputElement>) {
        this.searchKey = e.target.value;
    }

    search() {
        alert('searching: ' + this.searchKey);
    }

    render() {
        const { focusSearchInput, loading } = this.state;
        return (
            // adjust the width according to device type
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={12}>
                        <Motion defaultStyle={{opacity: 1, left1: 0, left2: 100}}
                            style={{
                                opacity: spring(0.7),
                                left1: spring(0),
                                left2: spring(0)
                            }}>
                            { value =>
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    textAlign: 'center',
                                    width: '100%', height: '40%',
                                    borderRadius: 5,
                                    boxShadow: '0px 0px 3px gray'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%', height: '100%',
                                        backgroundImage: 'url(' + require('../../res/img/backimg.jpg') + ')',
                                        backgroundSize: 'cover',
                                        left: value.left1 + '%',
                                        bottom: 0,
                                        opacity: value.opacity
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%', height: '100%',
                                        backgroundImage: 'url(' + require('../../res/img/backimg.jpg') + ')',
                                        backgroundSize: 'cover',
                                        left: value.left2 + '%',
                                    }} />
                                    <Pagination inverted pointing secondary
                                        defaultActivePage={1} totalPages={3}
                                        firstItem={null} lastItem={null}
                                        // onPageChange={this.handlePaginationChange}
                                        style={{
                                            position: 'relative',
                                            top: 'calc(100% - 45px)'
                                        }} />
                                </div>
                            }
                        </Motion>
                        <Segment>
                            <Label color='orange' ribbon>
                                {Intl.get('Home.Main.News')}
                            </Label>
                            <Input transparent onChange={this.inputSearch.bind(this)}
                                onFocus={() => this.setState({focusSearchInput: true})}
                                onBlur={() => this.setState({focusSearchInput: false})}
                                onKeyPress={(e) => {if (e.key === 'Enter') this.search()}}
                                placeholder={ Intl.get('Home.Main.' + 
                                    (!focusSearchInput ? 'SearchPlaceholder1' : 'SearchPlaceholder2')) }
                                style={{float: 'right'}} />
                            <Loading actived={loading} />
                            <List divided relaxed>
                                {/* { this.projects.map((e, i) =>
                                    <List.Item key={i}>
                                        <List.Content>
                                        </List.Content>
                                    </List.Item>
                                )} */}
                                <List.Item key={0}>
                                    <List.Content>
                                        <List.Header as='a' href='#card-example-link-card'>2019招新开始啦！</List.Header>
                                        <List.Description as='a'>Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.</List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            {/* TODO: change the color depending on the value */}
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column style={{textAlign: 'center'}}>
                                        <Statistic color='green'>
                                            <Statistic.Value>25</Statistic.Value>
                                            <Statistic.Label>{Intl.get('Home.Main.WeeklyCommits')}</Statistic.Label>
                                        </Statistic>
                                    </Grid.Column>
                                    <Grid.Column style={{textAlign: 'center'}}>
                                        <Statistic color='blue'>
                                            <Statistic.Value>2</Statistic.Value>
                                            <Statistic.Label>{Intl.get('Home.Main.ActiveProjects')}</Statistic.Label>
                                        </Statistic>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment>
                            <Label color='olive' attached='top'>
                                {Intl.get('Home.Main.StudioProjects')}
                            </Label>
                            <List divided relaxed>
                                <List.Item key={0}>
                                    <List.Content>
                                        <List.Header as='a' href='#card-example-link-card'>2019招新开始啦！</List.Header>
                                        <List.Description as='a'>Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.</List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}