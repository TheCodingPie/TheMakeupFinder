import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from 'react-bootstrap';
import ArtistDescription from "./artistDescription";
import httpService from "../services/httpService"
import Comments from "./comments";
import Images from "./images";
import AddCommentModal from "./addCommentModal";

export default class ArtistProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistData: this.props.location.state.person,
      description: "",
      images: [],
      comments: [],
      showModal: false
    };
  }
  getArtistInfo = async () => {
    let artistInfo = await httpService.getArtist(this.state.artistData.username);
    this.setState({ artistData: artistInfo });
  };


  componentDidMount = async () => {
    await this.setState({ images: await httpService.getImagesForArtist(this.state.artistData.username) })
    await this.getArtistInfo();
    this.getComments();
  }
  getComments = async () => {
    let comments = await httpService.getComments(this.state.artistData.username);
    this.setState({ comments })
  };


  goToAddComment = () => {
    if (this.props.location.state.clientUsername === undefined) return;
    this.setState({ showModal: true })
  };

  closeModal = () => {
    this.setState({ showModal: false })
    this.getComments();
  }

  render() {
    return (
      <div style={{ backgroundColor: 'whitesmoke', flex: 1, width: '100%' }}>
        <ArtistDescription artistData={this.state.artistData} />
        { this.state.images.length > 0 && <Images images={this.state.images} />}
        {(this.props.location.state.clientUsername === undefined) ? null : <div style={{ display: 'flex', justifyContent: 'center' }}> <Button className="btn btn-primary " onClick={this.goToAddComment}>Dodaj komentar</Button></div>}
        <Comments comments={this.state.comments} />
        <AddCommentModal showModal={this.state.showModal} closeModal={this.closeModal} artistUsername={this.state.artistData.username} clientUsername={this.props.location.state.clientUsername} />
      </div>
    );
  }
}
