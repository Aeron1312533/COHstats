import React from 'react';
import { Link } from 'react-router-dom'
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
        let commanderClass = "";

        if (commanderInfo.commanderKey == this.props.match.params.id) {
            commanderClass = "commanderListItem commanderListItem-active";
        } else {
            commanderClass = "commanderListItem";
        }
        let href = "/" + this.props.fraction + "/" + this.props.page + "/" + commanderInfo.commanderKey;

        return (
            <Link to={href}>
                <div className={commanderClass}>
                    <div className="commanderName">{name}</div>
                    <img className="commanderIcon" src={source} alt={name} />
                    <CommanderAbilities {...this.props} abilities={[1, 2, 3, 4, 5]} />
                </div>
            </Link>
        )
    }
}