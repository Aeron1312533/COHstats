import React from 'react';
import '../Styles/CommanderAbility.css';

export default class CommanderAbility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        };
    }

    render() {
        let source = "/Images/Commanders/Abilities/" + this.state.type + ".png";
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderAbility">
                <img src={source} alt="text" />
            </li>
        )
    }
}