import React from 'react';

interface Props {
    initValue?: string;
    transparent?: boolean;
    type?: string;
    spellCheck?: boolean;
    placeholder?: string;
    style?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface State {
    focus: boolean;
}

export default class Input extends React.Component<Props, State> {

    private handle: HTMLInputElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            focus: false
        };
    }

    resetValue() {
        this.handle.value = '';
    }

    render() {
        const { initValue, transparent, type, placeholder, spellCheck=false,
            onChange, onFocus, onBlur, onKeyPress } = this.props;
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
                ref={(e) => this.handle = e }
                placeholder={placeholder} 
                spellCheck={spellCheck}
                type={type}
                autoComplete='current-password'
                onChange={onChange}
                onFocus={
                    (event: React.FocusEvent<HTMLInputElement>) => {
                        if (onFocus) {
                            onFocus();
                        }
                        this.setState({focus: true})
                    }
                }
                onBlur={
                    (event: React.FocusEvent<HTMLInputElement>) => {
                        if (onBlur) {
                            onBlur();
                        }
                        this.setState({focus: false});
                    }
                }
                onKeyPress={onKeyPress}
                style={Object.assign({}, baseStyle, this.props.style)} />
        )
    }

}