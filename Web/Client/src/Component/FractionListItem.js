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
        let source = "/Images/Fractions/" + this.state.type + ".png";
        let href = "/" + + this.state.type;
        return (
            <li className = "fraction">
                <a href={href} ><img src={source} alt={this.state.text} /></a>
            </li>
        )
    }
}