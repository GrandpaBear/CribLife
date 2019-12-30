import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";
import MapWithAMarkers from "../map/mapWithMarkers.jsx";

import UnfoldMoreNonActive from "../../images/unfoldmorenonactive.png";
import UnfoldMoreActive from "../../images/unfoldmoreactive.png";
import UnfoldLess from "../../images/unfoldless.png";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [
        {
          listingId: "1",
          position: { lat: 42.3875968, lng: -71.0994968 },
          content: "$233",
          isSelected: false
        },
        {
          listingId: "2",
          position: { lat: 42.3974868, lng: -71.1124943 },
          content: "$753",
          isSelected: false
        },
        {
          listingId: "3",
          position: { lat: 42.4074868, lng: -71.1224943 },
          content: "$600",
          isSelected: false
        }
      ],
      selectedMarker: ""
    };
    this.resetMarkers = this.resetMarkers.bind(this);
  }

  resetMarkers(listingId) {
    this.setState({ selectedMarker: listingId });
    // let listings = this.state.listings;
    // for (let i = 0; i < listings.length; i++) {
    //   if (listings[i].listingId != listingId) {
    //     listings[i].isSelected = false;
    //   } else {
    //     listings[i].isSelected = true;
    //   }
    // }
    // this.setState({
    //   listings: listings
    // });
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-lg-6">
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="main-filter">
                <div className="main-filter-dropdown">
                  <button type="button" className="main-filter-button">
                    Any Term
                  </button>
                </div>
                <div className="main-filter-dropdown">
                  <div className="main-filter-button">
                    Any Length
                    <img src={UnfoldMoreNonActive} />
                  </div>
                </div>
                <div className="main-filter-dropdown">
                  <button type="button" className="main-filter-button">
                    $9999-$9999
                  </button>
                </div>
                <div className="main-filter-dropdown">
                  <button type="button" className="main-filter-button">
                    Any # Rooms
                  </button>
                </div>
                <div className="main-filter-dropdown">
                  <button type="button" className="main-filter-button">
                    Whole place
                  </button>
                </div>
                <div className="main-filter-dropdown">
                  <button type="button" className="main-filter-button">
                    More Filters
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-lg-6">
          <div className="mapDiv">
            <MapWithAMarkers
              listings={this.state.listings}
              resetMarkers={this.resetMarkers}
              selectedMarker={this.state.selectedMarker}
            />
          </div>
        </div>
      </div>
    );
  }
}
