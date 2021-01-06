import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class Scheduler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Calendar
        style={{ backgroundColor: 'white', borderRadius: '10px' }}
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
        events={this.props.appointments}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
      />

    );
  }
}
