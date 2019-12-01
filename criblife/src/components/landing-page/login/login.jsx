import React from "react";
import axios from "axios";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username_description: "",
      password_description: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsernameDescription = this.onChangeUsernameDescription.bind(
      this
    );
    this.onChangePasswordDescription = this.onChangePasswordDescription.bind(
      this
    );
  }

  onChangeUsernameDescription(e) {
    this.setState({
      username_description: e.target.value
    });
  }

  onChangePasswordDescription(e) {
    this.setState({
      password_description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const userLoginInfo = {
      username: this.state.username_description,
      password: this.state.password_description
    };

    axios.post("http://localhost:4000/user/login", userLoginInfo).then(res => {
      console.log("UserSessionKey Received: " + res.data);
      this.props.login("main", res);
    });

    this.setState({
      username_description: "",
      password_description: ""
    });
  }

  render() {
    return (
      <div className="login-base-container" ref={this.props.containerRef}>
        <form onSubmit={this.onSubmit}>
          <div className="login-header">Login</div>
          <div className="login-content">
            <div className="login-form">
              <div className="login-form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username_description}
                  onChange={this.onChangeUsernameDescription}
                />
              </div>
              <div className="login-form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password_description}
                  onChange={this.onChangePasswordDescription}
                />
              </div>
            </div>
          </div>
          <div className="login-footer">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
