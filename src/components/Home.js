import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courier from '../images/Courier.png';
import WhiteLogo from '../images/logoWhite.png';
import Modal from './Modal';

let styles = {
  courier: {
    backgroundImage: `url(${Courier})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  }
};

class Home extends Component {
  state = { modalState: false, action: 'Signup', userType: null };
  toggleModal = () => {
    this.setState((prev) => {
      const newState = !prev.modalState;
      return { modalState: newState };
    });
  };
  consumerToggleModal = () => {
    this.setState({ userType: 'customer' });
    this.toggleModal();
  };
  riderToggleModal = () => {
    this.setState({ userType: 'coursier' });
    this.toggleModal();
  };
  render() {
    return (
      <div>
        <section className="hero is-info is-large is-bold" style={styles.courier}>
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="columns" style={{ marginTop: "20px" }}>
                  <div className="column is-8">
                    <div className="columns">
                      <a className="column is-3" href="somewhre">
                        <img className="image" src={WhiteLogo} alt="Logo" />
                      </a>
                    </div>
                  </div>
                  <div className="column">
                    <button className="button is-primary is-fullwidth" onClick={() => this.setState({ action: 'Signup' })}>
                      Signup
                          </button>
                  </div>
                  <div className="column">
                    <button className="button is-fullwidth" onClick={() => this.setState({ action: 'Login' })}>
                      Login
                          </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="hero-body">
            <div className="container has-text-centered is-spaced">
              <h2 className="title is-2" style={{ paddingTop: "140px" }}>
                An on demand service that picks-up anything you requested through the app and delivers it to your door within one hour.
                      </h2>
              <div className="columns">
                <div className="column is-4 is-offset-2">
                  <button className="button is-large is-primary is-fullwidth" onClick={this.consumerToggleModal}>
                    <span className="icon">
                      <i className="fa fa-home"></i>
                    </span>
                    <span>
                      {this.state.action} as a Consumer
                            </span>
                    <span className="icon">
                      <i className="fa fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
                <div className="column is-4">
                  <button className="button is-large is-fullwidth" onClick={this.riderToggleModal}>
                    <span className="icon">
                      <i className="fa fa-motorcycle"></i>
                    </span>
                    <span>
                      {this.state.action} as a Rider
                            </span>
                    <span className="icon">
                      <i className="fa fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="intro column is-8 is-offset-2 has-text-centered">
            <h2 className="title">How it works</h2><br />
          </div>
          <div className="columns">
            <div className="column is-offset-2">
              <h2 className="subtitle">Request your sekhra</h2>
              <h2 className="subtitle">Choosing a quality cookware set</h2>
            </div>
          </div>
        </section>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          action={this.state.action}
          userType={this.state.userType} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Home);