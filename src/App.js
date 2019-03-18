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
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchUser } from './actions/userActions';

class App extends Component {
  fetchData() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const { user } = this.props.user;
      if (Object.keys(user).length === 0) {
        this.props.fetchUser(token);
        if (window.location.pathname === '/') {
          if (user.userType === 'coursier') {
            history.push('/coursier/profile');
          } else {
            history.push('/customer/profile');
          }
        }
      }
    }
  }
  renderHeader() {
    if (this.props.user) {
      return (
        <Header user={this.props.user} />
      );
    }
  }
  renderPaths() {
    if (this.props.user) {
      const { user } = this.props;
      return (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/coursier/profile" exact
            render={(props) => <CoursierProfile {...props} user={user} />}
          />
          <Route
            path="/customer/profile" exact
            render={(props) => <CustomerProfile {...props} user={user} />}
          />
          <Route path="/requestSekhra" exact component={RequestSekhra} />
          <Route path="/currentSekhra" exact component={CurrentSekhra} />
        </Switch>
      );
    }
  }
  render() {
    this.fetchData();
    const { user } = this.props.user;
    if (user && user.userType === 'coursier') {
      function success(pos) {
        var crd = pos.coords;
        socket.emit('position', { lat: crd.latitude, lng: crd.longitude, id: user._id });
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
          <div style={{ position: "relative", minHeight: "100vh" }}>
            {this.renderHeader()}
            <div style={{ paddingBottom: "15vh" }}>
              {this.renderPaths()}
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, {
  fetchUser
})(App);
