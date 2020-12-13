import React, { Component } from "react";
import "../style/bookingPage.css";
import { Modal, Button } from 'react-bootstrap'
import httpService from "../services/httpService"
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
  viewProfile = async artist => {
    this.props.history.push({
      pathname: "/artistProfile",
      state: { person: artist, clientUsername: this.state.client.username }
    });
  };

  render() {
    return (
      <Modal show={this.props.showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.onHide} >
        <Modal.Body className="justify-content-center col ">
          {!this.props.success && this.props.artists.map((artist, index) => (
            <div key={index} className="divCeo">
              <div className="izmedju"></div>
              <div className="divArtist">
                <h2 style={{ alignSelf: 'center', color: 'blue' }}>{artist.username}</h2>
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
                <div style={{ display: "flex", flexDirection: "row", flex: 1, width: '100%' }}>
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#ff0178",
                      border: 1,
                      borderColor: "#ff0178",
                      borderStyle: "solid",
                      flex: 1,
                      backgroundColor: 'blue',
                    }}
                    onClick={() => this.viewProfile(artist)}
                  >
                    Videti profil
                  </button>
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "#ff0178",
                      border: 1,
                      borderColor: "#ff0178",
                      borderStyle: "solid",
                      backgroundColor: 'blue',
                      flex: 1
                    }}
                    onClick={() => this.props.bookDate(artist)}
                  >
                    Zakazati
                  </button>
                </div>
              </div>
            </div>
          ))}
          {this.props.success && (<label style={{ color: "blue" }}>Uspesno ste zakazali termin </label>)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Zatvori</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}
