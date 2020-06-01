import React from 'react';
import Menu from './Menu';
import '../Styles/Header.css';
import FractionsList from './FractionsList';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fraction: props.fraction
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="header">
                <div className="headerLeft">
                    <img src="/Images/Fundamentals/logo.png" />
                </div>
                <div className="headerRight">
                    <FractionsList fractions={['Wehrmacht', 'Oberkommando', 'Soviet', 'Us', 'British']} active={this.state.fraction} />
                </div>
                <Menu />
            </div>
        )
    }
}