import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import InfoBox from './InfoBox.js';
import PhotoControlButtons from './PhotoControlButtons.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import ReactDOM from 'react-dom';


//comments
const Single = React.createClass({
    componentDidMount() {
        window.scrollTo(0, 0);
    },
    renderPhoto(indexPost) {
        let posts = this.props.posts ? this.props.posts : [];
        if (posts.length > 0) {
            return (<div className="grid-photo-wrap">
                <a target="_blank" href={this.props.posts[indexPost].article.url}>
                    <img src={this.props.posts[indexPost].article.picture.location} alt="" className="grid-photo" />
                </a>
            
                <CSSTransitionGroup transitionName="like"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500} >
                    <span key={this.props.posts[indexPost].article.likes} className="likes-heart">
                        {this.props.posts[indexPost].article.likes}
                    </span>
                </CSSTransitionGroup>
            </div>

                    );
        }

        return null;
    },
    render() {
        if (this.props.posts && this.props.posts.length > 0) {
            const indexPost = this.props.posts.findIndex(
                    (post) => post.article.title === this.props.params.postId);
            const postComments = this.props.comments[this.props.posts[indexPost].article.idPost] || [];
            return (
                    <div className="single-photo">
                        <div className="single-photo-left">
                            <figure className="grid-figure">
                                <div className="photo-category">
                                    <h3>Article</h3><h4 className="post-category"></h4>
                                </div>
                                { this.renderPhoto(indexPost) }
                                <div className="photo-info">
                                    <figcaption>  
                                        <h4><a className="link-default" target="_blank" href={this.props.posts[indexPost].article.url}> {this.props.posts[indexPost].article.title}</a></h4>
                                        <InfoBox post={this.props.posts[indexPost]} {...this.props} />
                                        <PhotoControlButtons i={indexPost} post={this.props.posts[indexPost]} {...this.props}/>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>
                        <div className="single-photo-right">
                            <Comments postComments={postComments} idPost={this.props.posts[indexPost].article.idPost} {...this.props}/>
                        </div>
                    </div>
                    )
        } else {
            return (
                    <div className="loader"></div>
                    )
        }
    }
});

export default Single;