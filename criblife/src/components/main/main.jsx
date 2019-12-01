import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-6">
              Filters: Term, Length, Price, Rooms, Whole place,{" "}
            </div>
            <div className="col-lg-6">MoreFilters</div>
          </div>
        </div>
        <div className="col-lg-4">Map</div>
      </div>
    );
  }
}
