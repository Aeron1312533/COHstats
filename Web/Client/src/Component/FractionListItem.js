import React from 'react';
import Link from 'react-router-dom'
import '../Styles/FractionListItem.css';

export default class FractionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
            isActive: props.isActive
        };
    }

    render() {
        let source = "/Images/Fractions/" + this.state.type + ".png";
        let href = "/" + this.state.type;
        let imgClass = (this.state.isActive == true) ? "active" : "";

        return (
            <li className="fraction">
                <Link to={href} ><img className={imgClass} src={source} alt={this.state.text} /></Link>
            </li>
        )
    }
}