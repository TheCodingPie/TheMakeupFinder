import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import CreateProfileClient from "./components/createProfileClient";
import CreateProfileArtist from "./components/createProfileArtist";
import BookedAppointmentsForUser from "./components/BookedAppointmentsForUser";
import ArtistFirstPage from './components/artistFirstPage'
import FreeDate from './components/freeDate'
import ClientHomePage from "./components/clientHomePage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createClient" component={CreateProfileClient} />
        <Route path="/createArtist" component={CreateProfileArtist} />
        <Route path="/clientHomePage" component={ClientHomePage} />
        <Route path="/bookedAppointments" component={BookedAppointmentsForUser} />
        <Route path="/artistFirstPage" component={ArtistFirstPage} />
        <Route path="/freeDate" component={FreeDate} />
      </Switch>
    </Router>
  );
}
export default App;
