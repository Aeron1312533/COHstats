import React from 'react';
import FractionListItem from './FractionListItem';
import '../Styles/FractionsList.css';

export default class FractionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fractions: props.fractions
        };
    }

    list = () => {
        return this.state.fractions.map(element => {
            return (
                <FractionListItem type={element} text="random" />
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