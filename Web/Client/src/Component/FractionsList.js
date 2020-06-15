import React from 'react';
import FractionListItem from './FractionListItem';
import '../Styles/FractionsList.css';

export default class FractionsList extends React.Component {
    constructor(props) {
        super(props);
    }

    list = () => {
        return this.props.fractions.map(element => {
            let isActive = (element == this.props.active) ? true : false;
            return (
                <FractionListItem {...this.props} type={element} text="random" isActive={isActive} key={element} />
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