import React from "react";
import './BubbleMessage.css';

type Direction = number;

export const Directions = {
    UP: 0,
    DOWN: 1,
}

interface Props {
    direction?: Direction;
    style?: any;
}

/**
 * TODO: make the message in the center
 */
class View extends React.Component<Props> {

    private handle: HTMLDivElement;

    message(msg: string) {
        let child = document.createElement('span');
        child.innerHTML = msg;
        child.className = 'BubbleMessageItemUp';
        this.handle.appendChild(child);
        setTimeout(() => {
            child.remove();
        }, 2000);
    }
    
    render() {
        const { direction } = this.props;
        let baseStyle: any = {
            width: '100%', height: 0,
            textAlign: 'center',
            position: 'absolute',
        };
        switch(direction) {
        case Directions.UP:
            baseStyle.top = 0;
            break;
        case Directions.DOWN:
            baseStyle.bottom = 0;
            break;
        }
        return (
            <div ref={(e) => this.handle = e }
                style={Object.assign({}, baseStyle, this.props.style)} />
        )
    }

}

export default class BubbleMessage {

    private direction: Direction;
    private style: any;
    private handle: View;

    constructor(style?: any, direction: Direction = Directions.UP) {
        this.direction = direction;
        this.style = style;
    }

    message(msg: string) {
        if (this.handle) {
            this.handle.message(msg);
        } else {
            throw new Error('component is not ready');
        }
    }

    render() {
        return <View ref={(e) => this.handle = e }
            direction={this.direction}
            style={this.style} />
    }

}