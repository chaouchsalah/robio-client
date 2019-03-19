import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import ChangeStatus from './ChangeSatus';
import { fetchCoursier } from '../../actions/userActions';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
        const id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        this.props.fetchCoursier(id);
    }
    render() {
        const id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        return (
            <div>
                Profile
                <ChangeStatus id={id}/>
            </div>
        );
    }
}

export default connect(null, {
    fetchCoursier
})(Profile);