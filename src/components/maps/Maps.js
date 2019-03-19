import React, { Component } from 'react';

class Maps extends Component {
    componentDidMount() {
        window.L.mapquest.key = 't1PJ2T3SKjqCg2tjGdAGGCh86s15JgMe';
        const fg = window.L.featureGroup();
        window.L.mapquest.map('map', {
            center: this.props.start,
            layers: [window.L.mapquest.tileLayer('map'), fg],
            zoom: 13
        });

        window.L.mapquest.directions().route({
            start: this.props.start,
            end: this.props.end,
            waypoints: this.props.waypoints
        });
    }
    render() {
        return (
            <div id="map" style={{ width: "inherit", height: "50vh" }}>
            </div>
        );
    }
}

export default Maps;