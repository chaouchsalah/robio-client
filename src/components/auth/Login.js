import React from 'react';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h2 className="title">Login</h2>
                <h2 className="subtitle">Welcome To Jible Services</h2><br/>
                <a className="button is-large is-link is-fullwidth"
                    href={`http://localhost:6200/auth/${this.props.userType}`}>Login with Facebook</a>
            </div>
        );
    }
};

export default Signup;