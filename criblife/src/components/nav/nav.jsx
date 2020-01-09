import React from "react";
import "./nav.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoIcon from "../../images/logoIcon.png";
import CreateListing from "../../images/createListing.png";
import CreateListingHover from "../../images/createListingHover.png";

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createListingIcon: CreateListing
    };
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._unhoverCreateListing = this._unhoverCreateListing.bind(this);
    this._hoverCreateListing = this._hoverCreateListing.bind(this);
  }

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.updateSearch(e.target.value);
    }
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
          <input placeholder="Search" onKeyDown={this._handleKeyDown} />
        </div>
        <div className="col-lg-3" />
        <div
          className="col-lg-1 text-center nav-create-listing-button"
          onMouseOver={this._hoverCreateListing}
          onMouseLeave={this._unhoverCreateListing}
          onClick={this._unhoverCreateListing}
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
