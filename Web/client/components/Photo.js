import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { incrementLike} from "../actions/actionCreators";
import LazyLoad from 'react-lazy-load';
import dateFormat from 'dateformat';
import PhotoControlButtons from './PhotoControlButtons.js';

const Photo = React.createClass({
    generateSitemap() {
        let result = '';
        this.props.posts.forEach(function (elem) {
            var date = String(elem.article.dateAdded);
            var d = new Date(date.replace(' ', 'T'));
        
            let item = `<url>
      <loc>` + 'http://agilegateway.com/post/' + encodeURIComponent(elem.article.title) + `</loc>
      <lastmod>` + dateFormat(d, 'yyyy-mm-dd') + `</lastmod>
   </url>`;
            
            result += item;
        });
        console.log(result);
    },
    render() {
        const {articles, i, comments} = this.props;
        var date = String(this.props.post.article.dateAdded);
        var d = new Date(date.replace(' ', 'T'));

      //  this.generateSitemap();
        return (
                <figure className="grid-figure">
                    <div className="photo-category">
                        <h3>Article</h3>
                    </div>
                    <h4 className="post-category">{dateFormat(d, 'mediumDate')}</h4>
                    <div className="grid-photo-wrap">
                        <Link to={'/post/' + encodeURIComponent(this.props.post.article.title)}>
                        <LazyLoad offsetVertical={500}>
                            <img src={this.props.post.article.picture.location} alt="" className="grid-photo" />
                        </LazyLoad>
                        </Link>
                
                        <CSSTransitionGroup transitionName="like"
                                            transitionEnterTimeout={500}
                                            transitionLeaveTimeout={500} >
                            <span key={this.props.post.article.likes} className="likes-heart">
                                {this.props.post.article.likes}
                            </span>
                        </CSSTransitionGroup>
                    </div>
                    <div className="photo-info">
                        <figcaption>
                            <Link className="post-title" to={'/post/' + encodeURIComponent(this.props.post.article.title)}>
                            <h4> {this.props.post.article.title}</h4>
                            </Link>
                            <PhotoControlButtons post={this.props.post} {...this.props}/>
                        </figcaption>
                    </div>
                </figure>
                )
    }
});

export default Photo;