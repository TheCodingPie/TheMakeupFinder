import React from "react";
import "../style/bookingPage.css";
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import httpService from "../services/httpService"
import BookingNavbar from './bookingNavbar'
import BookingForm from './bookingForm'

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.location.state == undefined) {
      this.props.history.replace({ pathname: "/" })
    }
    else {
      this.state = {
        person: this.props.location.state.person,
        parsedDate: "",
        message: "",
      };
    }
  }

  goToArtistProfile = async selected => {
    if (selected.length === 0) return;
    let artistInfo = await httpService.getArtist(selected[0]);
    this.props.history.push({
      pathname: `/artistProfile`,
      state: { person: artistInfo, clientUsername: this.state.person.username }
    });
  };

  findArtists = async (timeFrom, timeTo, date, priceFrom, priceTo, city) => {
    let response = await httpService.findArtists(timeFrom, timeTo, city, priceFrom, priceTo, date)
    if (typeof response === "object" || response === []) {
      this.props.history.push({
        pathname: "/showAvaliableArtists",
        state: {
          artists: response,
          client: this.state.person,
          date: this.state.parsedDate
        }
      });
    } else {
      this.setState({ message: response });
    }
  };
  goToBookedAppointments = () => {
    this.props.history.push({
      pathname: `/bookedAppointments`,
      state: { person: this.state.person, client: this.state.person }
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
      <div className="celaStrana">
        <BookingNavbar goToArtistProfile={this.goToArtistProfile} goToBookedAppointments={this.goToBookedAppointments} logout={this.logout} />
        <div
          style={{
            display: "flex",
            width: "45%",
            alignItems: "center",
            flex: 30
          }} >
          <BookingForm findArtists={this.findArtists} message={this.state.message} />
        </div>
      </div>
    );
  }
}


