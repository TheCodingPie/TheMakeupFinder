import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import CreateProfileClient from "./components/createProfileClient";
import CreateProfileArtist from "./components/createProfileArtist";
import ArtistHomePage from './components/artistHomePage'
import ClientHomePage from "./components/clientHomePage";
import ArtistProfile from "./components/artistProfile";
import ImageUpload from './components/ImageUpload'
import BadUrl from './components/badUrl'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createClient" component={CreateProfileClient} />
        <Route path="/createArtist" component={CreateProfileArtist} />
        <Route path="/clientHomePage" component={ClientHomePage} />
        <Route path="/artistHomePage" component={ArtistHomePage} />
        <Route path="/artistProfile" component={ArtistProfile} />
        <Route path="/addImagePage" component={ImageUpload} />
        <Route component={BadUrl} />
      </Switch>
    </Router>
  );
}
export default App;



