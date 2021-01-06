import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtistNavbar from './artistNavbar'
import Scheduler from './Scheduler'
import httpService from "../services/httpService"
import FreeDateModal from './freeDateModal'
export default class ArtistHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: this.props.location.state.person,
      showFreeDateModal: false,
      appointments: []
    };
  }

  componentDidMount = () => this.getAppointments()

  getAppointments = async () => {
    let dates = await httpService.getAppointments(this.state.myData.username);
    let myEvents = [];
    let year, month, day, hour, minute, free, timeInMinutes, endTimeInMinutes, endHour, endMinute;
    Object.keys(dates).forEach(key => {
      if (key == 'dates')
        return;
      year = parseInt(key.slice(1, 5));
      (key[7] == '_') ? month = parseInt(key.slice(6, 7)) : month = parseInt(key.slice(6, 8));
      (key[key.length - 2] == '_') ? day = parseInt(key.slice(key.length - 1, key.length)) : day = parseInt(key.slice(key.length - 2, key.length));

      Object.keys(dates[key]).forEach(key1 => {

        hour = parseInt(key1.slice(0, 2));
        minute = parseInt(key1.slice(3, 5));
        (dates[key][key1] == 'false') ? free = 'slobodan termin' : free = 'zakazano sminkanje';

        timeInMinutes = hour * 60 + minute;
        endTimeInMinutes = timeInMinutes + this.state.myData.timeslot;
        endHour = Math.floor(endTimeInMinutes / 60);
        endMinute = endTimeInMinutes % 60;

        myEvents.push({
          title: free,
          start: new Date(year, month - 1, day, hour, minute, 0),
          end: new Date(year, month - 1, day, endHour, endMinute, 0),
          isFree: (free == 'slobodan termin') ? true : false
        })

      });

    });
    this.setState({ appointments: myEvents });

  };
  goToFreeDates = () => {
    this.setState({ showFreeDateModal: true })

  };
  closeFreeDateModal = () => {
    this.getAppointments();
    this.setState({ showFreeDateModal: false })
  }

  goToMyProfile = () => {
    this.props.history.push({
      pathname: `/artistProfile`,
      state: { person: this.state.myData }
    });

  };
  goToAddImage = () => {
    this.props.history.push({
      pathname: `/addImagePage`,
      state: { person: this.state.myData }
    });
  };
  logout = async () => {
    let response = await httpService.logout();
    if (response) {
      this.props.history.replace({ pathname: `/` });
    }
  }
  render() {
    return (
      <div style={{ display: 'flex', flexGrow: 1, flexBasis: 1, flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ece9f0' }}>
        <ArtistNavbar goToAddImage={this.goToAddImage} goToMyProfile={this.goToMyProfile} goToFreeDates={this.goToFreeDates} logout={this.logout} />
        <div
          style={{
            height: "80%",
            flexDirection: 'column',
            width: '80%'
          }}>
          <div style={{ height: "5%" }}></div>
          <Scheduler appointments={this.state.appointments} artist={this.state.myData} />
          <FreeDateModal showModal={this.state.showFreeDateModal} closeModal={this.closeFreeDateModal} artist={this.state.myData} />
        </div>
      </div>

    );
  }
}

