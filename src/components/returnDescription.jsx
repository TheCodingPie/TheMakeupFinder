import React, { Component } from "react";

export default class ReturnDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      citiesToRender: null
    };
    this.returnDescription();
  }
  componentDidMount = () => {
    let citiesToRender = "";
    if (this.props.artistData.city) {
      this.props.artistData.city.forEach(city => citiesToRender += city + " ");
      this.setState({ citiesToRender });
    }
  }
  returnDescription = async () => {
    const response = await fetch(
      "http://localhost:1234/returnDescription/" + this.props.artistData.username
    );
    const zaKonz = await response.json();
    this.setState({ description: zaKonz });

  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'whitesmoke' }}>
        <h1 style={{ alignSelf: 'center', color: '#ff0178' }}>{this.props.artistData.username}</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 9, alignItems: 'center' }}>
            <h5>{this.props.artistData.name} {this.props.artistData.lastname}</h5>
            <h5 >Radi u gradovima: {
              this.state.citiesToRender
            }</h5>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5>Opis: {this.state.description}</h5>
              </div>


            </div>
          </div>
        </div>
      </div>

    );
  }
}
