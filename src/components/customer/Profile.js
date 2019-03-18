import React, { Component } from 'react';
import qs from 'qs';
import { Link } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import CurrentSekhra from './CurrentSekhra';

class Profile extends Component {
    state = { user: {}, name: '', email: '', phone: '', action: '' };
    renderContent = () => {
        switch (this.state.action) {
            case 'current':
                return <div><CurrentSekhra /></div>;
            default:
                return <div>{this.props.user && <CustomerForm customer={this.props.user.user} />}</div>;
        }
    }
    componentDidUpdate() {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        if (params.action) {
            if(this.state.action !== params.action) {
                this.setState({ action: params.action });
            }
        }
    }
    render() {
        return (
            <section className="container" style={{marginTop: "15vh", marginBottom: "15vh"}}>
                <div className="tile is-ancestor container">
                    <div className="tile is-vertical">
                        <div className="tile">
                            <div className="tile is-parent is-3">
                                <article className="tile is-child">
                                    <Link to="/currentSekhra" className="button is-large is-fullwidth is-white" style={{ marginBottom: "10px" }}>My skhera</Link>
                                    <a href="placeholer" className="button is-large is-fullwidth" style={{ marginBottom: "10px", backgroundColor: "rgb(65,157,120)", color: "white" }}>My profile</a>
                                    <a href="placeholer" className="button is-large is-fullwidth is-white" style={{ marginBottom: "10px" }}>My address</a>
                                    <a href="placeholer" className="button is-large is-fullwidth is-white" style={{ marginBottom: "10px" }}>FAQ</a>
                                </article>
                            </div>
                            <div className="tile is-parent is-5">
                                <article className="tile is-child">
                                    {this.renderContent()}
                                </article>
                            </div>
                            <Link to='/requestSekhra' className="tile is-parent is-vertical is-3">
                                <article className="tile is-child notification" style={{ backgroundColor: "rgb(65,157,120)", color: "white" }}>
                                    <span className="icon is-large">
                                        <i className="fa fa-pen fas fa-3x"></i>
                                    </span>
                                    <p className="subtitle" style={{ marginTop: "50px" }}>
                                        Request skhera
                                                <span className="icon" style={{ marginLeft: "20px" }}>
                                            <i className="fa fa-arrow-right"></i>
                                        </span>
                                    </p>
                                </article>
                                <article className="tile is-child">
                                </article>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Profile;