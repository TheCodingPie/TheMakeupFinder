import React, { Component } from "react";
import "../style/bookingPage.css";
import "../style/login.css";
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value, color: "lightgrey" });
  }
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value, color: "lightgrey" });
  }
  render() {
    return (
      <div className="login">
        <div className="Naslov">
          <h1>Prijava</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ flex: 0.1 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

            <label>Korisnicko ime</label>
            <input type="text" placeholder="Unesite korisnicko ime" value={this.state.username} onChange={this.handleChangeUsername}
              style={{
                borderBottomColor: this.props.color,
                marginBottom: '20px'
              }} />

            <div style={{ flex: 0.5 }}></div>

            <label>Sifra</label>
            <input type="password" placeholder="Unesite sifru" value={this.state.password} onChange={this.handleChangePassword}
              style={{
                borderBottomColor: this.props.color,
              }} />


          </div>
          <div style={{ flex: 0.1 }}></div>
        </div>
        <div style={{ flex: 0.3 }}></div>
        <div className="butto">
          <div className="left"></div>
          <button className="loginButton" onClick={() => this.props.login(this.state.username, this.state.password)} >
            <h5>Prijavite se</h5>
          </button>

          <div className="left" ></div>
        </div>
        <div style={{ flex: 0.3 }}></div>

        <div className="zaDugmice">
          <div style={{ flex: 0.5 }}></div>
          <button className="createProfileButton " onClick={this.props.createProfileArtist}>
            Napravi profil sminkera
            </button>
          <div style={{ flex: 0.5 }}></div>
          <button className="createProfileButton " onClick={this.props.createProfileClient}>
            Napravi profil korisnika
            </button>
          <div style={{ flex: 0.5 }}></div>
        </div>
        <div style={{ flex: 0.3 }}></div>
      </div>)
  }

}