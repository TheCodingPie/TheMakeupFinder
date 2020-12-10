import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import CreateProfileClient from "./components/createProfileClient";
import CreateProfileArtist from "./components/createProfileArtist";
import Booking from "./components/booking";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createClient" component={CreateProfileClient} />
        <Route path="/createArtist" component={CreateProfileArtist} />
        <Route path="/booking" component={Booking} />
      </Switch>
    </Router>
  );
}
export default App;
