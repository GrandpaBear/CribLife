import React from "react";

export class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenity: false
    };
    this.toggleAmenity = this.toggleAmenity.bind(this);
  }

  toggleAmenity() {
    this.setState({
      amenity: !this.state.amenity
    });
  }

  render() {
    return (
      <div onClick={this.toggleAmenity}>
        <p>amenity:</p>
        <p>
          {this.state.amenity && (
            <div>IF this displays amenity is set to true</div>
          )}
          {!this.state.amenity && (
            <div>IF this displays amenity is set to false</div>
          )}
        </p>
      </div>
    );
  }
}
