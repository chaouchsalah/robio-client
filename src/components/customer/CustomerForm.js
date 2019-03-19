import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import Modal from '../Modal';

class CustomerForm extends React.Component {
    state = {name: '', email: '', phone: '', modalState: false, action: 'Updated'};

    updateProfile = (e) => {
        if(this.state.name){
            this.toggleModal();
        }
        e.preventDefault();
    }
    toggleModal = () => {
        this.setState((prev) => {
          const newState = !prev.modalState;
          return { modalState: newState };
        });
      };
      componentDidMount() {
          this.setState({name: this.props.customer.displayName});
      }
    render() {
        const {customer} = this.props;
        return (
            <div>
                {customer &&
                    <form>
                        <figure className="image is-32x32" style={{ display: "inline-block", marginLeft: "5px", marginRight: "10px" }}>
                            <img className="is-rounded" src={this.props.customer.photo} alt="Profile" />
                        </figure>
                        <span>
                            {this.props.customer.displayName}
                        </span>
                        <div className="field">
                            <label className="label has-text-grey-light">Full Name</label>
                            <div className="control has-icons-left has-icons-right">
                                <input 
                                    className="input"
                                    type="text"
                                    value={this.state.name}
                                    onChange={e=>this.setState({name:e.target.value})}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-grey-light">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    value={this.state.email}
                                    onChange={e=>this.setState({email:e.target.value})}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-grey-light">Phone</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    value={this.state.phone}
                                    onChange={e=>this.setState({phone:e.target.value})}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-phone"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control has-text-right">
                                <button className="button" onClick={this.updateProfile}>Update</button>
                            </div>
                        </div>
                    </form>
                }
                <Modal
                closeModal={this.toggleModal}
                modalState={this.state.modalState}
                action={this.state.action} />
            </div>
        );
    }
}

export default connect(null,{
    updateUser
})(CustomerForm);