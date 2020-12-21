import ListGroup from 'react-bootstrap/ListGroup'
import React, { Component } from "react";
export default class Comments extends Component {
    constructor(props) {
        super(props);
    }
    printComments = () => {
        let elements = [];
        this.props.comments.map(item =>
            elements.push(<ListGroup.Item action variant="info" key={item}> <div className="col">  <h5> {item.slice(item.indexOf('=') + 2, item.length)}  </h5> <h6>{item.slice(0, item.indexOf(' ') + 1)}  {item.slice(item.indexOf(' ') + 1, item.indexOf('=') - 1)}</h6>  </div>  </ListGroup.Item>)
        );
        return elements;
    }
    render() {
        return (
            <div>
                <div className="justify-content-center row">
                    <h3 style={{ color: 'black', alignSelf: 'center' }}>Komentari</h3>
                </div>
                <ListGroup>
                    {this.printComments()}
                </ListGroup>
            </div>
        )
    }
}