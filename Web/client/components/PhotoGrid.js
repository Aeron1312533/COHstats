import React from 'react';
import Photo from './Photo';
import {searchPost} from "../actions/actionCreators";

const PhotoGrid = React.createClass({
    search(e) {
        e.preventDefault();
        this.props.dispatch(searchPost(this.refs.searchBox.value));
    },
    handleSubmit(e) {
        e.preventDefault();
    },
    renderPhoto(post, i) {
        if (post.isVisible === 1) {
            return (<Photo {...this.props} key={i} i={i} post={post}/>)
        }
    },
    renderPhotoGrid() {
        if (this.props.posts && this.props.posts.length > 0) {
            return this.props.posts.map((post, i) => this.renderPhoto(post, i));
        } else {
            return (
                    <div className="loader"></div>
                    )
        }
    },
    getPhotoCount() {
        let countOfResults = 0;
        this.props.posts.forEach((element) => {
            if (element.isVisible === 1) {
                countOfResults++;
            }
        });

        return countOfResults;
    },
    render() {

        return (
                <div>
                    <div className="searchForm">
                        <form ref="searchForm"
                              onChange={this.search} onSubmit={this.handleSubmit}>
                            <div className="searchBoxArea">
                                <input type="text" ref="searchBox" placeholder="search" />
                            </div>
                            <div className="searchBoxInfo">
                                {this.getPhotoCount()} results found
                            </div>
                        </form>
                    </div>
                    <div className="photo-grid">
                        {this.renderPhotoGrid()}
                    </div>
                </div>
                );
    }
});

export default PhotoGrid;