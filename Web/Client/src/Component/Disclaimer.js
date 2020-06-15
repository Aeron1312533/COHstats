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
                    DISCLAIMER: Images and texts used on this fansite are property of Relic Entertainment. We do not own anything. Copyright &copy; 2020 coh2stats.online
                </div>
                <div className="disclaimerRight">
                    Created by vladcatvorstva, fefe
                </div>
            </div>
        )
    }
}