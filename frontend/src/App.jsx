import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LandingPage } from "./components/landing-page/landing-page-index";
import { Profile } from "./components/profile/profile-index";
import { Main } from "./components/main/main-index";
import { Listing } from "./components/listing/listingpage-index";
import { Group } from "./components/group/group-index";
import { CreateStep } from "./components/create-steps/create-step-index";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "LandingPage", //default LandingPage
      login: true,

      //user info
      userSessionKey: null
    };
    this.changeView = this.changeView.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const username = localStorage.getItem("username");
      const view = localStorage.getItem("view");
      const userSessionKey = {
        sessionId: sessionId,
        username: username
      };
      if (view == null) {
        this.setState({
          view: "LandingPage"
        });
      } else {
        this.setState({
          userSessionKey: userSessionKey,
          view: view
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  changeView(view) {
    this.setState({
      view: view
    });
    if (view == "LandingPage") {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("view");
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("view", view);
    }
  }

  login(view, res) {
    this.setState({
      userSessionKey: res.data
    });
    localStorage.setItem("sessionId", res.data.sessionId);
    localStorage.setItem("username", res.data.username);
    this.changeView(view);
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Nav changeView={this.changeView} /> */}
          {this.state.view == "LandingPage" && (
            <div>
              <LandingPage login={this.login} />
            </div>
          )}
          {this.state.view == "profile" && (
            <div>
              <Profile changeView={this.changeView} />
            </div>
          )}
          {this.state.view == "main" && (
            <div>
              <Main changeView={this.changeView} />
            </div>
          )}
          {this.state.view == "listing" && (
            <div>
              <Listing changeView={this.changeView} />
            </div>
          )}
          {this.state.view == "group" && (
            <div>
              <Group changeView={this.changeView} />
            </div>
          )}
          {this.state.view == "CreateStep" && (
            <div>
              <CreateStep changeView={this.changeView} />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
