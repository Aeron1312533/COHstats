import React from 'react';
import '../Styles/SitemapFraction.css';

export default class SitemapFraction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sitemapFraction">
                {this.props.fractionSitemap}
            </div>
        );
    }
}
