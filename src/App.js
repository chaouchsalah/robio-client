import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import socket from './api/socket';
import history from './history';
import CoursierProfile from './components/coursier/Profile';
import CustomerProfile from './components/customer/Profile';
import RequestSekhra from './components/Sekhra/RequestSekhra';
import CurrentSekhra from './components/customer/CurrentSekhra';

class App extends Component {
  render() {
    if(this.props.user && this.props.user.userType === 'coursier'){
      function success(pos) {
        var crd = pos.coords;
        socket.emit('position', { lat: crd.latitude, lng: crd.longitude, id: this.props.user});
      }
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }
      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000
      };
        navigator.geolocation.watchPosition(success, error, options);
    }
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
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

const mapStateToProps = state => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps)(App);
