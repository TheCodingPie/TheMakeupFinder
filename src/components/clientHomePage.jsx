import React from "react";
import "../style/bookingPage.css";
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import httpService from "../services/httpService"
import BookingNavbar from './bookingNavbar'
import BookingForm from './bookingForm'
import AvaliableArtistsModal from './avaliableArtistsModal'

export default class ClientHomePage extends React.Component {
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
        cities: [],
        showModal: false,
        artists: [],
        date: ""
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
      this.setState({ showModal: true, artists: response, date });
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
  closeModal = () => this.setState({ showModal: false, success: false });

  bookDate = async artist => {
    const response = await httpService.bookAppointment(artist.username, this.state.date, artist.timeStarts, this.state.person.username)
    if (response) {
      this.setState({ success: true });
    }
  };
  render() {
    return (
      <div className="celaStrana">
        <BookingNavbar goToArtistProfile={this.goToArtistProfile} goToBookedAppointments={this.goToBookedAppointments} logout={this.logout} />
        <div
          style={{
            display: "flex",
            width: "45%",
            alignItems: "center",
            flex: 1
          }}>
          <BookingForm findArtists={this.findArtists} message={this.state.message} cities={this.state.cities} />

        </div>
        <AvaliableArtistsModal success={this.state.success} showModal={this.state.showModal} closeModal={this.closeModal} artists={this.state.artists} bookDate={this.bookDate} />
      </div>
    );
  }
}


