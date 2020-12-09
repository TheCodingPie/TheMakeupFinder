import React, { Component } from "react";
import "../style/login.css";
import {Modal,Button} from 'react-bootstrap'

export default class PopupModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return( 
    <Modal show={this.props.modalShow} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
        <div className="justify-content-center row">
            <label>Unesite sve podatke</label>
        </div>
        <Modal.Body className="justify-content-center col ">
             <div className="justify-content-center row"></div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.closeModal}>U redu</Button>
        </Modal.Footer>
    </Modal>)
  }
}
