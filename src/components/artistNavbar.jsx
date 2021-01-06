import React from "react";
import { Navbar, Nav } from "react-bootstrap";
export default class ArtistNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ width: "80%" }} >
                <Navbar bg="light" expand="lg" style={{
                    borderRadius: '10px'
                }}>
                    <Navbar.Brand >MakeUpFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <button type="submit" className="btn " onClick={this.props.goToFreeDates}>Oslobodi termine</button>
                            <button type="submit" className="btn " onClick={this.props.goToMyProfile}>Pogledaj svoj profil</button>
                            <button type="submit" className="btn " onClick={this.props.goToAddImage}>Dodaj sliku</button>
                        </Nav>
                        <button type="submit" className="btn " onClick={this.props.logout}>Odjavi se</button>

                    </Navbar.Collapse>
                </Navbar>
            </div>)
    }
}