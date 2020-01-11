import React from "react";
import { Amenity } from "./listing-components/listing-components-index";
import { SquareButton } from "./listing-components/listing-components-index";
import { Navbar } from "./listing-components/listing-components-index";
import Gym from "../../images/gym.png";
import GymInactive from "../../images/gym-black.png";
import Laundry from "../../images/laundry.png";
import LaundryInactive from "../../images/laundry-black.png";
import Study from "../../images/study.png";
import StudyInactive from "../../images/study-black.png";
import Tv from "../../images/tv.png";
import TvInactive from "../../images/tv-black.png";
import Game from "../../images/game.png";
import GameInactive from "../../images/game-black.png";
import AddressPic from "../../images/address.png";
import DatePic from "../../images/date.png";
import ClockPic from "../../images/clock.png";
import Room from "../../images/currentcribexample.png";
import BedIcon from "../../images/bed.png";
import BathIcon from "../../images/toilet.png";
import DistanceIcon from "../../images/shoes.png";

import "./listing.scss";

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: false,
      laundry: false,
      study: false,
      game: false,
      tv: false,
      about: "",
      note: "",
      fees: "",
      price: "100",
      bedroom: "",
      bathroom: "",
      roomdescr: "",
      area: "",
      distance: "",
      member: true
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAmenity = this.toggleAmenity.bind(this);
    this.generateRooms = this.generateRooms.bind(this);
  }

  generateRooms() {}

  toggleEditMode() {
    console.log(this.state.editMode);
    this.setState(prevState => {
      return { editMode: !prevState.editMode };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.about.value);
    this.setState({
      about: event.target.about.value,
      note: event.target.note.value,
      fees: event.target.fees.value,
      price: event.target.price.value,
      roomdescr: event.target.roomdescr.value,
      bedroom: event.target.bedroom.value,
      bathroom: event.target.bathroom.value,
      area: event.target.area.value,
      distance: event.target.distance.value
    });
    this.toggleEditMode();
  }
  toggleAmenity(amenity) {
    if (amenity == "gym") {
      this.setState({
        gym: !this.state.gym
      });
    } else if (amenity == "laundry") {
      this.setState({
        laundry: !this.state.laundry
      });
    } else if (amenity == "study") {
      this.setState({
        study: !this.state.study
      });
    } else if (amenity == "game") {
      this.setState({
        game: !this.state.game
      });
    } else if (amenity == "tv") {
      this.setState({
        tv: !this.state.tv
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {!this.state.editMode && (
          <div className="listing-pg container">
            <div className="row">
              <div className="col-lg-3">
                <div className="row profile-listing">
                  <object
                    className="profile-picture-listing"
                    data={this.state.profilePicture}
                    type="image/png"
                  ></object>
                  <div className="profile-userdetail">
                    <img src={DatePic} />
                    <div className="profile-userdetail-detail">
                      {this.state.username}
                    </div>
                  </div>
                  <div className="profile-userdetail">
                    <img src={AddressPic} />
                    <div className="profile-userdetail-detail">
                      {this.state.location}
                    </div>
                  </div>
                  <div className="profile-userdetail">
                    <img src={ClockPic} />
                    <div className="profile-userdetail-detail">
                      {this.state.school}
                    </div>
                  </div>
                  <div className="price-listing">
                    <div className="price-input">$ {this.state.price}</div>
                    <div className="price-room">/ room</div>
                  </div>

                  <div className="btn-container-listing">
                    {this.state.member && (
                      <button
                        type="submit"
                        className="profile-save"
                        onClick={this.toggleEditMode}
                      >
                        Edit Listing
                      </button>
                    )}
                    {!this.state.member && (
                      <SquareButton label="Contact Seller"></SquareButton>
                    )}
                  </div>
                </div>
                <div className="row room">
                  <h5>Bedroom #1</h5>
                  <div className="bedroom-details">
                    <p className="room-description">{this.state.roomdescr}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-9">
                    <div className="main-img">
                      <img className="img-fluid" src={Room}></img>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="row ">
                      <div className="other-img">
                        <img className="img-fluid" src={Room}></img>
                      </div>
                    </div>
                    <div className="row">
                      <div className="other-img">
                        <img className="img-fluid" src={Room}></img>
                      </div>
                    </div>
                    <div className="row">
                      <div className="other-img">
                        <img className="img-fluid" src={Room}></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col listing-title">
                    181 Lester, Waterloo
                    <hr></hr>
                  </div>
                </div>
                <div className="row listing-details-container">
                  <div className="col-lg-3">
                    <h2 className="details-subheader">Bedrooms Available</h2>
                    <div class="listing-details">
                      <h3>{this.state.bedroom}</h3>
                      <img class="img-fluid details-icon" src={BedIcon}></img>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h2 className="details-subheader">Bathrooms</h2>
                    <div class="listing-details">
                      <h3>{this.state.bathroom}</h3>
                      <img class="img-fluid details-icon" src={BathIcon}></img>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h2 className="details-subheader">Living Area</h2>
                    <div class="listing-details">
                      <h3>{this.state.area}ft</h3>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h2 className="details-subheader">Distance From Campus</h2>
                    <div class="listing-details">
                      <h3>{this.state.distance}km</h3>
                      <img
                        class="img-fluid details-icon"
                        src={DistanceIcon}
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <hr className="mx-3 mt-4"></hr>

                  <div className="col-lg-6 section">
                    <h2 className="subheader">About</h2>
                    {this.state.about}
                  </div>
                  <div className="col-lg-6 section">
                    <h2 className="subheader">Amenities</h2>
                    <div className="amenity-btn">
                      <Amenity
                        activestate={
                          this.state.gym ? "amenity-active" : "amenity-inactive"
                        }
                        label="Gym Facility"
                        icon={this.state.gym ? Gym : GymInactive}
                      />
                    </div>
                    <div className="amenity-btn">
                      <Amenity
                        activestate={
                          this.state.laundry
                            ? "amenity-active"
                            : "amenity-inactive"
                        }
                        label="Ensuite Laundry"
                        icon={this.state.laundry ? Laundry : LaundryInactive}
                      />
                    </div>
                    <div className="amenity-btn">
                      <Amenity
                        activestate={
                          this.state.game
                            ? "amenity-active"
                            : "amenity-inactive"
                        }
                        label="Games Room"
                        icon={this.state.game ? Game : GameInactive}
                      />
                    </div>
                    <div className="amenity-btn">
                      <Amenity
                        activestate={
                          this.state.study
                            ? "amenity-active"
                            : "amenity-inactive"
                        }
                        label="Study Room"
                        icon={this.state.study ? Study : StudyInactive}
                      />
                    </div>
                    <div className="amenity-btn">
                      <Amenity
                        activestate={
                          this.state.tv ? "amenity-active" : "amenity-inactive"
                        }
                        label="TV Room"
                        icon={this.state.tv ? Tv : TvInactive}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 section">
                    <h2 className="subheader">Things to Note</h2>
                    {this.state.note}
                  </div>
                  <div className="col-lg-6 section">
                    <h2 className="subheader">Other Fees</h2>
                    {this.state.fees}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.editMode && (
          <form id="listing" onSubmit={this.handleSubmit}>
            <div className="listing-pg container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="row profile-listing">
                    <object
                      className="profile-picture-listing"
                      data={this.state.profilePicture}
                      type="image/png"
                    ></object>
                    <div className="profile-userdetail">
                      <img src={DatePic} />
                      <div className="profile-userdetail-detail">
                        {this.state.username}
                      </div>
                    </div>
                    <div className="profile-userdetail">
                      <img src={AddressPic} />
                      <div className="profile-userdetail-detail">
                        {this.state.location}
                      </div>
                    </div>
                    <div className="profile-userdetail">
                      <img src={ClockPic} />
                      <div className="profile-userdetail-detail">
                        {this.state.school}
                      </div>
                    </div>
                    <div className="price-listing">
                      <div className="price-input">
                        $
                        <input
                          type="text"
                          name="price"
                          className="profile-userdetail-detail-edit price-input"
                          defaultValue={this.state.price}
                        />
                      </div>
                      <div className="price-room">/ room</div>
                    </div>

                    <div className="btn-container-listing">
                      <button className="profile-save" form="listing">
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="row room">
                    <h5>Bedroom #1</h5>
                    <div className="bedroom-details">
                      <p className="room-description">
                        <textarea
                          type="text"
                          name="roomdescr"
                          className="roomdescr-input"
                          defaultValue={this.state.roomdescr}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="main-img">
                        <img className="img-fluid" src={Room}></img>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="row ">
                        <div className="other-img">
                          <img className="img-fluid" src={Room}></img>
                        </div>
                      </div>
                      <div className="row">
                        <div className="other-img">
                          <img className="img-fluid" src={Room}></img>
                        </div>
                      </div>
                      <div className="row">
                        <div className="other-img">
                          <img className="img-fluid" src={Room}></img>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col listing-title">
                      181 Lester, Waterloo
                      <hr></hr>
                    </div>
                  </div>
                  <div className="row listing-details-container">
                    <div className="col-lg-3">
                      <h2 className="details-subheader">Bedrooms Available</h2>
                      <div class="listing-details">
                        <h3>
                          <input
                            type="text"
                            name="bedroom"
                            className="feature-input"
                            defaultValue={this.state.bedroom}
                          />
                        </h3>
                        <img class="img-fluid details-icon" src={BedIcon}></img>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <h2 className="details-subheader">Bathrooms</h2>
                      <div class="listing-details">
                        <h3>
                          <input
                            type="text"
                            name="bathroom"
                            className="feature-input"
                            defaultValue={this.state.bathroom}
                          />
                        </h3>
                        <img
                          class="img-fluid details-icon"
                          src={BathIcon}
                        ></img>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <h2 className="details-subheader">Living Area</h2>
                      <div class="listing-details">
                        <h3>
                          <input
                            type="text"
                            name="area"
                            className="feature-input"
                            defaultValue={this.state.area}
                          />
                          ft
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <h2 className="details-subheader">
                        Distance From Campus
                      </h2>
                      <div class="listing-details">
                        <h3>
                          <input
                            type="text"
                            name="distance"
                            className="feature-input"
                            defaultValue={this.state.distance}
                          />
                          km
                        </h3>
                        <img
                          class="img-fluid details-icon"
                          src={DistanceIcon}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <hr className="mx-3 mt-4"></hr>

                    <div className="col-lg-6 section">
                      <h2 className="subheader">About</h2>
                      <textarea
                        name="about"
                        form="listing"
                        className="profile-about-description-edit text-area-listing"
                        spellcheck="false"
                      >
                        {this.state.about}
                      </textarea>{" "}
                    </div>
                    <div className="col-lg-6 section">
                      <h2 className="subheader">Amenities</h2>
                      <div
                        className="amenity-btn"
                        onClick={this.toggleAmenity.bind(this, "gym")}
                      >
                        <Amenity
                          activestate={
                            this.state.gym
                              ? "amenity-active"
                              : "amenity-inactive"
                          }
                          label="Gym Facility"
                          icon={this.state.gym ? Gym : GymInactive}
                        />
                      </div>
                      <div
                        className="amenity-btn"
                        onClick={this.toggleAmenity.bind(this, "laundry")}
                      >
                        <Amenity
                          activestate={
                            this.state.laundry
                              ? "amenity-active"
                              : "amenity-inactive"
                          }
                          label="Ensuite Laundry"
                          icon={this.state.laundry ? Laundry : LaundryInactive}
                        />
                      </div>
                      <div
                        className="amenity-btn"
                        onClick={this.toggleAmenity.bind(this, "game")}
                      >
                        <Amenity
                          activestate={
                            this.state.game
                              ? "amenity-active"
                              : "amenity-inactive"
                          }
                          label="Games Room"
                          icon={this.state.game ? Game : GameInactive}
                        />
                      </div>
                      <div
                        className="amenity-btn"
                        onClick={this.toggleAmenity.bind(this, "study")}
                      >
                        <Amenity
                          activestate={
                            this.state.study
                              ? "amenity-active"
                              : "amenity-inactive"
                          }
                          label="Study Room"
                          icon={this.state.study ? Study : StudyInactive}
                        />
                      </div>
                      <div
                        className="amenity-btn"
                        onClick={this.toggleAmenity.bind(this, "tv")}
                      >
                        <Amenity
                          activestate={
                            this.state.tv
                              ? "amenity-active"
                              : "amenity-inactive"
                          }
                          label="TV Room"
                          icon={this.state.tv ? Tv : TvInactive}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 section">
                      <h2 className="subheader">Things to Note</h2>
                      <textarea
                        name="note"
                        form="listing"
                        className="profile-about-description-edit text-area-listing"
                        spellcheck="false"
                      >
                        {this.state.note}
                      </textarea>
                    </div>
                    <div className="col-lg-6 section">
                      <h2 className="subheader">Other Fees</h2>
                      <textarea
                        name="fees"
                        form="listing"
                        className="profile-about-description-edit text-area-listing"
                        spellcheck="false"
                      >
                        {this.state.fees}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}
