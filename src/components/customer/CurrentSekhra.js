import React, { Component } from 'react';
import { connect } from 'react-redux';
import Maps from '../maps/Maps';

class CurrentSekhra extends Component {
    render() {
        return (
            <div>
                {this.props.sekhra && <Maps sekhra={this.props.sekhra}/> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { sekhra: state.sekhra };
}

export default connect(mapStateToProps)(CurrentSekhra);