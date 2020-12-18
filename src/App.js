import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import CreateProfileClient from "./components/createProfileClient";
import CreateProfileArtist from "./components/createProfileArtist";
import ArtistHomePage from './components/artistHomePage'
import ClientHomePage from "./components/clientHomePage";
import Scheduler from "./components/Scheduler";
import ArtistProfile from "./components/artistProfile";
import ImageUpload from './components/ImageUpload'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createClient" component={CreateProfileClient} />
        <Route path="/createArtist" component={CreateProfileArtist} />
        <Route path="/clientHomePage" component={ClientHomePage} />
        <Route path="/artistHomePage" component={ArtistHomePage} />
        <Route path="/scheduler" component={Scheduler} />
        <Route path="/artistProfile" component={ArtistProfile} />
        <Route path="/addImagePage" component={ImageUpload} />
      </Switch>
    </Router>
  );
}
export default App;
