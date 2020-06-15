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
                <SitemapFraction {...this.props} fractionSitemap="Wehrmacht" />
                <SitemapFraction {...this.props} fractionSitemap="Oberkommando West" /> 
                <SitemapFraction {...this.props} fractionSitemap="Soviet" /> 
                <SitemapFraction {...this.props} fractionSitemap="US forces" /> 
                <SitemapFraction {...this.props} fractionSitemap="British Forces" /> 
            </div>
        );
    }
}
