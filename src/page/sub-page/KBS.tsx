import React from "react";
import { Input, Select, Button, Icon } from "semantic-ui-react";

const searchFilter = [
    { key: 'article', text: 'Article', value: 'article' },
    { key: 'code', text: 'Code', value: 'code' },
]

export default class KBS extends React.Component {

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                height: 300, width: 500,
                marginTop: -150, marginLeft: -250
            }}>
                Knowledge Base Search
                <Input fluid type='text' placeholder='Search...' action>
                    <input />
                    <Select compact options={searchFilter} defaultValue='article' />
                    <Button type='submit'>
                        <Icon name='search' />
                    </Button>
                </Input>
            </div>
        )
    }

}