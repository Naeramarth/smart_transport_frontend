import React from "react";
import Loading from "../Loading";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const MapElement = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAc--U1yrGHEQFhMVY9WB6Zb9IRbu24MW8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <Loading />,
        containerElement: <div class="mapContainer" />,
        mapElement: <div class="mapElement" />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={
            new window.google.maps.LatLng(
                props.coordinates.lat,
                props.coordinates.lon
            )
        }
    >
        {props.markers.map((marker, index) => (
            <Marker
                position={marker.position}
                labelAnchor={new window.google.maps.Point(0, 0)}
                key={index}
                label={marker.device}
            />
        ))}
    </GoogleMap>
));

class MapContainer extends React.PureComponent {
    pushMarker(device, markerData) {
        for (let j in device.data) {
            if (
                device.data[j].positionData &&
                device.data[j].active &&
                device.data[j].value
            ) {
                let lat = device.data[j].value.lat;
                let lng = device.data[j].value.lon;
                if (
                    lat != null &&
                    lng != null &&
                    lat >= -90 &&
                    lat <= 90 &&
                    lng >= -180 &&
                    lng <= 180
                ) {
                    markerData.push({
                        position: {
                            lat: lat,
                            lng: lng
                        },
                        device: device.name
                    });
                }
            }
        }
    }

    render() {
        let markerData = [];
        let coordinates = this.props.coordinates;
        if (this.props.devices) {
            for (let i in this.props.devices) {
                let device = this.props.devices[i];
                this.pushMarker(device, markerData);
            }
        } else if (this.props.device) {
            let device = this.props.device;
            this.pushMarker(device, markerData);
        }
        if (!coordinates) {
            coordinates = { lat: 0, lon: 0 };
        }
        return (
            <MapElement
                markers={markerData}
                zoom={this.props.zoom}
                coordinates={coordinates}
            />
        );
    }
}

export default MapContainer;
