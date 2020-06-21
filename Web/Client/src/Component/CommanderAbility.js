import React from 'react';
import '../Styles/CommanderAbility.css';

export default class CommanderAbility extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let source = "/Images/Commanders/Abilities/" + this.props.ability.icon + ".png";
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderAbility">
                <a><img src={source} alt="text" /></a>
                <div className="abilityPoints">{this.props.points}</div>
            </li>
        )
    }
}