import React, { Component } from "react";
import "../style/login.css";
import {Modal,Button} from 'react-bootstrap'
import httpService from "../services/httpService"
export default class CreateProfileClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      login: "nije",
      name: "",
      lastname: "",
      email: "",
      successful: "",
      borderColor: "lightgray",
      modalShow:false,
    };
  }
  handleChangeUsername=(event) =>{
    this.setState({
      username: event.target.value,
      borderColor: "lightgrey",
      successful: ""
    });
  }

  handleChangePassword = (event)=> {
    this.setState({ password: event.target.value });
  }

  handleChangeName = (event)=> {
    this.setState({ name: event.target.value });
  }
  handleChangeLastname = (event)=> {
    this.setState({ lastname: event.target.value });
  }
  handleChangeEmail = (event)=> {
    this.setState({ email: event.target.value });
  }

  createClient = async () => {
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.name == "" ||
      this.state.lastname == "" ||
      this.state.email == ""
    ) {
     this.setState({modalShow:true});
      return;
    }
    let response= await httpService.createClient(this.state.username, this.state.password, this.state.name, this.state.lastname, this.state.email)        
    if (response == "error")
    {
            this.setState({
              successful: "error",
              borderColor: "red"
            });
    }
    else if (response == "false")
    {
            this.setState({
              successful: "Username nije slobodan",
              borderColor: "red"
            });
    }
    else
    {//TODO: add success feedback
     this.props.history.push({
          pathname: `/`,
       });
     }  
  }
  getModal = ()=> {
   return( <Modal
    show={this.state.modalShow}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <div className="justify-content-center row">
      <label>Unesite sve podatke</label>
    </div>
    <Modal.Body className="justify-content-center col ">
      <div className="justify-content-center row"></div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={()=>this.setState({modalShow:false})}>U redu</Button>
    </Modal.Footer>
  </Modal>)
  }
  getForm=()=>{

    return( <div className="login">
    <h3
      style={{
        alignSelf: "center"
      }}
    >
      Kreiranje profila
    </h3>

    <div className="form-group">
      <label>Korisnicko ime</label>
      <input
        type="text"
        placeholder="Unesite korisnicko ime"
        onChange={this.handleChangeUsername}
        style={{
          borderColor: this.state.borderColor
        }}
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

    <button
      type="submit"
      className="btn btn-primary btn-block"
      onClick={this.createClient}
    >
      Kreiraj profil
    </button>
    <label
      style={{
        alignSelf: "center",
        color: "red"
      }}
    >
      {this.state.successful}
    </label>
  </div>)

  }
  render() {
    return (
      <div className="celaStrana">
        <div className="iznadIIspod"></div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
          {this.getForm()}
          <div className="iznadIIspod1"></div>
        </div>
        <div className="iznadIIspod"></div>
          {this.getModal()}
      </div>
    );
  }
}
