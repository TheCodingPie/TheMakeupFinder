import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import httpService from "../services/httpService"
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from 'react-bootstrap';
export default class AddCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      modalContent: ""
    };
  }

  handleComment = async comment => {
    this.setState({
      comment: comment.target.value
    });
  }

  addComment = async () => {
    const comment = new Date().toISOString().slice(0, 10) + " " + this.props.clientUsername + " = " + this.state.comment;
    const response = await httpService.addComment(this.props.artistUsername, comment)
    this.setState({ modalContent: response });
  };

  render() {
    return (
      <Modal show={this.props.showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.onHide} >
        <Modal.Body className="justify-content-center col ">
          <h3>Dodavanje komentara</h3>
          <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite komentar" onChange={this.handleComment} />
          <button type="submit" className="btn btn-primary btn-block" onClick={this.addComment}>Dodaj komentar</button>
          {(<label style={{ color: "blue" }}>{this.state.modalContent}</label>)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Zatvori</Button>
        </Modal.Footer>
      </Modal>)
  }

}

