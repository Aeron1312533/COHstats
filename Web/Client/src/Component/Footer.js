import React from 'react';
import '../Styles/Footer.css';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="footer">
                Copyright © 2020 coh2stats.online
            </div>
        )
    }
}