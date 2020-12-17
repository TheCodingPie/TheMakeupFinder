import React, { Component } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from 'react-bootstrap';
import ReturnDescription from "./returnDescription";
import httpService from "../services/httpService"
import Comments from "./comments";
import Images from "./images";

export default class ArtistProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myData: this.props.location.state.person,
      description: "",
      images: [],
      comments: [],
    };
  }
  getArtistInfo = async () => {
    let artistInfo = await httpService.getArtist(this.state.myData.username);
    this.setState({ myData: artistInfo });
  };


  componentDidMount = async () => {
    await this.setState({ images: await httpService.getImagesForArtist(this.state.myData.username) })
    await this.getArtistInfo();
    this.getComments();
  }
  getComments = async () => {
    let comments = await httpService.getComments(this.state.myData.username);
    this.setState({ comments })
  };


  goToAddComment = () => {
    if (this.props.location.state.clientUsername === undefined) return;
    this.props.history.push({
      pathname: `/addComment`,
      state: { artistUsername: this.state.myData.username, clientUsername: this.props.location.state.clientUsername }
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: 'whitesmoke', flex: 1, width: '100%' }}>
        <ReturnDescription myData={this.state.myData} />
        { this.state.images.length > 0 && <Images images={this.state.images} />}
        {(this.props.location.state.clientUsername === undefined) ? null : <div style={{ display: 'flex', justifyContent: 'center' }}> <Button className="btn btn-primary " onClick={this.goToAddComment}>Dodaj komentar</Button></div>}
        <Comments comments={this.state.comments} />
      </div>
    );
  }
}
