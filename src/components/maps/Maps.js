import React, { Component } from 'react';
import socket from '../../api/socket';
class Maps extends Component {
    componentDidMount() {
        window.L.mapquest.key = 't1PJ2T3SKjqCg2tjGdAGGCh86s15JgMe';
        let second = false;
        var customIcon = window.L.mapquest.icons.circle({
            primaryColor: '#3b5998'
        });
        socket.on('locateUser', function (data) {
            if (second) {
                //fg.removeLayer(fg.getLayers()[0]);
            }
            window.L.marker(data, { icon: customIcon }).addTo(fg);
            second = true;
        });
        const fg = window.L.featureGroup();
        const map = window.L.mapquest.map('map', {
            center: [33.99556989464775, -6.849930003465869],
            layers: [window.L.mapquest.tileLayer('map'), fg],
            zoom: 13
        });
        
        let start, end, waypoints;
        if(this.props.sekhra) {
            
            waypoints = this.props.sekhra.sekhra.waypoints;
            start = waypoints[0];
            end = waypoints[waypoints.length-1];
            

            window.L.mapquest.directions().route({
                start: start,
                end: end,
                waypoints: waypoints
            });
            window.L.marker(start).addTo(map);
            window.L.marker(end).addTo(map);
        } else {
            start = this.props.start;
            end= this.props.end;
            waypoints= this.props.waypoints;
            window.L.mapquest.directions().route({
                start: start,
                end: end,
                waypoints: waypoints
            });
        }

    }
    render() {
        return (
            <div id="map" style={{ width: "100%", height: "50vh" }}>
            </div>
        );
    }
}

export default Maps;