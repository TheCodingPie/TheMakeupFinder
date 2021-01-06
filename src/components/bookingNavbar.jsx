import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from "./searchBar";
export default class BookingNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          width: "60%",
        }}>
        <Navbar expand="lg" style={{
          borderRadius: '10px'
        }} >
          <Navbar.Brand>MakeUpFinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <SearchBar handleChoise={this.props.goToArtistProfile}></SearchBar>
              <button type="submit" className="btn" onClick={this.props.goToBookedAppointments} >
                Zakazani termini
            </button> </Nav>
            <button type="submit" className="btn" onClick={this.props.logout}>
              Odjavi se
            </button>
          </Navbar.Collapse>
        </Navbar>
      </div >)
  }
}
