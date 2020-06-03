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
                    <MenuButton {...props} text="Commanders" />
                    <MenuButton {...props} text="Units" />
                    <MenuButton {...props} text="Buildings" />
                    <MenuButton {...props} text="Abilities" />
                </ul>
            </div>
        )
    }
}