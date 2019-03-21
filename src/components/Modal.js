import React from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';

const Modal = props => {
    if(!props.modalState) {
        return null;
    }
    let content;
    console.log(props.action)
    if(props.action === 'Signup'){
        content = <Signup userType={props.userType}/>
    }else if(props.action === 'Login') {
        content = <Login userType={props.userType}/>
    }else if(props.action === 'Updated') {
        content = "Your profile was successfully updated"
    }
    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={props.closeModal}></div>
            <div className="modal-card">
                <section style={{borderRadius: '5px'}} className="modal-card-body">
                <div className="content">
                    {content}
                </div>
                </section>
            </div>
        </div>
    );
};

export default Modal;