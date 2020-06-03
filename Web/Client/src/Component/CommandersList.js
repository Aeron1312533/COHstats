import React from 'react';
import CommanderListItem from './CommanderListItem';
import '../Styles/CommandersList.css';

export default class CommandersList extends React.Component {
    constructor(props) {
        super(props);
    }

    list = () => {
        return this.props.commanders.map(element => {
            let isActive = (element == this.props.active) ? true : false;
            return (
                <CommanderListItem {...this.props} type={element} text="Mechanized Assault Doctrine" isActive={isActive} key={element} />
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