import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";
import MapWithAMarkers from "../map/mapWithMarkers.jsx";
import { ListingItem } from "./listingitem.jsx";

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
          title: "181 Lester St. 5 rooms",
          price: "$825",
          members: ["j6chiang", "ahmad"],
          bathroomsShared: 2,
          bedroomsAvailable: 4
        },
        {
          listingId: "2",
          position: { lat: 42.3974868, lng: -71.1124943 },
          title: "Icon",
          price: "$750",
          members: ["ahmad12", "jy"],
          bathroomsShared: 1,
          bedroomsAvailable: 2
        },
        {
          listingId: "3",
          position: { lat: 42.4074868, lng: -71.1224943 },
          title: "CMH Double Rooms!!",
          price: "$600",
          members: ["erinCharky", "ahemad"],
          bathroomsShared: 3,
          bedroomsAvailable: 5
        }
      ],
      selectedMarker: ""
    };
    this.setSelectedMarker = this.setSelectedMarker.bind(this);
  }

  setSelectedMarker(listingId) {
    this.setState({ selectedMarker: listingId });
  }

  render() {
    return (
      <div>
        <div className="row no-gutters navStyle">Nav Bar</div>
        <div className="row no-gutters">
          <div className="col-lg-7">
            <div className="main-margins">
              <div className="row no-gutters main-searchresult">
                <div className="col-lg-12">143 Results for Waterloo, ON</div>
              </div>
              <div className="row no-gutters main-filters">
                <div className="col-lg-12">
                  <div className="main-filter-dropdown">
                    <button type="button" className="main-filter-button">
                      $9999-$9999
                    </button>
                  </div>
                </div>
              </div>
              <div className="row no-gutters main-divider"></div>
              <div className="main-list">
                <ul>
                  {this.state.listings.map((item, i) => (
                    <li key={`item_${i}`}>
                      <ListingItem
                        title={item.title}
                        poster={item.members[0]}
                        bathroom={item.bathroomsShared}
                        bedroom={item.bedroomsAvailable}
                        price={item.price}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
          <div className="col-lg-5">
            <div className="mapDiv">
              <MapWithAMarkers
                listings={this.state.listings}
                setSelectedMarker={this.setSelectedMarker}
                selectedMarker={{ listingId: this.state.selectedMarker }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
