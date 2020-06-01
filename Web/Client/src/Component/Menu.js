import React from 'react';
import MenuButton from './MenuButton';
import '../Styles/Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <ul>
                <MenuButton text="Commanders" />
                <MenuButton text="Abilities" />
            </ul>
        )
    }
}