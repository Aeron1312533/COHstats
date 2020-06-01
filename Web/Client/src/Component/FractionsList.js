import React from 'react';
import FractionListItem from './FractionListItem';
import '../Styles/FractionsList.css';

export default class FractionsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                <FractionListItem type="Wehrmacht" text="random" />
                <FractionListItem type="Oberkommando" text="random" />
                <FractionListItem type="Soviet" text="random" />
                <FractionListItem type="Us" text="random" />
                <FractionListItem type="British" text="random" />
            </ul>
        )
    }
}