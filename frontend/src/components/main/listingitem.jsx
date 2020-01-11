import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listingitem.scss";
import examplePic from "../../images/lester1.png";
import InfoBedroom from "../../images/info-bedroom.png";
import InfoBathroom from "../../images/info-bathroom.png";

export class ListingItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="main-item"
        onClick={this.props.changeView.bind(this, "listing")}
      >
        <div className="row no-gutters">
          <div className="col-lg-6 listingimage">
            <img src={examplePic} />
          </div>
          <div className="col-lg-6 listing-info">
            <div className="row mx-auto no-gutters">
              <div className="col-lg-9 listing-info-title">
                {this.props.title}
              </div>
              <div className="col-lg-3">
                <div className="listing-info-price-container">
                  {this.props.price}
                </div>
              </div>
            </div>
            <div className="row mx-auto no-gutters listing-info-poster">
              {this.props.poster}
            </div>
            <div className="row mx-auto no-gutters listing-info-divider"></div>
            <div className="row mx-auto no-gutters">
              <div className="col-lg-1 listing-info-amount">
                <img src={InfoBedroom} />
              </div>
              <div className="col-lg-2 text-center">{this.props.bedroom}</div>
              <div className="col-lg-2"></div>
              <div className="col-lg-1 listing-info-amount">
                <img src={InfoBathroom} />
              </div>
              <div className="col-lg-2 text-center">{this.props.bathroom}</div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
