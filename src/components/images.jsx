import { Image, Container } from 'react-bootstrap';
import React, { Component } from "react";
export default class Images extends Component {
    constructor(props) {
        super(props);
    }
    printImages = () => {
        let findImages = this.props.images.map(item => {
            return (
                <div key={item} className="d-flex  align-self-start flex-column mr-2 ml-2 mb-2 " >
                    <Image width={300}
                        height={300}
                        className="align-self-start ml-2 "
                        src={item} alt="radi" class="img-thumbnail" />
                </div>
            )
        });
        return findImages;
    }
    render() {
        return (
            <Container>
                <div className="justify-content-center row">
                    {this.printImages()}
                </div>
            </Container>
        )
    }
}