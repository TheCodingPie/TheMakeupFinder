import React, { Component } from "react";
import "../style/bookingPage.css";
import httpService from "../services/httpService"
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
export default class BookedAppointmentsForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.location.state.person,
      client: this.props.location.state.client,
      bookings: []
    };
  }
  componentDidMount = () => {
    this.showBookings();
  };
  showBookings = async () => {
    let bookings = await httpService.getBookings(this.state.person.username)
    this.setState({ bookings });
  };

  printBookings = () => {
    let elements = [];
    this.state.bookings.map(item =>
      elements.push(
        <ListGroup.Item style={{ backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="mb-2 mt-1">
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
          <div>
            <Button onClick={() => this.cancelBooking(item)}>
              Otkazi sminkanje
            </Button>{" "}
          </div>
        </ListGroup.Item>
      )
    );
    return elements;
  };

  render() {
    return (
      <div className="celaStrana">
        <h3 style={{ justifySelf: 'flex-start', color: 'white' }}>Ovo su svi vasi zakazani termini</h3>
        <ListGroup style={{ width: '50%', alignContent: 'center', display: 'flex', flexDirection: 'column' }}>{this.printBookings()}</ListGroup>
      </div>
    );
  }
}
