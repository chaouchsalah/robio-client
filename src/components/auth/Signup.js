import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions';
import signup from '../../helpers/FBAuth';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h2 className="title">Signup</h2>
                <h2 className="subtitle">Welcome To Jible Services</h2><br/>
                <button
                    className="button is-large is-link is-fullwidth"
                    onClick={()=>signup(this.props.userType,this.props.signIn)}>
                    Signup with Facebook
                </button>
            </div>
        );
    }
};

export default connect(null,{
    signIn
})(Signup);