import React from "react";
import './Waiting.css';

interface Props {
    style?: any;
}

export default class Waiting extends React.Component<Props> {
    
    render() {
        let baseStyle = {
            height: 1, width: '100%',
            margin: '2px 0px',
        }
        return (
            <div style={Object.assign({}, baseStyle, this.props.style)}>
                <span style={{
                    display: 'block', 
                    height: 1, width: 0,
                    position: 'absolute',
                    backgroundColor: 'white',
                    animation: 'WaitingSpanKeyFrames 3s linear infinite'
                }} />
            </div>
        )
    }

}