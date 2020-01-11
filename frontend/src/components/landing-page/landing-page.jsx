import React from "react";
import "./landing-page.scss";
import { StartPage } from "./start-page.jsx";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoginActive: true, coolText: "" };
    this.toggleLoginPage = this.toggleLoginPage.bind(this);
  }

  toggleLoginPage() {
    console.log("printing!");
    this.setState({
      isLoginActive: false
    });
  }

  render() {
    if (this.state.isLoginActive) {
      return <StartPage login={this.props.login} />;
    } else {
      return <div></div>;
    }
  }
}
