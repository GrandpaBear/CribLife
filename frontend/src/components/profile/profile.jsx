import React from "react";
import axios from "axios";
import "./profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadIcon from "../../images/upload.png";
import SchoolPic from "../../images/school.png";
import LocationPic from "../../images/location.png";
import UsernamePic from "../../images/username.png";
import CurrentCribImage from "../../images/currentcribexample.png";
import MyListingImage from "../../images/lester1.png";
import CurrentCribIcon from "../../images/currentcribicon.png";
import MyListingIcon from "../../images/mylistingicon.png";
import { Nav } from "../nav/nav-index.jsx";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: "",
      editMode: false,
      username: "",
      fullname: " ",
      location: "",
      school: "",
      about: "",
      userSessionKey: ""
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    const sessionId = localStorage.getItem("sessionId");
    const username = localStorage.getItem("username");
    const userSessionKey = {
      sessionId: sessionId,
      username: username
    };
    this.setState({
      userSessionKey: userSessionKey
    });
    axios.post(`http://localhost:4000/profile/`, userSessionKey).then(res => {
      if (res.status == 200) {
        this.setState({
          username: res.data[0].username,
          fullname: res.data[0].fullname,
          location: res.data[0].location,
          school: res.data[0].school,
          about: res.data[0].about
        });
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(
          res.data[0].profilePicture.data.data
        );
        this.setState({
          profilePicture: base64Flag + imageStr
        });
      } else {
        this.props.changeView("");
      }
    });
  }

  toggleEditMode() {
    console.log(this.state.editMode);
    this.setState(prevState => {
      return { editMode: !prevState.editMode };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      location: event.target.location.value,
      school: event.target.school.value,
      about: event.target.about.value
    });
    this.toggleEditMode();
  }

  uploadImage(event) {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("sessionId", this.state.userSessionKey.sessionId);
    data.append("username", this.state.userSessionKey.username);

    axios.post("http://localhost:4000/profile/upload", data).then(res => {
      // then print response status
      console.log(res.statusText);
    });
    try {
      this.setState({
        profilePicture: URL.createObjectURL(event.target.files[0])
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  render() {
    return (
      <div>
        <Nav changeView={this.props.changeView} />
        <div className="profile">
          {!this.state.editMode && (
            <form className="row">
              <div className="col-lg-5">
                <div className="profile-user">
                  {/* <img
                  className="profile-picture"
                  src={this.state.profilePicture}
                  onerror="this.style.display='none'"
                /> */}
                  <object
                    className="profile-picture"
                    data={this.state.profilePicture}
                    type="image/png"
                  ></object>
                  <button
                    type="submit"
                    className="profile-edit"
                    onClick={this.toggleEditMode}
                  >
                    Edit Profile
                  </button>
                  <div className="profile-userdetail">
                    <img src={UsernamePic} />
                    <div className="profile-userdetail-detail">
                      {this.state.username}
                    </div>
                  </div>
                  <div className="profile-userdetail">
                    <img src={LocationPic} />
                    <div className="profile-userdetail-detail">
                      {this.state.location}
                    </div>
                  </div>
                  <div className="profile-userdetail">
                    <img src={SchoolPic} />
                    <div className="profile-userdetail-detail">
                      {this.state.school}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="profile-content">
                  <div className="profile-name">{this.state.fullname}</div>
                  <div className="profile-about">
                    <div className="profile-title">ABOUT</div>
                    <div className="profile-about-description">
                      {this.state.about}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="profile-option">
                        <div className="profile-title">CURRENT CRIB</div>
                        <div className="profile-option-button">
                          <div className="profile-crib-image">
                            <img src={CurrentCribImage} />
                          </div>
                          <div className="profile-circle">
                            <img src={CurrentCribIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-option">
                        <div className="profile-title">YOUR LISTING</div>
                        <div className="profile-option-button">
                          <div className="profile-crib-image">
                            <img src={MyListingImage} />
                          </div>
                          <div className="profile-circle">
                            <img src={MyListingIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
          {this.state.editMode && (
            <form onSubmit={this.handleSubmit} className="row" id="profile">
              <div className="col-lg-5">
                <div className="profile-user">
                  <div className="profile-picture-drop-looks">
                    <img src={this.state.profilePicture} />
                    <input
                      type="file"
                      id="upload-photo"
                      className="profile-picture-drop"
                      onChange={this.uploadImage}
                    />
                    <label for="upload-photo" className="profile-picture-drop">
                      <img src={UploadIcon} />
                    </label>
                  </div>
                  <button className="profile-save" form="profile">
                    Save
                  </button>
                  <div className="profile-userdetail">
                    <img src={UsernamePic} />
                    <div className="profile-userdetail-detail">
                      {this.state.username}
                    </div>
                  </div>
                  <div className="profile-userdetail">
                    <img src={LocationPic} />
                    <input
                      type="text"
                      name="location"
                      className="profile-userdetail-detail-edit"
                      defaultValue={this.state.location}
                    />
                  </div>
                  <div className="profile-userdetail">
                    <img src={SchoolPic} />
                    <input
                      type="text"
                      name="school"
                      className="profile-userdetail-detail-edit"
                      defaultValue={this.state.school}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="profile-content">
                  <div className="profile-name">Jianying Chiang</div>
                  <div className="profile-about">
                    <div className="profile-title">ABOUT</div>
                    <textarea
                      name="about"
                      form="profile"
                      className="profile-about-description-edit"
                      spellcheck="false"
                    >
                      {this.state.about}
                    </textarea>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="profile-option">
                        <div className="profile-title">CURRENT CRIB</div>
                        <div className="profile-option-button">
                          <div className="profile-crib-image">
                            <img src={CurrentCribImage} />
                          </div>
                          <div className="profile-circle">
                            <img src={CurrentCribIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-option">
                        <div className="profile-title">YOUR LISTING</div>
                        <div className="profile-option-button">
                          <div className="profile-crib-image">
                            <img src={MyListingImage} />
                          </div>
                          <div className="profile-circle">
                            <img src={MyListingIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}
