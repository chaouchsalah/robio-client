import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addSekhra } from '../../actions';
import history from '../../history';
import Header from '../Header';
import Footer from '../Footer';
import Maps from '../maps/Maps';

class RequestSekhra extends Component {
    state = {
        items: [],
        description: null,
        item: null,
        from: null,
        to: null,
        route: null,
        time: null,
        distance: null,
        action: null,
        coursier: null
    };
    renderAddedItem = () => {
        return this.state.items.map((item, index) => {
            return (
                <div className="tile notification is-info" key={index}>
                    <li key={index}>
                        {item}
                    </li>
                    <span className="icon is-small is-right"
                        onClick={() => this.removeItem(index)}
                        style={{ cursor: "pointer", marginLeft: "60%" }}>
                        <i className="fas fa-minus"></i>
                    </span>
                </div>

            );
        })
    };
    addItem = () => {
        if (this.state.item !== '') {
            this.setState({ items: [...this.state.items, this.state.item], item: '' });
        }
    };
    removeItem = (index) => {
        let newItems = this.state.items;
        newItems.splice(index, 1);
        this.setState({ items: newItems });
    };
    renderAction = () => {
        if (!this.state.action) {
            return (
                <button
                    className="button is-primary"
                    onClick={this.estimateSekhra}>
                    Estimate
                        </button>
            );
        } else {
            return (
                <button
                    className="button is-primary"
                    onClick={this.validateSekhra}>
                    Validate Sekhra
                        </button>
            );
        }
    }
    estimateSekhra = async () => {
        if (this.state.from && this.state.to) {
            try{
                const response = await axios.post(
                    'http://localhost:6200/sekhrasEstimation',
                    {
                        from: this.state.from,
                        to: this.state.to,
                        customer: this.props.user
                    }
                );
                const routes = response.data.routes
                this.setState({
                    coursier: response.data.coursier,
                    route: routes.shapePoints,
                    distance: routes.distance,
                    time: routes.formattedTime,
                    action: 'validate'
                });
            }catch(error) {
                // TODO: show error message to user
                console.log(error);
            }
            
        }
    }
    validateSekhra = async () => {
        const shapePoints = this.state.route;
        const start = shapePoints[0];
        const end = shapePoints[shapePoints.length - 1];
        if (this.state.description && this.state.items.length !== 0) {
            const sekhra = {
                from: start,
                to: end,
                description: this.state.description,
                items: this.state.items,
                waypoints: shapePoints,
                customer: this.props.user,
                coursier: this.state.coursier
            }
            try {
                await axios.post(
                    'http://localhost:6200/sekhras',
                    {
                        sekhra: {
                            from: start,
                            to: end,
                            description: this.state.description,
                            items: this.state.items
                        },
                        customer: this.props.user,
                        coursier: this.state.coursier
                    }
                );
            }catch(error) {
                // TODO: show error message to user
                console.log(error);
            }

            this.props.addSekhra(sekhra);
            history.push('/customer/profile?action=current');
        }
    }
    renderMap = () => {
        if (this.state.route) {
            const shapePoints = this.state.route;
            const start = shapePoints[0];
            const end = shapePoints[shapePoints.length - 1];
            return (
                <div>
                    <Maps start={start} end={end} wayPoints={shapePoints} />
                </div>
            );
        }
    }
    renderDuration = () => {
        if (this.state.route) {
            return (
                <div className="tile notification">
                    {this.state.distance} Km <br />
                    {this.state.time}
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <Header />
                <h2 className="title">Request Sekhra</h2>
                <div className="columns">
                    <div className="column is-offset-2 is-4">
                        <div className="field">
                            <label className="label">Describe your sekhra</label>
                            <div className="control has-icons-left">
                                <input className="input"
                                    type="text"
                                    value={this.state.description}
                                    onChange={(e) => this.setState({ description: e.target.value })} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field has-addons">
                            <div className="control has-icons-left has-icons-right is-expanded">
                                <input className="input"
                                    type="text"
                                    value={this.state.item}
                                    onChange={(e) => this.setState({ item: e.target.value })} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-archive"></i>
                                </span>

                            </div>
                            <div className="control">
                                <span className="button"
                                    onClick={this.addItem}
                                    style={{ cursor: "pointer" }}>
                                    <i className="fas fa-plus"></i>
                                </span>
                            </div>
                        </div>
                        <ul style={{ listStyleType: "disc" }}>
                            {this.renderAddedItem()}
                        </ul>
                        <div className="field has-addons">
                            <p className="control">
                                <span className="button">From</span>
                            </p>
                            <p className="control is-expanded">
                                <input className="input"
                                    type="text"
                                    value={this.state.from}
                                    onChange={(e) => this.setState({ from: e.target.value })} />
                            </p>
                        </div>
                        <div className="field has-addons">
                            <p className="control">
                                <span className="button">To</span>
                            </p>
                            <p className="control is-expanded">
                                <input className="input"
                                    type="text"
                                    value={this.state.to}
                                    onChange={(e) => this.setState({ to: e.target.value })} />
                            </p>
                        </div>
                        {this.renderAction()}
                    </div>
                    <div className="column is-4">
                        {this.renderMap()}
                        {this.renderDuration()}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, {
    addSekhra
})(RequestSekhra);