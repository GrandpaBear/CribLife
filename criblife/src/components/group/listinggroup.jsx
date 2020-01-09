import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listinggroup.scss";
import examplePic from "../../images/currentcribexample.png";
import InfoBedroom from "../../images/info-bedroom.png";
import InfoBathroom from "../../images/info-bathroom.png";

export class ListingGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="group-item">
        <div className="row no-gutters">
          <div class="img-wrapper">
            <img class="img-responsive" src={examplePic} />
            <div class="img-overlay">
              <button class="btn btn-md btn-success">Button</button>
            </div>
          </div>
          {/* <img src={examplePic} />
          <button class="listing-group-btn">Button</button> */}
        </div>
      </div>
    );
  }
}
