import React from "react";
import "./nav.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoIcon from "../../images/logoIcon.png";
import CreateListing from "../../images/createListing.png";
import CreateListingHover from "../../images/createListingHover.png";
import { LocationSearchInput } from "../create-steps/LocationSearchInput.jsx";

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createListingIcon: CreateListing
    };
    this._handleSelect = this._handleSelect.bind(this);
    this._unhoverCreateListing = this._unhoverCreateListing.bind(this);
    this._hoverCreateListing = this._hoverCreateListing.bind(this);
  }

  _handleSelect = (address, Latlng) => {
    console.log("hello");
    this.props.updateSearch(address);
  };

  _unhoverCreateListing() {
    this.setState({
      createListingIcon: CreateListing
    });
  }

  _hoverCreateListing() {
    this.setState({
      createListingIcon: CreateListingHover
    });
  }

  render() {
    return (
      <div className="row no-gutters navbar">
        <div
          className="col-lg-1 nav-logo"
          onClick={this.props.changeView.bind(this, "main")}
        >
          <img src={LogoIcon} />
        </div>
        <div className="col-lg-3 search">
          <LocationSearchInput _handleSelect={this._handleSelect} />
        </div>
        <div className="col-lg-3" />
        <div
          className="col-lg-1 text-center nav-create-listing-button"
          onMouseOver={this._hoverCreateListing}
          onMouseLeave={this._unhoverCreateListing}
          onClick={this.props.changeView.bind(this, "CreateStep")}
        >
          <img src={this.state.createListingIcon} />
        </div>
        <div
          className="col-lg-1 text-center nav-button"
          onClick={this.props.changeView.bind(this, "main")}
        >
          Listings
        </div>
        <div
          className="col-lg-1 text-center nav-button"
          onClick={this.props.changeView.bind(this, "group")}
        >
          Groups
        </div>
        <div
          className="col-lg-1 text-center nav-button"
          onClick={this.props.changeView.bind(this, "profile")}
        >
          Profile
        </div>
        <div
          className="col-lg-1 text-center nav-button"
          onClick={this.props.changeView.bind(this, "LandingPage")}
        >
          Logout
        </div>
      </div>
    );
  }
}
