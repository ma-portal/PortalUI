import React from "react";
import { Card, Icon, Image, Grid, Tab, List, Label } from "semantic-ui-react";

export default class Profile extends React.Component {
    
    render() {
        return (
            <Grid style={{
                width: '70%', height: '100%',
                margin: '0px auto'
            }}>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Card>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Matthew</Card.Header>
                                <Card.Meta>
                                    <span>Class 2016</span>
                                    <span>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>
                                    Matthew is a musician living in Nashville.
                                </Card.Description>
                                <Label color='green'>Gita</Label>
                                <Label color='blue'>LOL</Label>
                                <Label color='red'>Java</Label>
                            </Card.Content>
                            <Card.Content extra>
                                <List>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>
                                            <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='qq' />
                                        <List.Content>
                                            <span>2725115515</span>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='phone' />
                                        <List.Content>
                                            <span>18381196466</span>
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