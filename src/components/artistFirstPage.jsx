import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class ArtistFirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: this.props.location.state.person,
    };
  }
  goToScheduler = () => {

    this.props.history.push({
      pathname: `/scheduler`,
      state: { person: this.state.myData }
    });

  };

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
  goToChangeCity = () => {

    this.props.history.push({
      pathname: `/changeCity`,
      state: { person: this.state.myData }
    });

  };

  goToAddCity = () => {

    this.props.history.push({
      pathname: `/addCity`,
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
      <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 1 }}>
        <div className="w-100" style={{



        }} >
          <Navbar bg="light" expand="lg">
            <Navbar.Brand >MakeUpFinder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                <button type="submit" className="btn " onClick={this.goToScheduler}>Moj raspored</button>
                <button type="submit" className="btn " onClick={this.goToFreeDates}>Oslobodi termine</button>
                <button type="submit" className="btn " onClick={this.goToMyProfile}>Pogledaj svoj profil</button>
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <button type="submit" className="btn " onClick={this.goToAddImage}>Dodaj sliku</button>
                  <button type="submit" className="btn " onClick={this.goToAddDescription}>Dodaj opis</button>
                  <button type="submit" className="btn " onClick={this.goToAddCity}>Dodaj grad</button>
                  <button type="submit" className="btn " onClick={this.goToChangeCity}>Promeni grad</button>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Odjavi se</NavDropdown.Item>
                </NavDropdown>
              </Nav>

            </Navbar.Collapse>
          </Navbar>


        </div>
      </div>

    );
  }
}

