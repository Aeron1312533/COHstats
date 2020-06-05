import React from 'react';
import Header from './Component/Header';
import Body from './Component/Body';
import './Styles/Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div>
                <Header {...this.props} />
                <Body {...this.props} />
            </div>
        )
    }
}