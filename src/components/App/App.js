import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { CreateLink } from '../CreateLink/CreateLink';
import { Header } from '../Header/Header';
import { LinkList } from '../LinkList/LinkList';
import './App.css';

export const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  );
};
