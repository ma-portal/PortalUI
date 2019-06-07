import React from "react";
import { Grid, Segment, Pagination, List, Label, Statistic } from "semantic-ui-react";
import { Motion, spring } from "react-motion";
import intl from "../../com/IntlWrapper";



export default class Main extends React.Component {

    render() {
        return (
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={12}>
                        <Motion defaultStyle={{opacity: 1, left1: 0, left2: 100}}
                            style={{
                                opacity: spring(0),
                                left1: spring(-100),
                                left2: spring(0)
                            }}>
                            { value =>
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    textAlign: 'center',
                                    width: '100%', height: 400,
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%', height: '100%',
                                        backgroundImage: 'url(' + require('../../res/img/backimg.jpg') + ')',
                                        backgroundSize: 'cover',
                                        left: value.left1 + '%',
                                        opacity: value.opacity
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%', height: '100%',
                                        backgroundImage: 'url(' + require('../../res/img/backimg.jpg') + ')',
                                        backgroundSize: 'cover',
                                        left: value.left2 + '%'
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
                                {intl.get('News', 'Home.Main.News')}
                            </Label>
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
                            <Statistic color='green'>
                                <Statistic.Value>25</Statistic.Value>
                                <Statistic.Label>Weekly Commits</Statistic.Label>
                            </Statistic>
                            <Statistic color='blue'>
                                <Statistic.Value>2</Statistic.Value>
                                <Statistic.Label>Active Projects</Statistic.Label>
                            </Statistic>
                        </Segment>
                        <Segment>
                            <Label color='olive' attached='top'>
                                {intl.get('Studio Projects', 'Home.Main.StudioProjects')}
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