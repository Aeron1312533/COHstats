import React from 'react';
import '../Styles/Disclaimer.css';

export default class Disclaimer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //feedback/contact us
        //sitemap
        //disclaimer
        //created by
        return (
            <div className="disclaimer">
                <div className="disclaimerLeft">
                    Copyright © 2020 coh2stats.online
                </div>
                <div className="disclaimerRight">
                    Created by vladcatvorstva, fefe
                </div>
            </div>
        )
    }
}