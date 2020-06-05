import React from 'react';
import '../Styles/CommanderListItem.css';
import CommanderAbilities from './CommanderAbilities';

export default class CommanderListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let commanderInfo = this.props.commanderInfo;
        let source = "/Images/Commanders/" + commanderInfo.iconSecondary + ".png";
        let description = commanderInfo.description;
        let name = commanderInfo.name;
        //let href = "/" + this.state.type;
        //let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="commanderListItem">
                <div className="commanderName">{name}</div>
                <img className="commanderIcon" src={source} alt={name} />
                <CommanderAbilities {...this.props} abilities={[1, 2, 3, 4, 5]} />
            </li>
        )
    }
}