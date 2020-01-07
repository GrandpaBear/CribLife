import React from "react";
import { compose, withProps } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mapWithMarkers.scss";
import { DetailedMarker } from "./marker/detailedMarker.jsx";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { withRouter } from "react-router-dom";
import examplePic from "../../images/currentcribexample.png";

const defaultMapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false
};

let selectedPicture;
let selectedTitle;
let selectedPrice;

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
      if (listing.listingId == props.selectedMarker.listingId) {
        selectedTitle = listing.title;
        selectedPrice = listing.price;
      }

      return (
        <DetailedMarker
          listingId={listing.listingId}
          position={listing.position}
          price={listing.price}
          isSelected={
            listing.listingId == props.selectedMarker.listingId ? true : false
          }
          setSelectedMarker={props.setSelectedMarker}
        />
      );
    })}
    {props.selectedMarker.listingId != "" && (
      <div className="floating-panel">
        <div className="row no-gutters">
          <div className="col-lg-6 mapwithmarkers-image">
            <img className="mapwithmarkers-image" src={examplePic} />
          </div>
          <div className="col-lg-6 mapwithmarkers-info">
            <div className="mapwithmarkers-title">
              <label>{selectedTitle}</label>
            </div>
            <div className="mapwithmarkers-price">
              <label>{selectedPrice}</label>
            </div>
          </div>
        </div>
      </div>
    )}
  </GoogleMap>
));

export default MapWithMarkers;
