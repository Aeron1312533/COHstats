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
            <div className="menu">
                <ul className="menu">
                    <MenuButton text="Commanders" />
                    <MenuButton text="Buildings" />
                    <MenuButton text="Abilities" />
                </ul>
            </div>
        )
    }
}