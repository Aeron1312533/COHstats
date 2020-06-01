import React from 'react';
import MenuButton from './MenuButton';

export default class Fefe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <   h1>Fefe rulezz!</h1>
                <img src="/Images/Fractions/british.png" alt="logo" />
                <MenuButton text="Commander" />
            </div>
        )
    }
}