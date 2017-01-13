import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './app.jsx';

import Featured from './pages/featured.jsx';
import Latest from './pages/latest.jsx';
import Favs from './pages/favs.jsx';
import Issues from './pages/issues.jsx';
import Issue from './pages/issue.jsx';
import Entry from './pages/entry.jsx';
import Add from './pages/add/add.jsx';
import Search from './pages/search/search.jsx';
import NotFound from './pages/not-found.jsx';

import Test from './pages/test.jsx';

module.exports = (
  <Route path="/" component={App}>
    <IndexRedirect to="/featured" />
    <Route path="featured" component={Featured} />
    <Route path="latest" component={Latest} />
    <Route path="favs" component={Favs} />
    <Route path="issues">
      <IndexRoute component={Issues} />
      <Route path=":issue" component={Issue} />
    </Route>
    <Route path="entry/:entryId" component={Entry} />
    <Route path="add" component={Add} />
    <Route path="search" component={Search} />
    <Route path="test" component={Test} />
    <Route path="*" component={NotFound}/>
  </Route>
);
