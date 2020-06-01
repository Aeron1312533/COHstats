import React from 'react';
import FractionListItem from './FractionListItem';
import '../Styles/FractionsList.css';

export default class FractionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fractions: props.fractions,
            active: props.active
        };
    }

    list = () => {
        return this.state.fractions.map(element => {
            let isActive = (element == this.state.active) ? true : false;
            console.log(element);
            console.log(isActive);
            return (
                <FractionListItem type={element} text="" active={isActive} />
            );
        });
    };
    render() {
        return (
            <div className="fractions">
                <ul>
                    {this.list()}
                </ul>
            </div>
        )
    }
}