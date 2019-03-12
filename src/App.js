import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import history from './history';
import CoursierProfile from './components/coursier/Profile';
import CustomerProfile from './components/customer/Profile';
import RequestSekhra from './components/Sekhra/RequestSekhra';
import Maps from './components/maps/Maps';
import CurrentSekhra from './components/customer/CurrentSekhra';


class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/coursier/profile" exact component={CoursierProfile} />
              <Route path="/customer/profile" exact component={CustomerProfile} />
              <Route path="/requestSekhra" exact component={RequestSekhra} />
              <Route path="/currentSekhra" exact component={CurrentSekhra} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
