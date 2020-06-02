import React from 'react';
import CommandersList from './CommandersList';
import '../Styles/Body.css';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="body">
                <CommandersList commanders={['Wehrmacht', 'Oberkommando', 'Soviet', 'Us', 'British']} active='false' />
            </div>
        )
    }
}