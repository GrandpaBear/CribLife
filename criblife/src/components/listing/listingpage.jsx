import React from "react";
import {Amenity} from "./listing-components/listing-components-index";
import {SquareButton} from "./listing-components/listing-components-index";
import {Navbar} from "./listing-components/listing-components-index";
import Gym from "../../images/gym.png";
import AddressPic from "../../images/address.png";
import DatePic from "../../images/date.png";
import ClockPic from "../../images/clock.png";
import Room from "../../images/currentcribexample.png";
import "./listing.scss";

export class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }

        this.generateAmenity=this.generateAmenity.bind(this);
    }

    generateAmenity() {
        return (
            <div>
                <Amenity label="Gym" icon={Gym}/>
                <Amenity label="Study Rooms" icon={Gym}/>
                <Amenity label="Ensuite Laundry" icon={Gym}/>
                <Amenity label="Games Room" icon={Gym}/>
                <Amenity label="TV Lounge" icon={Gym}/>
            </div>
        );
    }

    render () {
        return (
            <div>
                <Navbar></Navbar>
                <div className="listing-pg container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="profile-listing">
                                        <object
                                        className="profile-picture-listing"
                                        data={this.state.profilePicture}
                                        type="image/png"></object>
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
                                        $850
                                    </div>
                                    <div className="price-room">
                                        / room
                                    </div>
                                </div>

                                <div className="btn-container-listing">
                                    <SquareButton label="Contact Seller"></SquareButton>
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
                                        <div  className="other-img">
                                            <img className="img-fluid" src={Room}></img>
                                        </div>                                    
                                    </div>
                                    <div className="row">
                                        <div  className="other-img">
                                            <img className="img-fluid" src={Room}></img>
                                        </div>                                    
                                    </div>
                                    <div className="row">
                                        <div  className="other-img">
                                            <img className="img-fluid" src={Room}></img>
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col listing-title">
                                    181 Lester, Waterloo
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <h2 className="details-subheader">Bedrooms Available</h2>
                                </div>
                                <div className="col-lg-3">
                                    <h2 className="details-subheader">Bathrooms</h2>
                                </div>
                                <div className="col-lg-3">
                                    <h2 className="details-subheader">Living Area</h2>
                                </div>
                                <div className="col-lg-3">
                                    <h2 className="details-subheader">Distance From Campus</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 section">
                                    <h2 className="subheader">About</h2>
                                </div>
                                <div className="col-lg-6 section">
                                    <h2 className="subheader">Amenities</h2>
                                    {this.generateAmenity()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 section">
                                    <h2 className="subheader">Things to Note</h2>
                                </div>
                                <div className="col-lg-6 section">
                                    <h2 className="subheader">Other Fees</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }


}

