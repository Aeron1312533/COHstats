import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/FractionListItem.css';

export default class FractionListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let source = "/Images/Fractions/" + this.props.type + ".png";
        let href = "/" + this.props.type + "/" + this.props.page;
        let imgClass = (this.props.isActive == true) ? "active" : "";

        return (
            <li className="fraction">
                <Link to={href} ><img className={imgClass} src={source} alt={this.props.text} /></Link>
            </li>
        )
    }
}