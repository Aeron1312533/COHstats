import React from 'react';
import '../Styles/MenuButton.css';

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let liClass = (this.props.isActive == true) ? "menu active" : "menu";

        return (
            <li className={liClass} key={this.props.text}>
                <a>{this.props.text}</a>
            </li>
        )
    }
}