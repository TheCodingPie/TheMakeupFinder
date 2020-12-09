import React, { Component } from "react";
import "../style/login.css";
export default class CreateProfileForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
        borderColor: "lightgray",
      };
    }
    handleChangeUsername = (event) => {
      this.setState({
        username: event.target.value,
        borderColor: "lightgrey",
        successful: "",
      });
    }
    
    handleChangePassword = (event) => {
      this.setState({ password: event.target.value });
    };
    
    handleChangeName = (event) => {
      this.setState({ name: event.target.value });
    };
    handleChangeLastname = (event) => {
      this.setState({ lastname: event.target.value });
    };
    handleChangeEmail = (event) => {
      this.setState({ email: event.target.value });
    };
         
 render() {
    return( 
    <div className="login">
        <h3
          style={{
            alignSelf: "center",
          }} >
          Kreiranje profila
        </h3>
        <div className="form-group">
            <label>Korisnicko ime</label>
            <input type="text" placeholder="Unesite korisnicko ime" onChange={this.handleChangeUsername}
              style={{
                borderColor: this.state.borderColor,
              }} />
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
          <input type="text" placeholder="Unesite vase ime" onChange={this.handleChangeName}/>
        </div>
        <div className="form-group">
          <label>Prezime</label>
          <input type="text" placeholder="Unesite vase prezime" onChange={this.handleChangeLastname}
          />
        </div>
        <div className="form-group">
          <label>E mail</label>
          <input type="email" placeholder="Unesite vas email" onChange={this.handleChangeEmail}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block"
            onClick={()=>this.props.createClient( this.state.username,this.state.password ,this.state.name ,this.state.lastname ,this.state.email )} >
            Kreiraj profil
        </button>
      <label
        style={{
          alignSelf: "center",
          color: "red",
        }} >
        {this.props.successful}
      </label>
  </div>)
  }

    
}