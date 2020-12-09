import React, { Component } from "react";
import "../style/login.css";
import {Modal,Button} from 'react-bootstrap'
import httpService from "../services/httpService"
import CreateProfileForm from './createProfileForm'
import PopupModal from "./popupModal";
export default class CreateProfileClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "nije",
      successful: "",
      borderColor: "lightgray",
      modalShow:false,
    };
  }

  createClient = async (username,password ,name ,lastname ,email) => {
    if (
      username == "" ||
      password == "" ||
      name == "" ||
      lastname == "" ||
      email == ""
    ) {
     this.setState({modalShow:true});
      return;
    }
    let response= await httpService.createClient(username, password, name, lastname, email)        
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
  closeModal=()=>{this.setState({modalShow:false})}
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
 
  render() {
    return (
      <div className="celaStrana">
        <div className="iznadIIspod"></div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
         <CreateProfileForm createClient={this.createClient} successful={this.state.successful}/>
          <div className="iznadIIspod1"></div>
        </div>
        <div className="iznadIIspod"></div>
          <PopupModal modalShow={this.state.modalShow} closeModal={this.closeModal}/>
      </div>
    );
  }
}
