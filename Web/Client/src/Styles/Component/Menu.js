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
                    <MenuButton {...this.props} text="Commanders" />
                    <MenuButton {...this.props} text="Units" />
                    <MenuButton {...this.props} text="Buildings" />
                    <MenuButton {...this.props} text="Abilities" />
                </ul>
            </div>
        )
    }
}