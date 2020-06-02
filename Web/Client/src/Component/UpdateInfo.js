import React from 'react';
import '../Styles/UpdateInfo.css';

export default class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="updateInfo">
                Last update: 2020-06-02
            </div>
        )
    }
}