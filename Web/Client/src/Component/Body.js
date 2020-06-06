import React from 'react';
import CommandersList from './CommandersList';
import '../Styles/Body.css';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    returnPage(page) {
        if (page == "Commanders") {
            return (<CommandersList {...this.props} active='false' />);
        }
    }
    render() {
        return (
            <div className="body">
                {this.returnPage(this.props.page)}
            </div>
        )
    }
}