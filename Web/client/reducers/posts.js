import sortJsonArray from 'sort-json-array';

function posts(state = [], action) {
    switch (action.type) {
        case 'INCREMENT_LIKE' :
        {
            console.log(action);
            let updatedArticle = Object.assign(state[action.indexPost]);
            updatedArticle.article.likes = action.data.likes;

            return [
                ...state.slice(0, action.indexPost),
                ...[updatedArticle],
                ...state.slice(action.indexPost + 1)
            ]
        }
        case 'INIT_ARTICLES' :
        {
            let newData = action.data.map((x) =>
                x.article
            );

            newData = sortJsonArray(newData, 'dateAdded', 'des');

            let oldSortedData = newData.map(function (x) {
                return {"article": x, "isVisible": 1};
            });

            return oldSortedData;
        }
        case 'SEARCH_POST' :
        {
            let filteredArray = state.map((post) => {
                if (post.article.title.toLowerCase().includes(action.input.toLowerCase())
                        || post.article.authorArticle.name.toLowerCase().includes(action.input.toLowerCase())
                        || post.article.url.toLowerCase().includes(action.input.toLowerCase())) {
                    post.isVisible = 1;
                } else {
                    post.isVisible = 0;
                }
                return post;
            });
            return filteredArray;
        }
        default:
            return state;
}
}
;

export default posts;