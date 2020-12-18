import React, { Component } from "react";

export default class ArtistDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      citiesToRender: null
    };
  }
  componentDidMount = () => {
    let citiesToRender = "";
    console.log(this.props.artistData.city)
    if (this.props.artistData.city) {
      this.props.artistData.city.forEach(city => citiesToRender += city + " ");
      this.setState({ citiesToRender });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'whitesmoke' }}>
        <h1 style={{ alignSelf: 'center', color: '#ff0178' }}>{this.props.artistData.username}</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 9, alignItems: 'center' }}>
            <h5>{this.props.artistData.name} {this.props.artistData.lastname}</h5>
            <h5 > {this.state.citiesToRender}</h5>
          </div>
        </div>
      </div>

    );
  }
}
