import React from 'react';
import { lazyImport, Async } from "./Async";
import { Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';

const FullArticlesPage = Async(lazyImport("./pages/FullArticlesPage/FullArticlesPage"));
const ShortArticlesPage = Async(lazyImport("./pages/ShortArticlesPage/ShortArticlesPage"));

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={FullArticlesPage}/>
        <Route path="/short-articles" component={ShortArticlesPage}/>
      </Switch>
    </>
  );
}

export default App;
