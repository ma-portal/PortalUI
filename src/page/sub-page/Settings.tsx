import React from "react";
import { Tab, Form, Radio, Image, Button, Segment } from "semantic-ui-react";
import Intl from "../../com/Intl";

export default class Settings extends React.Component {

    render() {
        return (
            <div style={{
                width: '70%', height: 'calc(100% - 60px)',
                margin: '30px auto'
            }}>
                <Tab defaultActiveIndex={0} menu={{ fluid: true, vertical: true, tabular: true }} panes={ [
                        { menuItem: Intl.get('Home.Settings.Profile.TabLabel'), render: () => <ProfileSettings /> },
                        { menuItem: Intl.get('Home.Settings.Other.TabLabel'), render: () => <OtherSettings /> },
                ] } />
            </div>
        )
    }

}

class ProfileSettings extends React.Component {

    private oldPwd: string;
    private newPwd: string;
    private repeatPwd: string;

    save() {
        alert('saved')
    }

    render() {
        return (
            <Segment>
                <Form>
                    <Form.Group>
                        <Image src={require('../../res/img/default-avatar.png')} />
                        <Button compact icon='edit' floated='left'
                            onClick={() => (this.refs.avatarInput as HTMLInputElement).click() }
                            style={{
                                position: 'absolute',
                                top: 180, left: 180
                            }} />
                        <input ref='avatarInput' type='file' style={{display: 'none'}} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid 
                            label={Intl.get('Home.Settings.Profile.OldPassword')} />
                        <Form.Input fluid 
                            label={Intl.get('Home.Settings.Profile.NewPassword')} />
                        <Form.Input fluid 
                            label={Intl.get('Home.Settings.Profile.RepeatPassword')} />
                    </Form.Group>
                    <Form.Button compact floated='right' onClick={this.save.bind(this)}>
                        {Intl.get('Home.Settings.Profile.Save')}
                    </Form.Button>
                </Form>
            </Segment>
        );
    }

}

class OtherSettings extends React.Component {

    private backgroundImage: any;

    save() {
        console.log(this.backgroundImage)
    }

    render() {
        const curLocale = Intl.getCurrentLocale();
        return (
            <Segment>
                <Form>
                    <Form.Input fluid type='file' onChange={(e) => this.backgroundImage = e.target.value}
                        label={Intl.get('Home.Settings.Other.BackgroundImage')} />
                    <Form.Group inline>
                        <label>{Intl.get('Home.Settings.Other.Language')}</label>
                        <Form.Field
                            control={Radio}
                            label={Intl.get('Home.Settings.Other.LanguageValues.Chinese')}
                            value='1'
                            checked={curLocale === 'zh-CN'}
                            onChange={() => Intl.change('zh-CN')}
                        />
                        <Form.Field
                            control={Radio}
                            label={Intl.get('Home.Settings.Other.LanguageValues.English')}
                            value='2'
                            checked={curLocale === 'en-US'}
                            onChange={() => Intl.change('en-US')}
                        />
                    </Form.Group>
                    <Form.Button compact floated='right' onClick={this.save.bind(this)}>
                        {Intl.get('Home.Settings.Other.Save')}
                    </Form.Button>
                </Form>
            </Segment>
        );
    }
    
}