import React, { Component } from "react";
import "../style/bookingPage.css";
import httpService from "../services/httpService"
import LoginForm from "./loginForm";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "lightgrey",
      renderPage: false
    };
  }
  login = async (username, password) => {
    if (username == "" || password == "") {
      this.setState({ color: "red" });
    }
    else {
      let profileData = await httpService.login(username, password)
      console.log(profileData);
      if (!profileData) {
        this.setState({ color: "red" });
      }
      else {
        if (profileData.type == "Client") {
          this.props.history.push({
            pathname: `/clientHomePage`,
            state: { person: profileData }
          });
        }
        else if (profileData.type == "Artist") {
          this.props.history.push({
            pathname: `/artistFirstPage`,
            state: { person: profileData }
          });
        }
      }
    }
  }
  componentDidMount = async () => {

    let profileData = await httpService.sessionLogin();
    console.log(profileData)
    if (profileData) {
      if (profileData.type == "Client") {
        this.props.history.push({
          pathname: `/clientHomePage`,
          state: { person: profileData }
        });
      }
      else if (profileData.type == "Artist") {
        this.props.history.push({
          pathname: `/artistFirstPage`,
          state: { person: profileData }
        });
      }
    }
    else {
      this.setState({ renderPage: true });
    }
  }
  createProfileArtist = () => {
    this.props.history.push({
      pathname: `/createArtist`
    });
  };
  createProfileClient = () => {
    this.props.history.push({
      pathname: `/createClient`
    });
  };
  render() {
    if (this.state.renderPage) {
      return (
        <div className="celaStrana">
          <div className="horizontalno">
            <div className="iznadIIspod1"></div>
            <LoginForm login={this.login} color={this.state.color} createProfileClient={this.createProfileClient} createProfileArtist={this.createProfileArtist} />
            <div className="iznadIIspod1" ></div>
          </div>
        </div>
      )
    }
    else {
      return (null)
    }
  }

}

