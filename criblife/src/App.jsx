import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LandingPage } from "./components/landing-page/landing-page-index";
import { Profile } from "./components/profile/profile-index";
import { Main } from "./components/main/main-index";
import { Listing } from "./components/listing/listingpage-index";
import { CreateStepA } from "./components/create-steps/create-step-a-index";
import { CreateStepB } from "./components/create-steps/create-step-b-index";
import { Nav } from "./components/nav/nav-index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "CreateStepA", //default LandingPage
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
          view: "CreateStepA"
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
    localStorage.setItem("view", view);
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
              <Main />
            </div>
          )}
          {this.state.view == "listing" && (
            <div>
              <Listing />
            </div>
          )}
          {this.state.view == "CreateStepA" && (
            <div>
              <CreateStepA />
            </div>
          )}
          {this.state.view == "CreateStepB" && (
            <div>
              <CreateStepB />
            </div>
          )}
          {this.state.view == "createListing" && <div></div>}
        </div>
      </Router>
    );
  }
}

export default App;
