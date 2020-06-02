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
        let source = "/Images/Commanders/" + this.state.type + ".png";
        let sourceAbility = "/Images/Commanders/Abilities/1.png";
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderListItem">
                <img className="commanderIcon" src={source} alt={this.state.text} />
                <img className="commanderAbility" src={sourceAbility} alt={this.state.text} />
                <img className="commanderAbility" src={sourceAbility} alt={this.state.text} />
                <img className="commanderAbility" src={sourceAbility} alt={this.state.text} />
                <img className="commanderAbility" src={sourceAbility} alt={this.state.text} />
                <img className="commanderAbility" src={sourceAbility} alt={this.state.text} />
            </li>
        )
    }
}