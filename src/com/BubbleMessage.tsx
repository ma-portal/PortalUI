import React from "react";

type Direction = number;

const Directions = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

interface Props {
    direction?: Direction;
    residence?: number;
}

export default class BubbleMessage extends React.Component {
    
    render() {
        return (
            <div>

            </div>
        )
    }

}