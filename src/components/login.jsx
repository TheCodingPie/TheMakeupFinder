import React, { Component } from "react";
import "../style/bookingPage.css";
import httpService from "../services/httpService"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      login: "nije",
      color: "lightgrey"
    };
  }
  handleChangeId=(event) => {
    this.setState({ id: event.target.value, color: "lightgrey" });
  }

  handleChangePassword= (event) => {
    this.setState({ password: event.target.value, color: "lightgrey" });
  }
  createProfileArtist = () => {
    this.props.history.push({
      pathname: `/createArtist`
    });
  };
  createProfileClient = () => {
    this.props.history.push({
      pathname: `/createClient`
    });
  };
   login = async () => {
      if(this.state.id=="" || this.state.password=="")
      {
        this.setState({ color: "red" });
        return;//TODO: add 404 message
      }
      let profileData= await httpService.login(this.state.id,this.state.password)                   
      console.log(profileData);
      if(!profileData)
      {
        this.setState({ color: "red" });
      }
      else 
      {
          if (profileData.type == "Client") {
            this.props.history.push({
              pathname: `/booking`,
              state: { person: profileData }
            });
          } 
          else if (profileData.type == "Artist") {
            this.props.history.push({
              pathname: `/artistFirstPage`,
              state: { person: profileData }
            });
          }
      }
  }
getLoginForm=()=>{
  return(
   <div className="login">
              <div className="iznadIIspod"></div>
              <div className="Naslov">
                <h3>Sign In</h3>
              </div>

              <div style={{
                   display:'flex',flexDirection:'column'
                  }}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Unesite korisnicko ime"
                  value={this.state.id}
                  onChange={this.handleChangeId}
                  style={{
                    borderBottomColor: this.state.color
                  }}
                />
              </div>
              <div style={{flex:0.5}}></div>
              <div style={{
                   display:'flex',flexDirection:'column'
                  }}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Unesite sifru"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                  style={{
                    borderBottomColor: this.state.color
                  }}
                />
              </div>
              <div style={{flex:0.5}}></div>
              <div className="butto">
                            <div className="left"></div>
                            <button
                              className="btn btn-block"
                              style={{
                                backgroundColor: "#ff0178",
                                color: "blue",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                flex: 2
                              }}
                              onClick={this.login}
                            >
                              <h5>Prijavite se</h5>
                            </button>

                            <div className="left"></div>
                          </div>
              <div style={{flex:0.5}}></div>
              <div className="zaDugmice">
              <div style={{flex:0.5}}></div>
                <button
                  className="btn"
                  onClick={this.createProfileArtist}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flex: 1
                  }}
                >
                  Napravi profil sminkera
                </button>
                  <div style={{flex:0.5}}></div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flex: 1
                  }}
                  onClick={this.createProfileClient}
                >
                  Napravi profil korisnika
                </button>
                <div style={{flex:0.5}}></div>
              </div>
              <div style={{flex:0.5}}></div>
            </div>)
}
  render() {
    //TODO: add session check before displaying login page 
    return (
      <div className="celaStrana">
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
           {this.getLoginForm()}
          <div className="iznadIIspod1"></div>
        </div>
      </div>
    );
  }
}
