import React from "react";
import { Input, Select, Button, Icon, Image, Dimmer } from "semantic-ui-react";
import { toast } from "react-toastify";

const searchFilter = [
    { key: 'article', text: 'Article', value: 'article' },
    { key: 'code', text: 'Code', value: 'code' },
]

export default class KBS extends React.Component {

    componentDidMount() {
        toast.warn(
            <span>
                Unfortunately, this function is under developing <Icon name='smile outline' />. Press <strong>CTRL + Q</strong> to try other funtions.
            </span>, {
            autoClose: false,
            position: toast.POSITION.BOTTOM_LEFT
        })
    }

    render() {
        return (
            <Dimmer.Dimmable dimmed={true} style={{
                position: 'relative',
                width: '100%', height: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    height: 300, width: 500,
                    marginTop: -150, marginLeft: -250
                }}>
                    <Dimmer active={true} inverted />
                    <Image src={require('../../res/KBS-Title.png')} size='medium' />
                    <Input fluid type='text' placeholder='Search...' action>
                        <input />
                        <Select compact options={searchFilter} defaultValue='article' />
                        <Button type='submit'>
                            <Icon name='search' />
                        </Button>
                    </Input>
                </div>
            </Dimmer.Dimmable>
        )
    }

}