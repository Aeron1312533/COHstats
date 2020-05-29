import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router';
import { incrementLike} from "../actions/actionCreators";

const PhotoControlButtons = React.createClass({
        incr() {
        this.props.dispatch(incrementLike(this.props.i, this.props.post.article.idPost));
    },
    render() {
        const {articles, i, comments} = this.props;
        return (
                <div className="control-buttons">
                    <span className="button">&#128339; {this.props.post.article.readLength} mins</span>
                    <button className="likes" onClick={this.incr}>
                        &hearts; { this.props.post.article.likes }
                    </button>
                    <Link className="button link-default" to={'/post/' + encodeURIComponent(this.props.post.article.title)}>
                    <span className="comment-count">
                        <span className="speech-bubble"></span>
                        {typeof comments[this.props.post.article.idPost] === 'undefined' ? 0 : comments[this.props.post.article.idPost].length}
                    </span>
                    </Link>
                </div>

                )

    }
});

export default PhotoControlButtons;