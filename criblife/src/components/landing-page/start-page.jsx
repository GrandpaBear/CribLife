import React from "react";
import "./start-page.scss";
import { Login, Register } from "./login/login-index.jsx";
import AnimationLogo from "../../images/landing_page.gif";
import Logo from "../../images/logoIcon.png";

const wordList = ["sublet.", "lease.", "live."];

export class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: false,
      isLoginActive: false,
      textDisplayed: "",
      index: 0,
      pause: 8,
      addText: true,
      headlineCSS: "start-page-headline-line"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.changeStartState = this.changeStartState.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.state.addText
          ? this.handleAdditionTextChange()
          : this.handleSubtractionTextChange(),
      150
    );
  }

  changeStartState() {
    this.setState(state => ({
      isLogginActive: true,
      isLoginActive: true
    }));
  }

  changeState() {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  handleClick() {
    if (!this.state.isLoginActive) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
      this.setState(prevState => ({
        isLoginActive: !prevState.isLoginActive
      }));
    }
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  handleAdditionTextChange() {
    let change = "";
    if (this.state.textDisplayed.length < wordList[this.state.index].length) {
      change = wordList[this.state.index].substring(
        this.state.textDisplayed.length,
        this.state.textDisplayed.length + 1
      );
      this.setState(state => ({
        textDisplayed: this.state.textDisplayed + change
      }));
    } else if (this.state.pause == 0) {
      this.setState(state => ({
        addText: false,
        pause: 3
      }));
    } else {
      this.setState(state => ({
        pause: this.state.pause - 1
      }));
      if (this.state.pause % 4 == 0) {
        this.setState(state => ({
          headlineCSS: "start-page-headline-line"
        }));
      } else if (this.state.pause % 2 == 0) {
        this.setState(state => ({
          headlineCSS: "start-page-headline"
        }));
      }
    }
  }

  handleSubtractionTextChange() {
    let change = "";
    if (this.state.textDisplayed.length > 0) {
      change = wordList[this.state.index].substring(
        0,
        this.state.textDisplayed.length - 1
      );
      this.setState(state => ({
        textDisplayed: change
      }));
    } else if (this.state.pause == 0) {
      if (this.state.index == 2) {
        this.setState(state => ({
          textDisplayed: "",
          index: 0,
          addText: true,
          pause: 8
        }));
      } else {
        this.setState(state => ({
          textDisplayed: "",
          index: this.state.index + 1,
          addText: true,
          pause: 8
        }));
      }
    } else {
      this.setState(state => ({
        pause: this.state.pause - 1
      }));
      if (this.state.pause % 4 == 0) {
        this.setState(state => ({
          headlineCSS: "start-page-headline-line"
        }));
      } else if (this.state.pause % 2 == 0) {
        this.setState(state => ({
          headlineCSS: "start-page-headline"
        }));
      }
    }
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div>
        <div className="start-page-landing">
          <div className="start-page-left">
            <label className="start-page-title">CribLife</label>
            <img className="start-page-logo" src={Logo} />
            <div className="start-page-subtitle">
              <label className="start-page-headline">
                CribLife is a platform for student housing.
              </label>
              <br></br>
              <label className={this.state.headlineCSS}>
                A smarter way to {this.state.textDisplayed}
              </label>
            </div>
            <button
              type="button"
              className="start-page-start"
              onClick={this.changeStartState}
            >
              Start
            </button>
          </div>
          <img src={AnimationLogo} className="start-page-animation" />
        </div>
        {this.state.isLoginActive && (
          <div
            className="start-page-underlay"
            ref={node => {
              this.node = node;
            }}
            onClick={this.handleClick}
          ></div>
        )}
        {this.state.isLoginActive && (
          <div className="start-page-login">
            <div className="start-page-container">
              {isLogginActive && <Login login={this.props.login} />}
              {!isLogginActive && <Register />}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="start-page-right-side right"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="start-page-inner-container">
        <div className="start-page-text">{props.current}</div>
      </div>
    </div>
  );
};
