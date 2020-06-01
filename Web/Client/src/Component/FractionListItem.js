import React from 'react';
import '../Styles/FractionListItem.css';
import { useLocation } from 'react-router-dom';

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
        let href = "/" + this.state.type;
        let imgClass = "";
        let location = useLocation();
        console.log(location);
        return (
            <li className = "fraction">
                <a href={href} ><img src={source} alt={this.state.text} /></a>
            </li>
        )
    }
}