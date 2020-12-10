import React, { Component } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import httpService from "../services/httpService"
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      data: [],
    }
  }
  getArtists = async (first_letter) => {
    let artists = await httpService.getArtists(first_letter);
    if (artists) {
      this.setState({ data: artists });
    }
  };

  obradiInput = input => {
    if (input.length !== 1) return;
    this.getArtists(input.charAt(0));
  };

  render() {
    return (
      <Typeahead
        id="basic-example"
        labelKey="name"
        onChange={selected => this.props.obradiIzbor(selected)}
        options={this.state.data}
        placeholder="Pretrazi sminkere"
        onInputChange={input => this.obradiInput(input)}
      />
    );
  }
}
