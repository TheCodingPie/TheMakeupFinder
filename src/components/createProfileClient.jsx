import React, { Component } from "react";
import "../style/login.css";
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
    if (username == "" || password == "" || name == "" || lastname == "" || email == "" )
    {
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
