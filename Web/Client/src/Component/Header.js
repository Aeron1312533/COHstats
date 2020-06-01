import React from 'react';
import Menu from './Menu';
import '../Styles/Header.css';
import FractionsList from './FractionsList';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="header">
                <div className = "headerRight">
                    <FractionsList fractions={['Wehrmacht', 'Oberkommando','Soviet', 'Us', 'British']} />
                </div>
                <Menu />
            </div>
        )
    }
}