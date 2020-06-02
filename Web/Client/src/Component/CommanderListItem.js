import React from 'react';
import '../Styles/CommanderListItem.css';

export default class CommanderListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
            isActive: props.isActive
        };
    }

    render() {
        let source = "/Images/Commander/" + this.state.type + ".png";
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderListItem">
                <a><img src={source} alt={this.state.text} /></a>
            </li>
        )
    }
}