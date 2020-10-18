import superagent from 'superagent';

const API_URL = 'https://conduit.productionready.io/api';

const responseBody = (res) => res.body;
const encode = encodeURIComponent;
let token = null;

const tokenPlugin = (req) => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
};

const authorization = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    signup: (username, email, password) =>
        requests.post('/users', { user: { username, email, password } }),
    save: user =>
        requests.put('/user', { user })
};

const requests = {
    del: url =>
        superagent.del(`${API_URL}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_URL}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_URL}${url}`, body).use(tokenPlugin).then(responseBody)
};

const tags = {
    getTags: () => requests.get('/tags')
};

const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;
const omitSlug = (article) => Object.assign({}, article, { slug: undefined });

const articles = {
    all: page =>
        requests.get(`/articles?${limit(10, page)}`),
    userArticles: () =>
        requests.get('/articles/feed?limit=10&offset=0'),
    get: slug =>
        requests.get(`/articles/${slug}`),
    create: article =>
        requests.post('/articles', { article }),
    update: article =>
        requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    del: slug =>
        requests.del(`/articles/${slug}`),
    // filterByTag: (tag, page) =>
    //     requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    favorite: slug =>
        requests.post(`/articles/${slug}/favorite`),
    // favoritedBy: (author, page) =>
    //     requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
    unfavorite: slug =>
        requests.del(`/articles/${slug}/favorite`),
};

export default {
    authorization,
    articles,
    tags,
    setToken: _token => { token = _token; }
};
