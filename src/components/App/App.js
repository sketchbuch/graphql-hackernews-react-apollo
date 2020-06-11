import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { CreateLink } from '../CreateLink/CreateLink';
import { Header } from '../Header/Header';
import { LinkList } from '../LinkList/LinkList';
import { Login } from '../Login/Login';
import { Search } from '../Search/Search';
import './App.css';

export const App = () => {
  const [filter, changeFilter] = React.useState('')

  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route
            path='/search'
            render={(routerProps) => <Search {...routerProps} changeFilter={changeFilter} filter={filter} />}
          />
        </Switch>
      </div>
    </div>
  );
};
