import React from "react";
import { compose, withProps } from "recompose";
import "./mapWithMarkers.scss";
import { DetailedMarker } from "./marker/detailedMarker.jsx";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { withRouter } from "react-router-dom";

const defaultMapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false
};

const MapWithMarkers = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBvaYrU3bnm60a1X4gyhULxiO-5gqhVi48&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    options={defaultMapOptions}
    defaultZoom={13}
    defaultCenter={{ lat: 42.397064, lng: -71.092577 }}
  >
    {props.listings.map(listing => {
      return (
        <DetailedMarker
          position={listing.position}
          listingId={listing.listingId}
          content={listing.content}
          isSelected={listing.listingId == props.selectedMarker ? true : false}
          resetMarkers={props.resetMarkers}
        />
      );
    })}
    <div className="floating-panel">asdf</div>
  </GoogleMap>
));

export default MapWithMarkers;
