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
import examplePic from "../../images/lester1.png";

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
let selectedPoster;
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
    defaultCenter={{ lat: 43.471287, lng: -80.532566 }}
  >
    {props.listings.map(listing => {
      if (listing.listingId == props.selectedMarker.listingId) {
        selectedTitle = listing.title;
        selectedPoster = listing.members[0];
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
            <div className="mapwithmarkers-poster">
              <label>{selectedPoster}</label>
            </div>
            <div className="row mapwithmarkers-price">
              <div className="col-lg-5 listing-info-price-container">
                {selectedPrice}
              </div>
              <div className="col-lg-7 " />
            </div>
          </div>
        </div>
      </div>
    )}
  </GoogleMap>
));

export default MapWithMarkers;
