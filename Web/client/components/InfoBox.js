import React from 'react';
import dateFormat from 'dateformat';

const InfoBox = React.createClass({
    render() {
        var date = String(this.props.post.article.publishDate);
        var d = new Date(date.replace(' ', 'T'));
        return (
                <div className="info-box">
                    <ul>
                    <li><h5>Author: {this.props.post.article.authorArticle.name}</h5></li>
                        <li><h5>Source: <a target="_blank" href={this.props.post.article.url}>{this.props.post.article.url}</a></h5></li>
                        <li><h5>Date published: {dateFormat(d, "mediumDate")}</h5></li>
                    </ul>
                </div>

                )

    }
});

export default InfoBox;