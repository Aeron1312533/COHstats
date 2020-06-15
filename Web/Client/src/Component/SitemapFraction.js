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
                <img src={imgSrc} className="sitemapIcon" alt={this.props.fractionSitemap} />
                <span>{this.props.fractionSitemap}</span>
                <ul className="sitemapList">
                    <li>Home</li>
                    <li>Commanders</li>
                    <li>Units</li>
                    <li>Buildings</li>
                    <li>Abilities</li>
                </ul>
            </div>
        );
    }
}
