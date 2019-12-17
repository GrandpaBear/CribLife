import React from "react";
import "./nav.scss";

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className=""
          onClick={() => this.props.changeView("main")}
        >
          Main
        </button>
        <button
          type="button"
          className=""
          onClick={() => this.props.changeView("createListing")}
        >
          Create a Listing
        </button>
        <button
          type="button"
          className=""
          onClick={() => this.props.changeView("profile")}
        >
          Profile
        </button>
        <button
          type="button"
          className=""
          onClick={() => this.props.changeView("listing")}
        >
          Listing
        </button>
      </div>
    );
  }
}
