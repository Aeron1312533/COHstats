import React from 'react';
import '../Styles/SitemapFraction.css';

export default class SitemapFraction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let imgSrc = "/Images/Fractions/" + this.props.fractionShortcut + ".png";
        return (
            <div className="sitemapFraction">
                <img src={imgSrc} className="sitemapIcon" />
                {this.props.fractionSitemap}
            </div>
        );
    }
}
