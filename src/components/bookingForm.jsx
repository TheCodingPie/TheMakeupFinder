import React from "react";
import "../style/bookingPage.css";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import moment from "moment";
import { Button } from "react-bootstrap";
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceFrom: 0,
      priceTo: 0,
      city: "",
      date: "",
      timeFrom: moment().format("HH:mm"),
      timeTo: moment().format("HH:mm"),
      cities: [],
      parsedDate: ""
    }
  }

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
    await this.setState({
      date
    });
    let parsedDate = "";
    parsedDate += this.state.date.getFullYear() + "_";
    let month = this.state.date.getMonth() + 1;
    parsedDate += month + "_";
    parsedDate += this.state.date.getDate();

    this.setState({ parsedDate });
  };
  onChangeTimeFrom = async value => {
    if (value === null) return;
    await this.setState({
      timeFrom: value.format("HH:mm")
    });
  };
  onChangeTimeTo = async value => {
    if (value === null) return;
    await this.setState({
      timeTo: value.format("HH:mm")
    });
  };
  printCityToSelect = () => {
    let elements = this.state.cities.map((item, index) => {
      return (<option key={index} value={item}> {item} </option>);
    });
    return elements;
  };

  render() {
    return (
      <div className=" bookingceo">
        <label>Cena od</label>
        <input
          type="range"
          className="custom-range"
          id="customRange1"
          min="100"
          max="10000"
          step="100"
          title={this.state.priceFrom}
          value={this.state.priceFrom}
          onChange={this.handleChangePriceFrom}
        ></input>
        <label>Cena do</label>
        <input
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
        ></input>
        <label>Grad</label>
        <select className="optionsSelect" onChange={e => this.handleChangeCity(e)} >
          {this.printCityToSelect()}
        </select>
        <label>Datum </label>
        <DatePicker selected={this.state.date} onChange={this.handleChangeDate} />
        <label>Od </label>
        <TimePicker
          style={{ width: 100 }}
          showSecond={false}
          defaultValue={moment()}
          className="xxx"
          onChange={this.onChangeTimeFrom} />
        <label>Do </label>
        <TimePicker
          style={{ width: 100 }}
          showSecond={false}
          defaultValue={moment()}
          className="xxx"
          onChange={this.onChangeTimeTo}
        />
        <Button onClick={() => this.props.findArtists(this.state.timeFrom, this.state.timeTo, this.state.parsedDate, this.state.priceFrom, this.state.priceTo, this.state.city)}
          style={{ backgroundColor: 'blue' }}>
          Pretrazi{" "}
        </Button>
        <label style={{ color: "red" }}>{this.props.message} </label>
      </div>
    )
  }
}