import React, { Component } from "react";
import "../style/login.css";
import {Modal,Button} from 'react-bootstrap'
import httpService from "../services/httpService"
import CreateArtistForm from './createArtistForm'
import PopupModal from "./popupModal";
export default class CreateProfileArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow:false,
      unsuccessful:""
    };
  }
 
  
  createArtist = async (username, password, name, lastname, email, city, timeslotLength, price) => {
    if( username==""|| password==""|| name==""|| lastname==""|| email==""|| city==""|| timeslotLength==0|| price==0)
    {
      this.setState({modalShow:true})
      return;
    }
    const response = await httpService.createArtist(this.getData(username, password, name, lastname, email, city, timeslotLength, price));
    console.log(response);
    if (response == "error")
    {
      this.setState({
              unsuccessful: "error",
            });
    }
    else if (response == "false")
    {
      this.setState({
          unsuccessful: "Username nije slobodan",
         });
    }
    else
    {//TODO: add success feedback
     this.props.history.push({
          pathname: `/`,
       });
     }  
}
 getData = (username, password, name, lastname, email, city, timeslotLength, price) =>
  {
    let cityArr = [];
    cityArr.push(city);
    const data = {
      username: username,
      password: password,
      name: name,
      lastname: lastname,
      email: email,
      cities: cityArr,
      timeslot: timeslotLength,
      price: price
    };
    return data;
  }
  closeModal=()=>{this.setState({modalShow:false})};
  

  render() {
    return (
      <div className="celaStrana">
        <div className="iznadIIspod"></div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
       <CreateArtistForm createArtist={this.createArtist} unsuccessful={this.state.unsuccessful}/>
          <div className="iznadIIspod1"></div>
        </div>
        <div className="iznadIIspod"></div>
        <PopupModal modalShow={this.state.modalShow} closeModal={this.closeModal}/>
      </div>
    );
  }
}
