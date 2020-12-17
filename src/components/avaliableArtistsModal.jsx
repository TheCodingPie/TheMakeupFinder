import React, { Component } from "react";
import "../style/bookingPage.css";
import { Modal, Button } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
export default class AvaliableArtistsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: this.props.artists,
      toSort: "price",
      asc: true,
    };
  }
  componentDidMount = () => {
    this.sortArtists();
  };
  sortArtists = async () => {
    let artists = this.state.artists;
    if (this.state.asc == true) {
      artists.sort((a, b) => {
        return a[this.state.toSort] > b[this.state.toSort];
      });
    } else {
      artists.sort((a, b) => {
        return b[this.state.toSort] > a[this.state.toSort];
      });
    }
    this.setState({ artists });
  };


  render() {
    return (
      <Modal show={this.props.showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.onHide} >
        <Modal.Body className="justify-content-center col ">
          <ListGroup>
            {!this.props.success && this.props.artists.map((artist, index) => (
              <ListGroup.Item>
                <h2 >{artist.username}</h2>
                <div style={{ display: "flex", flexDirection: "row", flex: 1, width: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label>Broj ocena: {artist.numofReviews}</label>
                    <label>Ocena: {artist.stars}</label>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label>Vreme pocetka: {artist.timeStarts} h</label>
                    <label>Cena: {artist.price} din</label>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", flex: 1, justifyContent: 'space-between' }}>
                  <Button onClick={() => this.props.viewArtistProfile(artist)}> Videti profil</Button>
                  <div ></div>
                  <Button onClick={() => this.props.bookDate(artist)}> Zakazati </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup >
          {this.props.success && (<label style={{ color: "blue" }}>Uspesno ste zakazali termin </label>)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Zatvori</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}
