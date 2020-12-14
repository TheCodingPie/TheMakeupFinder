import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import CreateProfileClient from "./components/createProfileClient";
import CreateProfileArtist from "./components/createProfileArtist";
import BookedAppointmentsForUser from "./components/BookedAppointmentsForUser";
import ArtistHomePage from './components/artistHomePage'
import FreeDate from './components/freeDate'
import ClientHomePage from "./components/clientHomePage";
import Scheduler from "./components/Scheduler";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createClient" component={CreateProfileClient} />
        <Route path="/createArtist" component={CreateProfileArtist} />
        <Route path="/clientHomePage" component={ClientHomePage} />
        <Route path="/bookedAppointments" component={BookedAppointmentsForUser} />
        <Route path="/artistHomePage" component={ArtistHomePage} />
        <Route path="/freeDate" component={FreeDate} />
        <Route path="/scheduler" component={Scheduler} />
      </Switch>
    </Router>
  );
}
export default App;
