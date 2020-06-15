import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/SitemapFraction.css';

export default class SitemapFraction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let imgSrc = "/Images/Fractions/" + this.props.fractionShortcut + ".png";
        let href = "/" + this.props.fractionShortcut;
        return (
            <div className="sitemapFraction">
                <img src={imgSrc} className="sitemapIcon" alt={this.props.fractionSitemap} />
                <span>{this.props.fractionSitemap}</span>
                <ul className="sitemapList">
                    <li><Link to={href + "/Home"} >Home</Link></li>
                    <li><Link to={href + "/Commanders"} >Commanders</Link></li>
                    <li><Link to={href + "/Units"} >Units</Link></li>
                    <li><Link to={href + "/Buildings"} >Buildings</Link></li>
                    <li><Link to={href + "/Abilities"} >Abilities</Link></li>
                </ul>
            </div>
        );
    }
}
