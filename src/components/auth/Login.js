import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import login from '../../helpers/FBAuth';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h2 className="title">Login</h2>
                <h2 className="subtitle">Welcome To Jible Services</h2><br/>
                <h2 className="subtitle">Welcome To Jible Services</h2><br />
                <button 
                    className="button is-large is-link is-fullwidth"
                    onClick={()=>login(this.props.userType, this.props.signIn)}>
                    Login with Facebook
                </button>
            </div>
        );
    }
};

export default connect(null, {
    signIn
})(Signup); 