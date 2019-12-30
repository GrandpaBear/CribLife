import React from "react";
import MarkerIconActive from "../../../images/markerIconActive.png";
import MarkerIconInactive from "../../../images/markerIconInactive.png";
import { Marker } from "react-google-maps";

export class DetailedMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.listingId,
      markerIcon: MarkerIconInactive,
      isSelected: this.props.isSelected,
      label: this.props.content
    };
    this.onToggleSelection = this.onToggleSelection.bind(this);
    this.onMouseOverMarker = this.onMouseOverMarker.bind(this);
    this.onMouseOutMarker = this.onMouseOutMarker.bind(this);
  }

  componentDidMount() {
    if (this.props.isSelected == true) {
      this.setState({
        markerIcon: MarkerIconActive
      });
    }
  }

  onToggleSelection() {
    // this.setState({
    //   isSelected: !this.state.isSelected
    // });
    // if (this.state.isSelected) {
    //   this.onMouseOverMarker();
    // } else {
    //   this.onMouseOutMarker();
    // }
    this.props.resetMarkers(this.state.listingId);
  }

  onMouseOverMarker() {
    if (!this.state.isSelected) {
      this.setState({
        markerIcon: MarkerIconActive
      });
    }
  }

  onMouseOutMarker() {
    if (!this.state.isSelected) {
      this.setState({
        markerIcon: MarkerIconInactive
      });
    }
  }

  render() {
    return (
      <Marker
        position={this.props.position}
        onClick={() => this.onToggleSelection()}
        label={{
          text: this.state.label,
          color: "#FFFFFF",
          fontFamily: "Avenir-Bold",
          fontSize: "14px"
        }}
        onMouseOver={() => this.onMouseOverMarker()}
        onMouseOut={() => this.onMouseOutMarker()}
        options={{ icon: this.state.markerIcon }}
      ></Marker>
    );
  }
}
