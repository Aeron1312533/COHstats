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
            let isActive = (element == this.state.active) ? true : false;
            return (
                <CommanderAbility type={element} text="random" isActive={isActive} key={element} />
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