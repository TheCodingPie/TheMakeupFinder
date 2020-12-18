import React, { Component } from "react";
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import httpService from "../services/httpService"
import FreeDateForm from './freeDateForm'
import { Modal, Button } from 'react-bootstrap'

export default class FreeDateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      clientUsername: "korisnik1",
      myData: this.props.artist,
      modalShow: false,
      modalDates: "",
      modalData: ""
    };
  }

  freeDate = async (timeFrom, timeTo, date) => {

    if (timeFrom >= timeTo) {
      this.setState({ modalData: "Uneli ste lose vreme", modalShow: true })
      return;
    }
    let timeFromMinutes =
      parseInt(timeFrom[0] + timeFrom[1]) * 60 +
      parseInt(timeFrom[3] + timeFrom[4]);
    let timeToMinutes =
      parseInt(timeTo[0] + timeTo[1]) * 60 +
      parseInt(timeTo[3] + timeTo[4]);
    let difference = timeToMinutes - timeFromMinutes;
    let mod = difference % this.state.myData.timeslot;
    if (mod !== 0) {
      this.setState({
        errorMessage: "Pomerite radno vreme za " +
          (this.state.myData.timeslot - mod) +
          " minuta unazad ili pomerite radno vreme do za " +
          mod +
          " minuta unazad"
      });
      return;
    }
    let appointments = [];
    let hours, minutes;
    appointments.push(timeFrom);
    for (let i = 1; i < difference / this.state.myData.timeslot; i++) {
      timeFromMinutes += this.state.myData.timeslot;
      hours = Math.floor(timeFromMinutes / 60);
      minutes = timeFromMinutes % 60;
      if (minutes < 10) minutes = "0" + minutes;
      if (hours < 10) hours = "0" + hours;
      appointments.push(hours + ":" + minutes);
    }
    var ter = appointments.join(" ");
    this.setState({ modalDates: ter })
    const response = await httpService.freeDate(this.state.myData.username, date, timeFrom, timeTo, appointments);
    if (response == "Uspesno dodato") {
      this.setState({ modalData: "Uspesno ste dodali termine:", errorMessage: "" })
    }
    else {
      this.setState({ modalData: "Vec ste oslobodili ove termine.", modalDates: "" });
    }
    this.setState({ modalShow: true })
  };


  render() {
    return (
      <Modal show={this.props.showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.onHide} >
        <Modal.Body className="justify-content-center col ">
          <FreeDateForm freeDate={this.freeDate} errorMessage={this.state.errorMessage} />
          <div className="justify-content-center col">
            <div>{this.state.modalData}</div>
            <div>{this.state.modalDates}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


