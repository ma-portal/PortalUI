import React from "react";
import './Loading.css';

interface Props {
    actived: boolean;
    style?: any;
}

export default class Loading extends React.Component<Props> {
    
    render() {
        let baseStyle = {
            height: 1, width: '100%',
            margin: '2px 0px',
        }
        return (
            <div style={Object.assign({}, baseStyle, this.props.style)}>
                { this.props.actived &&
                    <span style={{
                        display: 'block', 
                        height: 1, width: 0,
                        position: 'absolute',
                        backgroundColor: 'white',
                        animation: 'LoadingSpanKeyFrames 3s linear infinite'
                    }} />
                }
            </div>
        )
    }

}