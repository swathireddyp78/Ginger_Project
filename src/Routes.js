import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '././Components/Welcome';
import ArticlesList from '././Components/ArticlesList';
import AuthorsList from '././Components/AuthorsList';
import Article from '././Components/Article';
import Author from '././Components/Author';


const Routes = () => (
<BrowserRouter>
<Switch>
    <Route exact path='/' component={Welcome} />
    <Route path='/articleslist' component={ArticlesList} />
    <Route path='/authorslist' component={AuthorsList} />
    <Route path='/:aid/article' component={Article} />
    <Route path='/:aname/author' component={Author} />
</Switch>
</BrowserRouter>
);

export default Routes;