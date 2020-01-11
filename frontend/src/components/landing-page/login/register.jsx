import React from "react";
import axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname_description: "",
      username_description: "",
      password_description: "",
      email_description: ""
    };
    this.onChangeFullnameDescription = this.onChangeFullnameDescription.bind(
      this
    );
    this.onChangeUsernameDescription = this.onChangeUsernameDescription.bind(
      this
    );
    this.onChangePasswordDescription = this.onChangePasswordDescription.bind(
      this
    );
    this.onChangeEmailDescription = this.onChangeEmailDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFullnameDescription(e) {
    this.setState({
      fullname_description: e.target.value
    });
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

  onChangeEmailDescription(e) {
    this.setState({
      email_description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      fullname: this.state.fullname_description,
      username: this.state.username_description,
      password: this.state.password_description,
      email: this.state.email_description
    };

    axios.post("http://localhost:4000/user/register", newUser).then(res => {
      console.log(res.data);
    });

    this.setState({
      fullname_description: "",
      username_description: "",
      password_description: "",
      email_description: ""
    });
  }

  render() {
    return (
      <div className="login-base-container" ref={this.props.containerRef}>
        <form onSubmit={this.onSubmit}>
          <div className="login-header">Register</div>
          <div className="login-content">
            <div className="login-form">
              <div className="login-form-group">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={this.state.fullname_description}
                  onChange={this.onChangeFullnameDescription}
                />
              </div>
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
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={this.state.password_description}
                  onChange={this.onChangePasswordDescription}
                />
              </div>
              <div className="login-form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email_description}
                  onChange={this.onChangeEmailDescription}
                />
              </div>
            </div>
          </div>
          <div className="login-footer">
            <button type="submit" className="login-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
