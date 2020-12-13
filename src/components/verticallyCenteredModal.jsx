import { Button, Modal } from 'react-bootstrap';
import React, { Component } from "react";
export default class VerticallyCenteredModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="justify-content-center row"></div>
                <Modal.Body className="justify-content-center col ">
                    <div className="justify-content-center col">
                        <div>{this.props.data1}</div>
                        <div>{this.props.data}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Zatvori</Button>
                </Modal.Footer>
            </Modal>
        );

    }
}