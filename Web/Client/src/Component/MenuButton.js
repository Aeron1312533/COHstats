import React from 'react';
import '../Styles/MenuButton.css';

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <li className="menu" key={this.state.text}>
                <a>{this.props.text}</a>
            </li>
        )
    }
}