import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core'
import React, { Component } from "react";
import { Button } from 'react-bootstrap'
export default class FreeDateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            timeFrom: '07:30',
            timeTo: '17:00',
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
        if (value.target.value === null) return;
        await this.setState({
            timeFrom: value.target.value
        });
    };
    onChangeTimeTo = async value => {
        if (value.target.value === null) return;
        await this.setState({
            timeTo: value.target.value
        });
    };
    render() {
        return (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', }}>
                <h3 > Oslobadjanje termina  </h3>
                <div className="form-group">
                    <label>Datum </label>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChangeDate} />
                </div>
                <div style={{ display: "flex" }} >

                    <TextField
                        style={{ marginRight: '10px' }}
                        label="Od"
                        type="time"
                        defaultValue='07:30'
                        onChange={this.onChangeTimeTo}
                    />


                    <TextField
                        label="Do"
                        type="time"
                        defaultValue='17:00'
                        onChange={this.onChangeTimeTo}
                    />
                </div>
                <label style={{ color: "red" }}>{this.props.errorMessage}</label>
                <Button onClick={() => this.props.freeDate(this.state.timeFrom, this.state.timeTo, this.state.parsedDate)}>
                    Oslobodi termine
                </Button>
            </div>
        );
    }
}