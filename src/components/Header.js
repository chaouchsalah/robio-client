import React from 'react';
import { Link } from 'react-router-dom';
import GreenLogo from '../images/logoGreen.png';
import { connect } from 'react-redux';
import socket from '../api/socket';
import { fetchUser } from '../actions/userActions';
import Notification from './notification/Notification';

const styles = {
    notification: {
        fontSize: "13px",
        backgroundColor: "white",
        border: "1.5px solid #f1f1f1"
    },
    acceptSekhra: {
        marginLeft: "2vh",
        marginRight: "1vh",
        backgroundColor: "rgb(55,135,103)",
        color: "white"
    },
    refuseSekhra: {
        marginRight: "2vh"
    },
    headerImage: {
        display: "inline-block",
        marginLeft: "5px",
        marginRight: "10px"
    }
}
class Header extends React.Component {
    state = { notification: false, sekhraId: null, timeStamp: null, users: [], link: false };
    componentDidMount() {
        let { user } = this.props.user;
        if (Object.keys(user).length === 0) {
            const token = sessionStorage.getItem('token');
            this.props.fetchUser(token);
        }
    }
    handleNotification = () => {
        this.setState({ notification: false });
    }
    componentDidUpdate() {
        const { user } = this.props.user;
        socket.on('notification', (data) => {
            const { users, sekhra } = data;
            if (users.includes(user._id)) {
                if (this.state.users.length === 0) {
                    this.setState({ users });
                }
                this.setState({
                    sekhraId: sekhra,
                    timeStamp: sekhra.createdAt,
                    notification: true
                });
            }
        });
        socket.on('deleteNotification', (data) => {
            const { users } = data;
            if (users.includes(user._id)) {
                this.setState({
                    sekhraId: null,
                    timeStamp: null,
                    notification: false
                });
            }
        });
        socket.on('readySekhra', (data) => {
            const { sekhra } = data;
            if (user._id === sekhra.customer) {
                this.setState({
                    sekhraId: sekhra._id,
                    notification: true,
                    link: true
                });
            }
        });
    }
    renderNotification = () => {
        if (this.state.notification) {
            const { sekhraId, timeStamp, users, link } = this.state;
            const { user } = this.props.user;
            if (link) {
                return (
                    <Link to={`/requestSekhra?sekhra=${sekhraId}`}>
                        <Notification
                            sekhra={sekhraId}
                            timeStamp={timeStamp}
                            user={user}
                            handler={this.handleNotification}
                            users={users}
                            link={link}
                        />
                    </Link>
                )
            } else {
                return (
                    <Notification
                        sekhra={sekhraId}
                        timeStamp={timeStamp}
                        user={user}
                        handler={this.handleNotification}
                        users={users}
                    />
                );
            }
        }
    }
    render() {
        const { user } = this.props.user;
        return (
            <section className="hero is-large is-bold">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="columns" style={{ marginTop: "20px" }}>
                                <div className="column is-5">
                                    <div className="columns">
                                        <Link to='/' className="column is-3" href="somewhre">
                                            <img className="image" src={GreenLogo} alt="Logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    {this.renderNotification()}
                                </div>
                                <div className="column">
                                    <span className="icon is-large">
                                        <i className="far fa-bell far fa-2x"></i>
                                    </span>
                                    <figure className="image is-32x32" style={styles.headerImage}>
                                        <img className="is-rounded" src={user.photo} alt="Profile" />
                                    </figure>
                                    <span>
                                        {user.displayName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        );
    }
}


export default connect(null, {
    fetchUser
})(Header);