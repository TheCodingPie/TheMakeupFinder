import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class Scheduler extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      events: [],
      myData: this.props.artist,
    };

    this.returnAllAppointments();
  }
  returnAllAppointments = async () => {
    const response = await fetch(
      "http://localhost:1234/returnAllAppointments/" + this.state.myData.username
    );
    const dates = await response.json();
    let myEvents = [];

    let year, month, day, hour, minute, free, timeInMinutes, endTimeInMinutes, endHour, endMinute;


    Object.keys(dates).forEach(key => {
      if (key == 'dates') return;

      year = parseInt(key.slice(1, 5));

      (key[7] == '_') ? month = parseInt(key.slice(6, 7)) : month = parseInt(key.slice(6, 8));
      (key[key.length - 2] == '_') ? day = parseInt(key.slice(key.length - 1, key.length)) : day = parseInt(key.slice(key.length - 2, key.length));


      Object.keys(dates[key]).forEach(key1 => {

        hour = parseInt(key1.slice(0, 2));
        minute = parseInt(key1.slice(3, 5));
        (dates[key][key1] == 'false') ? free = 'slobodan termin' : free = 'zakazano sminkanje';

        timeInMinutes = hour * 60 + minute;
        endTimeInMinutes = timeInMinutes + this.state.myData.timeslot;
        endHour = Math.floor(endTimeInMinutes / 60);
        endMinute = endTimeInMinutes % 60;

        myEvents.push({
          title: free,
          start: new Date(year, month - 1, day, hour, minute, 0),
          end: new Date(year, month - 1, day, endHour, endMinute, 0),
          isFree: (free == 'slobodan termin') ? true : false
        })

      });

    });
    await this.setState({ events: myEvents });


  };
  render() {
    return (
      <Calendar
        eventPropGetter={(event) => {
          let newStyle = {
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "0px",
            border: "none"
          };

          if (event.isFree) {
            newStyle.backgroundColor = "lightgreen";
          }

          return {
            className: "",
            style: newStyle
          };
        }}
        events={this.state.events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
      />

    );
  }
}
