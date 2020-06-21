import React from 'react';
import CommanderAbility from './CommanderAbility';
import '../Styles/CommanderAbilities.css';

export default class CommandersAbilities extends React.Component {
    constructor(props) {
        super(props);
    }

    list = () => {
        return this.props.abilities.map(element => {
            return (
                <CommanderAbility ability={element} key={element.commanderAbilityCode} points="3" />
            );
        });
    };
    render() {
        return (
            <div className="commanderAbilities">
                <ul>
                    {this.list()}
                </ul>
            </div>
        )
    }
}