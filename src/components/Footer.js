import React from 'react';
import { Link } from 'react-router-dom';
import GreenLogo from '../images/logoGreen.png';

class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer
                    style={{ backgroundColor: "white", bottom: "0", width: "100%", position: "absolute" }}>
                    <div className="columns">
                        <Link to='/' className="column is-offset-1 is-3">
                            <img className="image" src={GreenLogo} alt="Logo" style={{height: "20vh"}} />
                        </Link>
                        <div className="column is-offset-4">
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
            </div>
        );
    }
}

export default Footer;