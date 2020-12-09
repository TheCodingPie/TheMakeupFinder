import React, { Component } from "react";
import "../style/login.css";
export default class CreateProfileArtist extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        login: "nije",
        name: "",
        lastname: "",
        email: "",
        city: "",
        timeslotLength: 0,
        price: 0,
      };
    }
    handleChangeUsername = event => {
      this.setState({ username: event.target.value,unsuccessful:"" });
    };
    handleChangeCity = event => {
      this.setState({ city: event.target.value });
    };
    handleChangePassword = event => {
      this.setState({ password: event.target.value });
    };
    handleChangeName = event => {
      this.setState({ name: event.target.value });
    };
    handleChangeLastname = event => {
      this.setState({ lastname: event.target.value });
    };
    handleChangeEmail = event => {
      this.setState({ email: event.target.value });
    };
    handleChangeTimeslot = event => {
      this.setState({ timeslotLength: event.target.value });
    };
    handleChangePrice = event => {
      this.setState({ price: event.target.value });
    };
    render() {
        return( <div className="login">
    <h3 style={{ alignSelf: "center" }}>Kreiranje profila</h3>

    <div className="form-group">
      <label>Korisnicko ime</label>
      <input
        type="text"
        placeholder="Unesite korisnicko ime"
        onChange={this.handleChangeUsername}
      />
    </div>

    <div className="form-group">
      <label>Sifra</label>
      <input
        type="password"
        placeholder="Unesite sifru"
        onChange={this.handleChangePassword}
      />
    </div>

    <div className="form-group">
      <label>Ime</label>
      <input
        type="text"
        placeholder="Unesite vase ime"
        onChange={this.handleChangeName}
      />
    </div>

    <div className="form-group">
      <label>Prezime</label>
      <input
        type="text"
        placeholder="Unesite vase prezime"
        onChange={this.handleChangeLastname}
      />
    </div>
    <div className="form-group">
      <label>E mail</label>
      <input
        type="email"
        placeholder="Unesite vas email"
        onChange={this.handleChangeEmail}
      />
    </div>

    <div className="form-group">
      <label>Grad</label>
      <input
        type="text"
        placeholder="Unesite grad"
        onChange={this.handleChangeCity}
      />
    </div>

    <div className="form-group">
      <label>Cena sminkanja</label>
      <input
        type="text"
        placeholder="Unesite cenu sminkanja"
        onChange={this.handleChangePrice}
      />
    </div>

    <div className="form-group">
      <label>Trajanje termina sminkanja u minutima</label>
      <input
        type="text"
        placeholder="Unesite trajanje termina u minutima"
        onChange={this.handleChangeTimeslot}
      />
    </div>

    <button
      type="submit"
      className="btn btn-primary btn-block"
      onClick={()=>this.props.createArtist(this.state.username, this.state.password, this.state.name, this.state.lastname, this.state.email, this.state.city, this.state.timeslotLength, this.state.price )}
    >
      Kreiraj profil
    </button>
    <label style={{color:'red',alignSelf: "center"}}>{this.props.unsuccessful}</label>
  </div>)
    }
}