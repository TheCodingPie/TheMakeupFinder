import React from 'react';
import firebase from '../Firebase cofiguration/FirebaseConfiguration';
import { Col, Image, Container, Row, Media, } from 'react-bootstrap';
import httpService from "../services/httpService"
import VerticallyCenteredModal from './verticallyCenteredModal'
var storageRef = firebase.storage().ref();

export default class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      urlImage: null,
      username: this.props.location.state.person.username,
      idPhoto: null,
      urlImageLocal: null,
      tagInputValue: "",
      arrayTags: [],
      aboutImage: "",
      modalShow: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ idPhoto: parseInt(await httpService.getNumberOfImages(this.state.username)) });

  }


  saveImageToDataBase = async () => {
    await httpService.addImageToImageTable(this.state.username, this.state.arrayTags, this.state.urlImage, this.state.aboutImage);
    this.setState({ modalShow: true })
  }

  onChangeImage = (e) => {
    this.setState({ file: e.target.files[0] });
    this.setState(prevState => ({ idPhoto: prevState.idPhoto + 1 }));
    this.setState({ urlImageLocal: URL.createObjectURL(e.target.files[0]) });

  }

  addToFirebase = async () => {
    console.log(this.state.idPhoto.toString());
    await storageRef.child(this.state.username.toString() + '/' + this.state.idPhoto.toString()).put(this.state.file);
    await storageRef.child(this.state.username.toString() + '/' + this.state.idPhoto.toString()).getDownloadURL().then((url) => this.setState({ urlImage: url }));
    this.saveImageToDataBase();
  }

  hideModal = () => {
    this.setState({ modalShow: false })
    window.location.reload(true);
  }

  render() {
    return (
      <div style={{ flexGrow: 1, width: '100%' }}>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={9}>
              <h5>Dodavanje fotografije</h5>
              <div class="custom-file mb-3 mt-3" >
                <input type="file" class="custom-file-input" id="inputGroupFile04" onChange={this.onChangeImage} />
                <label class="custom-file-label" for="inputGroupFile04">Izaberite fotografiju</label>
                <br />
              </div>
              <Container class="mt-6">
                <Media style={{ display: 'flex', justifyContent: 'center' }} >
                  <Image width={250}
                    height={250}
                    className="align-self-start mr-3"
                    src={this.state.urlImageLocal} />
                </Media>
              </Container>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button class="btn btn-primary" onClick={() => this.addToFirebase()} >Dodaj fotografiju</button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <VerticallyCenteredModal show={this.state.modalShow} onHide={this.hideModal} data={(<h5>Uspesno ste dodali fotografiju</h5>)} />
      </div>
    )
  }
}

