import React from 'react';
import { Link } from 'react-router-dom';
import GreenLogo from '../images/logoGreen.png';

class Footer extends React.Component {
    render() {
        return (
                <footer className="container" style={{ position: "absolute", bottom: "0", width: "100%", height: "15vh" }}>
                    <div className="columns">
                        <div className="column is-8">
                            <div className="columns">
                                <Link to='/' className="column is-2 is-offset-2">
                                    <img className="image" src={GreenLogo} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="column">
                            <div className="columns">
                                <div className="column">
                                    About
                                </div>
                                <div className="column">
                                    Terms
                                </div>
                                <div className="column">
                                    Privacy policy
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default Footer;