import React from "react";
import { Tab, Form, Radio } from "semantic-ui-react";
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

    render() {
        return <Tab.Pane>Profile</Tab.Pane>;
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
            <Tab.Pane>
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
            </Tab.Pane>
        );
    }
    
}