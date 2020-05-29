import React from 'react';
import { render } from 'react-dom';

//import css
import css from './styles/style.styl';
import Main from './components/Main';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';
import App from './components/App';

//router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { store, history } from './store';

// sentry
import Raven from 'raven-js';
import { sentry_url } from "./data/config";

Raven.config(sentry_url).install();

// google analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-111298049-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}


const router = (
    <Provider store={store}>
        <Router history={history} onUpdate={logPageView}>
            <Route path="/" component={App}>
                <IndexRoute component={PhotoGrid}></IndexRoute>
                <Route path="/post/:postId" component={Single}></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));


