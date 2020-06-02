import React from 'react';
import '../Styles/CommanderListItem.css';
import CommanderAbility from './CommanderAbility';

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
        let source = "/Images/Commanders/" + this.state.type + ".png";
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderListItem">
                <img className="commanderIcon" src={source} alt={this.state.text} />
                <CommanderAbility type="1" />
                <CommanderAbility type="2" />
                <CommanderAbility type="3" />
                <CommanderAbility type="4" />
                <CommanderAbility type="5" />
            </li>
        )
    }
}