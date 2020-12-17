import React, { Component } from "react";
import "../style/bookingPage.css";
import httpService from "../services/httpService"
import ListGroup from "react-bootstrap/ListGroup";
import { Modal, Button } from 'react-bootstrap'
export default class UsersBookedAppointmentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    };
  }
  componentDidMount = async () => {
    let bookings = await httpService.getBookings(this.props.clientUsername)
    this.setState({ bookings });
  };

  printBookings = () => {
    let elements = [];
    this.state.bookings.map(item =>
      elements.push(
        <ListGroup.Item className="mb-2 mt-1">
          {" "}
          <div >
            {" "}
            <div>
              <text>Sminker: {item.artist}</text>{" "}
            </div>{" "}
            <div> Cena: {item.price}</div>
            <div>
              Datum: {item.date.slice(1, item.date.length).replace(/_/g, "/")}{" "}
            </div>{" "}
            <div> Vreme {item.time}</div>{" "}
          </div>
        </ListGroup.Item>
      )
    );
    return elements;
  };

  render() {
    return (
      <Modal show={this.props.showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.onHide} >
        <Modal.Body className="justify-content-center col ">
          <h3>Ovo su svi vasi zakazani termini</h3>
          <ListGroup >{this.printBookings()}</ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Zatvori</Button>
        </Modal.Footer>
      </Modal>)
  }
}
