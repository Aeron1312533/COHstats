import React from 'react';
import CommanderAbility from './CommanderAbility';
import '../Styles/CommanderAbilities.css';

export default class CommandersAbilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abilities: props.abilities
        };
    }

    list = () => {
        return this.state.abilities.map(element => {
            return (
                <CommanderAbility ability={element} text="random" key={element} points="3" />
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