import React from 'react';
import { Link } from 'react-router-dom';
import GreenLogo from '../images/logoGreen.png';

class Header extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <div>
                {user && 
                <section className="hero is-large is-bold">
                    <div className="hero-head">
                        <nav className="navbar">
                            <div className="container">
                                <div className="columns" style={{ marginTop: "20px" }}>
                                    <div className="column is-8">
                                        <div className="columns">
                                            <Link to='/' className="column is-3" href="somewhre">
                                                <img className="image" src={GreenLogo} alt="Logo" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <a className="is-large" href="notif">
                                            <span className="icon is-large">
                                                <i className="fa fa-bell fas fa-2x"></i>
                                            </span>
                                        </a>
                                        <figure className="image is-32x32" style={{ display: "inline-block", marginLeft: "5px", marginRight: "10px" }}>
                                            <img className="is-rounded" src={this.props.user.photo} alt="Profile" />
                                        </figure>
                                        <span>
                                            {this.props.user.displayName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>
                }
            </div>
        );
    }
}

export default Header;