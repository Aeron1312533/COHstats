function postComments(state =[], action) {
    switch(action.type) {
        case 'ADD_COMMENT':
            return [...state, action.data];
        case 'REMOVE_COMMENT':
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index +1)
            ]
            return state;
        default: return state;
    }
    return state;
}

function comments(state = [], action) {
    if(action.type == 'INIT_COMMENTS'){
        return action.data;
    } else if (action.data && action.data.post) {
        return {
            ...state,
            [action.data.post.id_post] : postComments(state[action.data.post.id_post], action)
        }
    }
    return state;
};

export default comments;