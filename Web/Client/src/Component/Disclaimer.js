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
                    DISCLAIMER: Images and texts used on this fansite are property of Relic Entertainment. We do not own anything.
                </div>
                <div className="disclaimerRight">
                    Copyright &copy; 2020 coh2stats.online, created by vladcatvorstva, fefe
                </div>
            </div>
        )
    }
}