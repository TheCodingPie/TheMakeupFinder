import React from 'react';
import VerticallyCenteredModal from './verticallyCenteredModal'
import httpService from "../services/httpService"
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from 'react-bootstrap';
export default class AddComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistUsername: this.props.location.state.artistUsername,
      clientUsername: this.props.location.state.clientUsername,
      comment: "",
      modalShow: false,
      modalContent: ""

    };
  }

  handleComment = async comment => {
    this.setState({
      comment: comment.target.value
    });
  }
  handleArtistUsername = async artistUsername => {
    this.setState({
      artistUsername: artistUsername.target.value
    });
  }

  addComment = async () => {
    const comment = new Date().toISOString().slice(0, 10) + " " + this.state.clientUsername + " = " + this.state.comment;
    const response = await httpService.addComment(this.state.artistUsername, comment)
    this.setState({ modalContent: response, modalShow: true });
  };

  hideModal = () => this.setState({ modalShow: false })
  render() {
    return (
      <div className="celaStrana">
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
          <div >
            <h3>Dodavanje komentara</h3>
            <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite komentar" onChange={this.handleComment} />
            <button type="submit" className="btn btn-primary btn-block" onClick={this.addComment}>Dodaj komentar</button>
          </div>
          <div className="iznadIIspod1"></div>
        </div>
        <VerticallyCenteredModal show={this.state.modalShow} onHide={this.hideModal} data={this.state.modalContent} />
      </div>
    )
  }

}

