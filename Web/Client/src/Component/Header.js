import React from 'react';
import Menu from './Menu';
import '../Styles/Menu.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Menu />
            </div>
        )
    }
}