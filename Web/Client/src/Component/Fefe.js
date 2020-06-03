import React from 'react';
import Menu from './Menu';

export default class Fefe extends React.Component {

    render() {
        console.log("fefe")
        return (
            <div>
            <   h1>Fefe rulezz!</h1>
                <img src="/Images/Fractions/british.png" alt="logo" />
                <Menu />
            </div>
        )
    }
}