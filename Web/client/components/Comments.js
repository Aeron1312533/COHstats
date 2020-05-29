import React from 'react';
import Raven from 'raven-js';
import {addComment} from "../actions/actionCreators";
import ReCAPTCHA from 'react-google-recaptcha';
import dateFormat from 'dateformat';

const Comments = React.createClass({
    handleCaptchaChange(value) {
        console.log("Captcha value:", value);
    },
    handleSubmit(e){
        e.preventDefault();
        if(this.refs.recaptcha.getValue() && this.refs.author.value && this.refs.comment.value) {
            const postId = this.props.idPost;
            const author = this.refs.author.value;
            const comment = this.refs.comment.value;

            this.props.dispatch(addComment(postId, author, comment));
            this.refs.commentForm.reset();
            this.refs.recaptcha.reset();
        }
    },
    renderComment(comment, i) {
        dateFormat.masks.myMask = 'yyyy-mm-dd, hh:mm:ss';
        let date = dateFormat(new Date(comment.dateCreated), 'myMask');

        return (
            <div className="comment" key={i}>
                <div><span className="comment-author">&#x1f464; {comment.author.name}</span><span className="comment-date">{date} GMT</span></div>
                <div className="comment-comment">{comment.comment}</div>
            </div>
        )
    },
    render() {
        return (
            <div className="comment-box">
                <div className='comments-section'> {this.props.postComments.map(this.renderComment)} </div>
                <form ref="commentForm" className="comment-form"
                      onSubmit={this.handleSubmit}>
                    <input type="text" ref="author" placeholder="author" />
                    <input type="text" ref="comment" placeholder="comment" />
                    <ReCAPTCHA className="captcha"
                        ref="recaptcha"
                        sitekey="6LfyTTIUAAAAAN84mK54o-XybQhn0XlvNPXdR57x"
                        onChange={this.handleCaptchaChange}
                    />
                    <input className="btn-primary" type="submit" value="Add Comment"/>
                </form>
            </div>
        )
    }
});

//<button className="remove-comment" onClick={this.props.removeComment.bind(null,this.props.params.postId, i)}>&times;</button>
export default Comments;