import "./create-step.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "../nav/nav-index.jsx";
import { LocationSearchInput } from "./LocationSearchInput.jsx";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import React from "react";
import X from "../../images/x.png";

export class CreateStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: "Length",
      termValue: "Start Term",
      roomsValue: "Rooms",
      roommates_description: "",
      postingName_description: "",
      address: "",
      latLng: ""
    };
    this.changeLengthValue = this.changeLengthValue.bind(this);
    this.changeTermValue = this.changeTermValue.bind(this);
    this.changeRoomsValue = this.changeRoomsValue.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this.onChangePostingNameDescription = this.onChangePostingNameDescription.bind(
      this
    );
    this.onChangeRoommatesDescription = this.onChangeRoommatesDescription.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);
    this.char_count = this.char_count.bind(this);
  }

  changeLengthValue(text) {
    this.setState({ lengthValue: text });
  }

  changeTermValue(text) {
    this.setState({ termValue: text });
  }

  changeRoomsValue(text) {
    this.setState({ roomsValue: text });
  }

  _handleSelect(address, latLng) {
    this.setState({
      address: address,
      latLng: latLng
    });
  }

  onChangePostingNameDescription(e) {
    this.setState({ postingName_description: e.target.value });
  }

  onChangeRoommatesDescription(e) {
    this.setState({ roommates_description: e.target.value });
  }

  char_count(str, letter) {
    var letter_Count = 0;
    for (var position = 0; position < str.length; position++) {
      if (str.charAt(position) == letter) {
        letter_Count += 1;
      }
    }
    return letter_Count;
  }

  onSubmit(e) {
    if (
      this.state.address != "" &&
      this.state.lengthValue != "Length" &&
      this.state.termValue != "Start Term" &&
      this.state.roomsValue != "Rooms" &&
      this.state.postingName_description != "" &&
      this.state.address != "" &&
      this.state.latLng != "" &&
      this.state.roommates_description.value.match(/^[a-zA-Z0-9,]+$/) &&
      this.state.roommates_description.charAt(0) != "," &&
      this.char_count(this.state.roommates_description, ",") < 5
    ) {
      let validRoommates = true;
      let startIndex = 0;
      let roommateCount = 0;
      let roommates = ["", "", "", "", ""];
      if (this.state.roommates_description.length != 0) {
        for (let i = 0; i < this.state.roommates_description.length; i++) {
          if (this.state.roommates_description.charAt(i) == ",") {
            roommates[
              roommateCount
            ] = this.state.roommates_description.substring(startIndex, i + 1);
            ++roommateCount;
            startIndex = i + 1;
          }
        }
      }
    }
    this.props.changeView("listing");
  }

  render() {
    return (
      <div className="row">
        {/* <Nav changeView={this.props.changeView} /> */}
        <div className="col-lg-1" />
        <div
          className="col-lg-8 create-step-base-container"
          ref={this.props.containerRef}
        >
          <form onSubmit={this.onSubmit}>
            {/* <div className="create-step-header">create-step</div> */}
            <div className="create-step-content">
              <div className="create-step-form">
                <div className="create-step-form-group">
                  <label>Name of Posting</label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.postingName_description}
                    onChange={this.onChangePostingNameDescription}
                  />
                </div>
                <div className="create-step-form-group">
                  <label>Address</label>
                  <LocationSearchInput _handleSelect={this._handleSelect} />
                </div>
                <div className="create-step-form-group">
                  <label>Roommates</label>
                  <input
                    type="text"
                    name="address"
                    value={this.state.roommates_description}
                    onChange={this.onChangeRoommatesDescription}
                  />
                </div>
                <div className="row no-gutters create-step-filters">
                  <div className="col-lg-4 text-left w-100">
                    <DropdownButton title={this.state.termValue}>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeTermValue(e.target.textContent)
                        }
                      >
                        Spring 2020
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeTermValue(e.target.textContent)
                        }
                      >
                        Fall 2020
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeTermValue(e.target.textContent)
                        }
                      >
                        Winter 2021
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeTermValue(e.target.textContent)
                        }
                      >
                        Spring 2021
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col-lg-4 text-center w-80">
                    <DropdownButton title={this.state.lengthValue}>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeLengthValue(e.target.textContent)
                        }
                      >
                        4-Month
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeLengthValue(e.target.textContent)
                        }
                      >
                        8-Month
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col-lg-4 text-right w-80">
                    <DropdownButton title={this.state.roomsValue}>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeRoomsValue(e.target.textContent)
                        }
                      >
                        1
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeRoomsValue(e.target.textContent)
                        }
                      >
                        2
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeRoomsValue(e.target.textContent)
                        }
                      >
                        3
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeRoomsValue(e.target.textContent)
                        }
                      >
                        4
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={e =>
                          this.changeRoomsValue(e.target.textContent)
                        }
                      >
                        5+
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-step-footer text-center">
              <button type="submit" className="create-step-btn">
                Continue
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-1">
          <div className="create-step-close text-center">
            <img src={X} onClick={this.props.changeView.bind(this, "main")} />
          </div>
        </div>
      </div>
    );
  }
}
