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
        return (
            <li>
                <img src="/Images/Fundamentals/Wehrmacht.png" alt={this.state.text} />
            </li>
        )
    }
}