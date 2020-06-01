import React from 'react';
import '../Styles/FractionListItem.css';

export default class FractionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text
        };
    }

    render() {
        let source = "/Images/Fractions/" + type: props.type + ".png";
        return (
            <li className = "fraction">
                <img src={source} alt={this.state.text} />
            </li>
        )
    }
}