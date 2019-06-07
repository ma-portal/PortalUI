import React from "react";

interface Props {
    vertical: boolean;
    style?: any;
}

/**
 * props:
 * * vertical: 分割线是否在垂直方向，默认false
 */
export default class Division extends React.Component<Props>  {
    
    render() {
        const { vertical, style } = this.props;
        let baseStyle: any = {
            boxSizing: 'border-box',
            position: 'relative',
            backgroundColor: 'rgb(180, 180, 180)',
            margin: 5
        }
        if (vertical) {
            baseStyle.display = 'inline-block';
            baseStyle.width = 1;
            baseStyle.height = 'calc(100% - 10px)';
        } else {
            baseStyle.width = 'calc(100% - 10px)';
            baseStyle.height = 1;
        }
        return (
            <div
            style={Object.assign({}, baseStyle, style)} />
        )
    }

}