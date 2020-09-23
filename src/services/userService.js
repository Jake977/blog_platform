import superagent from 'superagent';

const API_URL = 'https://conduit.productionready.io/api';
const responseBody = (res) => res.body;
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


export default {
    authorization,
    setToken: _token => { token = _token; }
};
