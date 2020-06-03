import React from 'react';
import Menu from './Menu';
import UpdateInfo from './UpdateInfo';
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
        console.log("render");
        console.log(this.props.fraction);
        return (
            <div className="header">
                <div className="headerLeft">
                    <div className="logo">
                        <img src="/Images/Fundamentals/logo.png" />
                    </div>
                    <div className="subtitle">
                        UNOFFICIAL DATABASE MADE BY FANS
                    </div>
                </div>
                <div className="headerRight">
                    <FractionsList fractions={['Wehrmacht', 'Oberkommando', 'Soviet', 'Us', 'British']} active={this.state.fraction} />
                </div>
                <Menu />
                <UpdateInfo />
            </div>
        )
    }
}