import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TitlePage from './login/titlePage';
import Register from './login/register';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={TitlePage}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
