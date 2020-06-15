import React from 'react';
import SitemapFraction from './SitemapFraction';
import '../Styles/Sitemap.css';

export default class Sitemap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sitemap">
                <SitemapFraction {...this.props} fractionSitemap="Wehrmacht" fractionShortcut="Wehrmacht" />
                <SitemapFraction {...this.props} fractionSitemap="Oberkommando West" fractionShortcut="Oberkommando"/> 
                <SitemapFraction {...this.props} fractionSitemap="Soviet" fractionShortcut="Soviet"/> 
                <SitemapFraction {...this.props} fractionSitemap="US forces" fractionShortcut="Us"/> 
                <SitemapFraction {...this.props} fractionSitemap="British Forces" fractionShortcut="British"/> 
            </div>
        );
    }
}
