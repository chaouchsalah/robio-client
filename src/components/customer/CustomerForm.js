import React from 'react';
import { connect } from 'react-redux';
import { updateCustomer } from '../../actions/userActions';
import Modal from '../Modal';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    state = { displayName: '', email: '', phone: '', modalState: false, action: 'Updated' };

    updateProfile = (e) => {
        if (this.state.displayName) {
            try {
                this.props.updateCustomer(this.props.user._id);
                this.toggleModal();
            } catch (error) {
                // TODO: show error message to user
                console.log(error);
            }
        }
        e.preventDefault();
    }
    toggleModal = () => {
        this.setState((prev) => {
            const newState = !prev.modalState;
            return { modalState: newState };
        });
    };

    componentDidUpdate() {
        const { customer } = this.props;
        if (this.state.displayName !== customer.displayName) {
            this.setState({ displayName: customer.displayName });
        }
        if (this.state.phone !== customer.phone) {
            this.setState({ phone: customer.phone });
        }
        if (this.state.email !== customer.email) {
            this.setState({ email: customer.email });
        }
    }
    renderForm = () => {
        const { customer } = this.props;
        if (customer) {
            return (
                <form>
                    <figure className="image is-32x32" style={{ display: "inline-block", marginLeft: "5px", marginRight: "10px" }}>
                        <img className="is-rounded" src={customer.photo} alt="Profile" />
                    </figure>
                    <span>
                        {customer.displayName}
                    </span>
                    <div className="field">
                        <label className="label has-text-grey-light">Full Name</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="text"
                                value={this.state.displayName}
                                onChange={e => this.setState({ displayName: e.target.value })}
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
                                onChange={e => this.setState({ email: e.target.value })}
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
                                onChange={e => this.setState({ phone: e.target.value })}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-text-right">
                            <button className="button is-info" onClick={this.updateProfile}>Update</button>
                        </div>
                    </div>
                </form>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderForm()}
                <Modal
                    closeModal={this.toggleModal}
                    modalState={this.state.modalState}
                    action={this.state.action} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, {
    updateCustomer
})(CustomerForm);