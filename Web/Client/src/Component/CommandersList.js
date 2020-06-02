import React from 'react';
import CommanderListItem from './CommanderListItem';
import '../Styles/CommandersList.css';

export default class CommandersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commanders: props.commanders,
            active: props.active
        };
    }

    list = () => {
        return this.state.commanders.map(element => {
            let isActive = (element == this.state.active) ? true : false;
            return (
                <CommanderListItem type={element} text="Mechanized Assault Doctrine" isActive={isActive} key={element} />
            );
        });
    };
    render() {
        return (
            <div className="commanders">
                <ul>
                    {this.list()}
                </ul>
            </div>
        )
    }
}