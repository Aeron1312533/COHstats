import React from 'react';
import Menu from './Menu';

export default class Fefe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <   h1>Fefe rulezz!</h1>
                <img src="/Images/Fractions/british.png" alt="logo" />
                <Menu />
            </div>
        )
    }
}