import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";

import UnfoldMoreNonActive from "../../images/unfoldmorenonactive.png";
import UnfoldMoreActive from "../../images/unfoldmoreactive.png";
import UnfoldLess from "../../images/unfoldless.png";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-7">
          <div className="row">
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
          </div>
        </div>
        <div className="col-lg-5">Map</div>
      </div>
    );
  }
}
