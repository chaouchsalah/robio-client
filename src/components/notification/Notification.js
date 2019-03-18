import React, { Component } from 'react';
import axios from 'axios';
import socket from '../../api/socket';

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
    }
}

class Notification extends Component {
    constructor() {
        super();
        this.state = { time: '' }
        const duration = 180;
        let timer = duration, minutes, seconds;
        setInterval(() => {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.setState({ time: `${minutes} : ${seconds}` });

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
    handleAccept = () => {
        const { sekhra, user, users } = this.props;
        if (user.userType === 'coursier') {
            this.acceptSekhra(sekhra, user);
        } else {
            this.shareSekhra(sekhra, user);
        }
        socket.emit('acceptSekhra', { users, sekhra });
    }
    acceptSekhra(sekhra, user) {
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/acceptSekhra`, {
                sekhraId: sekhra,
                user
            });
        } catch (error) {
            console.log(error);
        }
    }
    shareSekhra(sekhra, user) {
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/shareSekhra`, {
                sekhraId: sekhra,
                user
            });
        } catch (error) {
            console.log(error);
        }
    }
    renderNotification = () => {
        const { link } = this.props;
        if (!link) {
            return (
                <div className="notification" style={styles.notification}>
                    Shared sekhra request
                    <button
                        className="button is-small"
                        style={styles.acceptSekhra}
                        onClick={this.handleAccept}
                    >
                        Accepte
                    </button>
                    <button
                        className="button is-small is-light"
                        style={styles.refuseSekhra}
                        onClick={this.props.handler}
                    >
                        Refuse
                    </button>
                    {this.state.time}
                </div>
            );
        }else {
            return (
                <div
                    className="notification"
                    style={styles.notification}
                    onClick={this.props.handler}
                >
                    Your sekhra is ready
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderNotification()}
            </div>
        );
    }

}

export default Notification;