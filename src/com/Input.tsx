import React from 'react';

interface Props {
    initValue?: string;
    transparent?: boolean;
    type?: string;
    spellCheck?: boolean;
    placeholder?: string;
    style?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface State {
    focus: boolean;
}

export default class Input extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            focus: false
        };
    }

    onFocus() {
        this.setState({focus: true})
    }

    onBlur() {
        this.setState({focus: false})
    }

    render() {
        const { initValue, transparent, type, placeholder, spellCheck=false, onChange } = this.props;
        const { focus } = this.state;
        let baseStyle: any = {
            outline: 'none', border: 'none',
            display: 'inline-block',
            position: 'relative',
            verticalAlign: 'top',
            boxSizing: 'border-box',
            width: 200, height: 22,
            borderRadius: 5,
            margin: 3,
            padding: '1px 3px'
        };
        if (transparent) {
            baseStyle['backgroundColor'] = 'rgba(0, 0, 0, 0)';
        }
        if (focus) {
            baseStyle['border'] = '1px solid gray'
        }
        return (
            <input value={initValue}
                placeholder={placeholder} 
                spellCheck={spellCheck}
                type={type}
                onChange={onChange}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                style={Object.assign({}, baseStyle, this.props.style)} />
        )
    }

}