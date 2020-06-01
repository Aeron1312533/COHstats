import React from 'react';
import '../Styles/MenuButton.css';

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <li className="menu" key={this.state.text}>
                <a>{this.state.text}</a>
            </li>
        )
    }
}