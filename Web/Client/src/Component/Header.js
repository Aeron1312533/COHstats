import React from 'react';
import Menu from './Menu';
import '../Styles/Menu.css';
import FractionsList from './FractionsList';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <FractionsList />
                <Menu />
            </div>
        )
    }
}