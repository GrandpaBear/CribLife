import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./group.scss";
import { Nav } from "../nav/nav-index.jsx";
import examplePic from "../../images/mylistingexample.png";
import { ListingGroup } from "./listinggroup.jsx";
import Member from "../../images/profileuser.png";

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
          members: ["Ahmad", "JY", "Daniel", "Ayoub", "Hussein"],
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
          <div className="col-lg-12 group-carousel">
            <Carousel>
              {this.state.listings.map((item, i) => (
                <Carousel.Item>
                  <div className="row">
                    <div className="col-lg-4 ">
                      <div class="group-img-wrapper">
                        <img class="group-img-responsive" src={examplePic} />
                        <div class="group-img-overlay">
                          <div className="group-img-close" />
                          <div className="group-img-btn">
                            Awaiting Group Response
                          </div>
                          {/* <div className="group-img-btn-disabled" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      {item.members.map((item, i) => (
                        <div className="group-carousel-member float-left">
                          <div className="group-member-picture">
                            <img src={Member} />
                            <label>{item}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="row no-gutters group-title">My Crib Postings</div>
        <div className="row">
          <div className="col-lg-12 group-carousel">
            <Carousel>
              {this.state.listings.map((item, i) => (
                <Carousel.Item>
                  <div className="row">
                    <div className="col-lg-4 ">
                      <div class="group-img-wrapper">
                        <img class="group-img-responsive" src={examplePic} />
                        <div class="group-img-overlay">
                          <div className="group-img-close" />
                          <div className="group-img-btn">
                            Awaiting Group Response
                          </div>
                          {/* <div className="group-img-btn-disabled" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      {item.members.map((item, i) => (
                        <div className="group-carousel-member float-left">
                          <div className="group-member-picture">
                            <img src={Member} />
                            <label>{item}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */
}
