import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import React, { Component } from "react";
import moment from "moment";
export default class FreeDateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            timeFrom: moment().format("HH:mm"),
            timeTo: moment().format("HH:mm"),
            parsedDate: new Date(),
        };
    }
    componentDidMount = () => {
        let parsedDate = "";
        parsedDate += this.state.date.getFullYear() + "_";
        let month = this.state.date.getMonth() + 1;
        parsedDate += month + "_";
        parsedDate += this.state.date.getDate();
        this.setState({ parsedDate });
    }

    handleChangeDate = async date => {
        await this.setState({ date });
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
    render() {
        return (
            <div className="login">
                <h3

                >
                    Oslobadjanje termina
          </h3>


                <label>Datum </label>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    style={{ backgroundColor: "red" }}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>Od </label>
                    <TimePicker
                        style={{ width: 100 }}
                        showSecond={false}
                        defaultValue={moment()}
                        className="xxx"
                        onChange={this.onChangeTimeFrom}
                    />
                    <label>Do </label>
                    <TimePicker
                        style={{ width: 100 }}
                        showSecond={false}
                        defaultValue={moment()}
                        className="xxx"
                        onChange={this.onChangeTimeTo}
                    />
                </div>
                <label style={{ color: "red" }}>{this.props.errorMessage}</label>
                <button

                    className="  btn-primary"
                    style={{ backgroundColor: "blue" }}
                    onClick={() => this.props.freeDate(this.state.timeFrom, this.state.timeTo, this.state.parsedDate)}
                >
                    Oslobodi termine
          </button>
            </div>
        );

    }
}