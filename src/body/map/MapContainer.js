import React from "react";
import Loading from "../Loading";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const Mapabcd = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAc--U1yrGHEQFhMVY9WB6Zb9IRbu24MW8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <Loading />,
        containerElement: <div class="mapContainer" />,
        mapElement: <div class="mapElement" />
    }),
    withScriptjs,
    withGoogleMap
)(propse => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
));

class MapContainer extends React.PureComponent {
    render() {
        return <Mapabcd />;
    }
}

export default MapContainer;
