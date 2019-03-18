import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { fetchUser } from '../../actions/userActions';
import { fetchSekhra } from '../../actions/sekhraActions';
import { addSekhra } from '../../helpers/sekhra';
import Maps from '../maps/Maps';

class RequestSekhra extends Component {
    constructor(props) {
        super(props);
        const { sekhra } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        if (sekhra) {
            const token = sessionStorage.getItem('token');
            this.props.fetchSekhra(token, sekhra);
        }
    }
    state = {
        items: [],
        description: '',
        item: '',
        from: '',
        to: '',
        route: '',
        time: '',
        distance: '',
        action: '',
        price: '',
        coursier: {}
    };
    componentDidUpdate() {
        const { sekhra } = this.props;
        if (Object.keys(sekhra).length !== 0) {
            if (sekhra.from !== this.state.from) {
                const { from, to, description, items, route } = sekhra;
                this.setState({
                    action: 'validate',
                    from,
                    to,
                    description,
                    items,
                    route: route.waypoints,
                    time: route.formattedTime,
                    distance: route.distance
                });
            }
        }
    }
    renderAddedItem = () => {
        return this.state.items.map((item, index) => {
            return (
                <div className="columns notification is-info" key={index}
                    style={{ padding: "0" }}>
                    <li className="column is-11" key={index}>
                        {item}
                    </li>
                    <span className="column icon is-small"
                        onClick={() => this.removeItem(index)}
                        style={{ cursor: "pointer", float: "right" }}>
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
                    className="button is-primary is-fullwidth"
                    onClick={this.estimateSekhra}
                    style={{ backgroundColor: "rgb(55,135,103)" }}>
                    Estimate
                    </button>
            );
        } else {
            return (
                <button
                    className="button is-primary is-fullwidth"
                    onClick={this.validateSekhra}
                    style={{ backgroundColor: "rgb(55,135,103)" }}>
                    Validate Sekhra
                    </button>
            );
        }
    }
    estimateSekhra = async () => {
        const token = sessionStorage.getItem('token');
        try {
            this.props.fetchUser(token);
        } catch (error) {
            console.log(error);
        }
        const {
            from,
            to,
            description,
            items
        } = this.state;
        const customer = this.props.user;
        if (from && to && description && items.length !== 0) {
            try {
                const sekhra = {
                    from,
                    to,
                    description,
                    items,
                    customer
                }
                addSekhra(sekhra, token);
            } catch (error) {
                // TODO: show error message to user
                console.log(error);
            }

        }
    }
    // validateSekhra = () => {
    //     const shapePoints = this.state.route;
    //     const start = shapePoints[0];
    //     const end = shapePoints[shapePoints.length - 1];
    //     if (this.state.description && this.state.items.length !== 0) {
    //         const sekhra = {
    //             from: start,
    //             to: end,
    //             description: this.state.description,
    //             items: this.state.items,
    //             waypoints: shapePoints,
    //             customer: this.props.user,
    //             coursier: this.state.coursier
    //         }
    //         try {
    //             this.props.addSekhra(sekhra);
    //         } catch (error) {
    //             // TODO: show error message to user
    //             console.log(error);
    //         }
    //         history.push('/customer/profile?action=current');
    //     }
    // }
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
            <div style={{ marginTop: "15vh", marginBottom: "15vh" }}>
                <div className="columns">
                    <div className="column is-offset-2 is-4">
                        <h2 className="title">Request Sekhra</h2>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-offset-2 is-4">
                        <div className="field">
                            <label className="label has-text-grey-light is-size-7">Describe your sekhra</label>
                            <div className="control has-icons-left">
                                <input className="input"
                                    type="text"
                                    value={this.state.description}
                                    style={{ height: "8vh" }}
                                    onChange={(e) => this.setState({ description: e.target.value })} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </div>
                        </div>
                        <label className="label has-text-grey-light is-size-7">Describe your sekhra</label>

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
                        <div className="columns">
                            <div className="column field">
                                <label className="label has-text-grey-light is-size-7">Describe your sekhra</label>
                                <div className="control has-icons-left">
                                    <div className="select">
                                        <select>
                                            <option defaultValue>ASAP</option>
                                        </select>
                                    </div>
                                    <span className="icon is-left">
                                        <i className="far fa-clock"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="column field">
                                <label className="label has-text-grey-light is-size-7">Describe your sekhra</label>
                                <div className="control has-icons-left">
                                    <input className="input"
                                        type="date"
                                        value={this.state.description}
                                        onChange={(e) => this.setState({ description: e.target.value })} />
                                    <span className="icon is-small is-left">
                                        <i className="far fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-grey-light is-size-7">Describe your sekhra</label>
                            <div className="control has-icons-left">
                                <input className="input"
                                    type="text"
                                    value={this.state.price}
                                    disabled />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-dollar-sign"></i>
                                </span>
                            </div>
                        </div>
                        {this.renderAction()}
                    </div>
                    <div className="column is-4">
                        <label className="label has-text-grey-light is-size-7">Address</label>
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
                        {this.renderMap()}
                        {this.renderDuration()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user.user, sekhra: state.sekhra.sekhra };
}

export default connect(mapStateToProps, {
    fetchUser,
    fetchSekhra
})(RequestSekhra);