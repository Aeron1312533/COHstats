import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/MenuButton.css';

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        console.log(this.props);
        let liClass = (this.props.page == this.props.text) ? "menu active" : "menu";
        let href = "/" + this.props.fraction + "/Commanders";

        return (
            <li className={liClass} key={this.props.text}>
                <Link to={href} >{this.props.text}</Link>
            </li>
        )
    }
}