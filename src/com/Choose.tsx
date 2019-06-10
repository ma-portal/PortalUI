import React from "react";

interface Props {
    activeItem: number;
    items: JSX.Element[];
}

export default class Choose extends React.Component<Props> {

    render() {
        const { activeItem, items } = this.props;
        return items[activeItem];
    }

}