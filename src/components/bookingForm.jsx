import React from "react";
import "../style/bookingPage.css";
import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core'
import { Button } from "react-bootstrap";
import httpService from "../services/httpService"
import RangeSlider from 'react-bootstrap-range-slider';
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceFrom: 0,
      priceTo: 0,
      city: this.props.cities[0],
      date: new Date(),
      timeFrom: '07:30',
      timeTo: '17:30',
      cities: [],
      parsedDate: ""
    }
  }
  componentDidMount = async () => {
    await this.setState({ cities: await httpService.getCities() });
    await this.setState({ city: this.state.cities[0] });
    let parsedDate = "";
    parsedDate += this.state.date.getFullYear() + "_";
    let month = this.state.date.getMonth() + 1;
    parsedDate += month + "_";
    parsedDate += this.state.date.getDate();
    this.setState({ parsedDate });
  };
  handleChangeCity = (event) => {
    this.setState({ city: event.target.value });
  }
  handleChangePriceFrom = (event) => {
    this.setState({ priceFrom: event.target.value });
  }
  handleChangePriceTo = (event) => {
    this.setState({ priceTo: event.target.value });
  }
  handleChangeDate = async date => {
    console.log(date)
    await this.setState({ date });
    let parsedDate = "";
    parsedDate += this.state.date.getFullYear() + "_";
    let month = this.state.date.getMonth() + 1;
    parsedDate += month + "_";
    parsedDate += this.state.date.getDate();
    this.setState({ parsedDate });
    console.log(parsedDate)
  };

  onChangeTimeFrom = value => {
    console.log(value.target.value);
    if (value.target.value === null) return;
    this.setState({
      timeFrom: value.target.value
    });
  };
  onChangeTimeTo = value => {
    console.log(value.target.value);
    if (value.target.value === null) return;
    this.setState({
      timeTo: value.target.value
    });
  };
  printCityToSelect = () => {
    let elements = this.state.cities.map(item => (<option key={item} value={item}> {item} </option>))
    return elements;
  };

  render() {
    return (
      <div className="form-group" style={{ backgroundColor: 'white', borderRadius: '10px' }} >
        <div className="form-group" style={{ margin: '20px' }}>
          <h5>Cena od</h5>
          <RangeSlider
            type="range"
            className="custom-range"
            id="customRange1"
            min="100"
            max="10000"
            step="100"
            title={this.state.priceFrom}
            value={this.state.priceFrom}
            onChange={this.handleChangePriceFrom}
          ></RangeSlider>
        </div>
        <div className="form-group" style={{ margin: '20px' }}>
          <h5>Cena do</h5>
          <RangeSlider
            type="range"
            className="custom-range"
            id="customRange2"
            data-toggle="popover"
            data-content="Some content inside the popover"
            min="100"
            max="10000"
            step="100"
            title={this.state.priceTo}
            value={this.state.priceTo}
            color="gray"
            onChange={this.handleChangePriceTo}
            data-toggle="tooltip"
          ></RangeSlider>
        </div>
        <div className="form-group" style={{ margin: '20px' }}>
          <h5>Grad</h5>
          <select className="optionsSelect" onChange={e => this.handleChangeCity(e)} >
            {this.printCityToSelect()}
          </select>
        </div>
        <div className="form-group" style={{ margin: '20px' }}>
          <h5>Datum </h5>
          <DatePicker selected={this.state.date} onChange={this.handleChangeDate} />
        </div>
        <div className="form-group" style={{ width: '30%', marginLeft: '20px' }}>
          <h5>Od </h5>
          <TextField
            type="time"
            defaultValue='07:30'
            onChange={this.onChangeTimeFrom} />
        </div>
        <div className="form-group" style={{ width: '30%', marginLeft: '20px' }}>
          <h5>Do </h5>
          <TextField
            type="time"
            defaultValue='17:00'
            onChange={this.onChangeTimeTo}
          />
        </div>

        <div className="form-group" style={{ margin: '60px' }}>
          <Button onClick={() => this.props.findArtists(this.state.timeFrom, this.state.timeTo, this.state.parsedDate, this.state.priceFrom, this.state.priceTo, this.state.city)}
            style={{ backgroundColor: 'blue' }}>
            Pretrazi
          </Button>
        </div>
        <h5 style={{ color: "red" }}>{this.props.message} </h5>
      </div>
    )
  }
}