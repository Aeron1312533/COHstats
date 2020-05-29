require('es6-promise').polyfill();
require('isomorphic-fetch');
//increment
export function incrementLike(indexPost, idPost) {
    let options = {
        method: 'post',
        body: JSON.stringify({
            idPost: idPost
        }),
        headers: {
            'Authorization': 'Basic '+btoa('root:ab'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return dispatch => fetch('http://agilegateway.com/api/v1/like', options)
        .then(res => res.json())
        .then(
            data => dispatch({ type: 'INCREMENT_LIKE', indexPost, data })
        );
}

//add comment
export function addComment(postId, author, comment) {
    let options = {
        method: 'post',
        headers: {
            'Authorization': 'Basic '+btoa('root:ab'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            idPost: postId,
            author: author,
            comment: comment
        })
    };

    return dispatch => fetch('http://agilegateway.com/api/v1/comment', options)
        .then(res => res.json())
        .then(
            data => dispatch({ type: 'ADD_COMMENT', data })
        );
}

//remove comment
export function removeComment(postId, index) {
    console.log('remove');
    return {
        type: 'REMOVE_COMMENT',
        index,
        postId
    }
}

//init articles data
export function initArticles() {
    console.log('action_init_articles');
    let options = {
        method: 'get',
        headers: {
            'Authorization': 'Basic '+btoa('root:ab'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return dispatch => fetch('http://agilegateway.com/api/v1/posts', options)
        .then(res => res.json())
        .then(
            data => dispatch({ type: 'INIT_ARTICLES',data })
        );
}

//init comments data
export function initComments() {
    console.log('action_init_comments');
    let options = {
        method: 'get',
        headers: {
            'Authorization': 'Basic '+btoa('root:ab'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return dispatch => fetch('http://agilegateway.com/api/v1/comments', options)
        .then(res => res.json())
        .then(
            data => dispatch({ type: 'INIT_COMMENTS',data })
        );
}

export function searchPost(input) {
    return {
        type: 'SEARCH_POST',
        input
    }
}