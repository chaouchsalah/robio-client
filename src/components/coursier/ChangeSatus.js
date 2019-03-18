import React from 'react';
import { reduxForm } from 'redux-form';
import './ChangeStatus.css';

class ChangeStatus extends React.Component {
    state = {value: "1"}
    statusChange = e => {
        this.setState({value:e.target.value});
    };
    render() {
        return (
            <div>
                <form>
                    <div className="switch">
                        <input name="status"
                            type="radio"
                            className="switch-input"
                            id="status"
                            value="1"
                            checked={this.state.value === "1"}
                            onChange={this.statusChange} />
                        <label htmlFor="status" className="switch-label switch-label-off">Actif</label>
                        <input name="status"
                            type="radio"
                            className="switch-input"
                            id="status"
                            value="0"
                            checked={this.state.value === "0"}
                            onChange={this.statusChange} />
                        <label htmlFor="month" className="switch-label switch-label-on">Inactif</label>
                        <span className="switch-selection"></span>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'changeStatus' 
})(ChangeStatus);