import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtistNavbar from './artistNavbar'
import Scheduler from './Scheduler'
export default class ArtistHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: this.props.location.state.person,
    };
  }
  goToFreeDates = () => {
    this.props.history.push({
      pathname: `/freeDate`,
      state: { person: this.state.myData }
    });

  };
  goToAddDescription = () => {
    this.props.history.push({
      pathname: `/artistDescription`,
      state: { person: this.state.myData }
    });
  };

  goToMyProfile = () => {

    this.props.history.push({
      pathname: `/artistProfile`,
      state: { person: this.state.myData, usernameForRecomending: this.state.myData.username }
    });

  };
  goToAddImage = () => {

    this.props.history.push({
      pathname: `/addImagePage`,
      state: { person: this.state.myData }
    });

  }; render() {

    return (
      <div style={{ display: 'flex', flexGrow: 1, flexBasis: 1, flexDirection: 'column', width: '100%', alignItems: 'center', }}>
        <ArtistNavbar goToAddImage={this.goToAddImage} goToMyProfile={this.goToMyProfile} goToAddDescription={this.goToAddDescription} goToFreeDates={this.goToFreeDates} />
        <div
          style={{
            height: "80%",
            flexDirection: 'column',
            width: '80%'
          }}>
          <div style={{ height: "5%" }}></div>
          <Scheduler artist={this.state.myData} />
        </div>
      </div>

    );
  }
}

