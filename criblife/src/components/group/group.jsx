import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./group.scss";
import { Nav } from "../nav/nav-index.jsx";
import examplePic from "../../images/currentcribexample.png";
import { ListingGroup } from "./listinggroup.jsx";

export class Group extends React.Component {
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
      ]
    };
  }

  render() {
    return (
      <div>
        <Nav changeView={this.props.changeView} />
        <div className="row no-gutters">
          <div className="col-lg-4 group-title">My Listings</div>
          <div className="col-lg-8" />
        </div>
        <div className="row">
          <div className="col-lg-4">
            <label className="group-group">Roommate Approvals</label>
            <div className="group-list">
              <ul>
                {this.state.listings.map((item, i) => (
                  <li key={`item_${i}`}>
                    <ListingGroup />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <label className="group-group">Pending Owner Approval</label>
            <div className="group-list">
              <ul>
                {this.state.listings.map((item, i) => (
                  <li key={`item_${i}`}>
                    <ListingGroup />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <label className="group-group">Approved</label>
            <div className="group-list">
              <ul>
                {this.state.listings.map((item, i) => (
                  <li key={`item_${i}`}>
                    <ListingGroup />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row no-gutters group-title">My Crib Postings</div>
        <label className="row group-group">Subtenant Approvals</label>
        <div className="row">
          <div className="col-lg-4">
            <div className="group-list">
              <ul>
                {this.state.listings.map((item, i) => (
                  <li key={`item_${i}`}>
                    <ListingGroup />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-8"> Pictures </div>
        </div>
      </div>
    );
  }
}
