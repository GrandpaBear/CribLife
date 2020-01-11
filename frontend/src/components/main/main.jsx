import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import "./main.scss";
import MapWithAMarkers from "../map/mapWithMarkers.jsx";
import { ListingItem } from "./listingitem.jsx";
import { Nav } from "../nav/nav-index.jsx";

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
      selectedMarker: "",
      lengthValue: "Length",
      termValue: "Start Term",
      roomsValue: "Rooms",
      searchResult: ""
    };
    this.setSelectedMarker = this.setSelectedMarker.bind(this);
    this.changeLengthValue = this.changeLengthValue.bind(this);
    this.changeRoomsValue = this.changeRoomsValue.bind(this);
    this.changeTermValue = this.changeTermValue.bind(this);
  }

  setSelectedMarker(listingId) {
    this.setState({ selectedMarker: listingId });
  }

  changeLengthValue(text) {
    this.setState({ lengthValue: text });
  }

  changeTermValue(text) {
    this.setState({ termValue: text });
  }

  changeRoomsValue(text) {
    this.setState({ roomsValue: text });
  }

  updateSearch = search => {
    this.setState({
      searchResult: "for " + search
    });
  };

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-lg-12">
            <Nav
              changeView={this.props.changeView}
              updateSearch={this.updateSearch}
            />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-7">
            <div className="main-margins">
              <div className="row no-gutters main-searchresult">
                <div className="col-lg-12">
                  {"143 Results " + this.state.searchResult}
                </div>
              </div>
              <div className="row no-gutters main-filters">
                <div className="col-lg-4 text-left w-100">
                  <DropdownButton title={this.state.termValue}>
                    <Dropdown.Item
                      onClick={e => this.changeTermValue(e.target.textContent)}
                    >
                      Any
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeTermValue(e.target.textContent)}
                    >
                      Spring 2020
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeTermValue(e.target.textContent)}
                    >
                      Fall 2020
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeTermValue(e.target.textContent)}
                    >
                      Winter 2021
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeTermValue(e.target.textContent)}
                    >
                      Spring 2021
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="col-lg-4 text-center w-80">
                  <DropdownButton title={this.state.lengthValue}>
                    <Dropdown.Item
                      onClick={e =>
                        this.changeLengthValue(e.target.textContent)
                      }
                    >
                      Any
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e =>
                        this.changeLengthValue(e.target.textContent)
                      }
                    >
                      4-Month
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e =>
                        this.changeLengthValue(e.target.textContent)
                      }
                    >
                      8-Month
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="col-lg-4 text-right w-80">
                  <DropdownButton title={this.state.roomsValue}>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      Any
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      1
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      2
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      3
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      4
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={e => this.changeRoomsValue(e.target.textContent)}
                    >
                      5+
                    </Dropdown.Item>
                  </DropdownButton>
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
