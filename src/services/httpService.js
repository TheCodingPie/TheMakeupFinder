import domain from './domain'
import axios from 'axios';
export default class httpService {
  static login = async (id, password) => {
    try {
      const fetchUrl = domain + 'login/' + id + "/" + password;
      const response = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.status !== 200) {
        return false //"Looks like there was a problem. Status Code: " + response.status
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }

  static sessionLogin = async () => {
    try {
      const fetchUrl = domain + 'sessionLogin/';
      const response = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.status !== 200) {
        return false //"Looks like there was a problem. Status Code: " + response.status
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }

  static getArtists = async (firstLetter) => {

    try {
      const options = {
        method: "GET",
        credentials: 'include'
      };

      const fetchUrl = domain + 'getUsernames/' + firstLetter;
      const response = await fetch(fetchUrl, options);
      if (response.status !== 200) {
        return false //"Looks like there was a problem. Status Code: " + response.status
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }
  static findArtists = async (timeFrom, timeTo, city, priceFrom, priceTo, date) => {
    try {
      const data = {
        timeFrom,
        timeTo,
        city,
        priceTo,
        priceFrom,
        date,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include'
      };

      const fetchUrl = domain + 'findArtist/';
      const response = await fetch(fetchUrl, options);
      if (response.status !== 200) {
        return false //"Looks like there was a problem. Status Code: " + response.status
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }

  static getArtist = async (username) => {
    try {
      const fetchUrl = domain + 'artistInfo/' + username
      const options = {
        method: "GET",
        credentials: 'include'
      };
      const response = await fetch(fetchUrl, options);
      if (response.status !== 200) {
        return false
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }
  static logout = async () => {
    try {
      const fetchUrl = domain + 'logout/';
      const response = await fetch(fetchUrl, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.status !== 200) {
        return false //"Looks like there was a problem. Status Code: " + response.status
      }
      else {
        return true;
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }

  }
  static createClient = async (username, password, name, lastname, email) => {
    const fetchUrl = domain + 'createClient/' + username + "/" + password + "/" + name + "/" + lastname + "/" + email;
    try {
      const response = await fetch(fetchUrl);
      if (response.status !== 200) {
        return "error";
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return "error";
    }
  }

  static createArtist = async (data) => {
    const fetchUrl = domain + 'createArtist/';
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };
      const response = await fetch(fetchUrl, options);
      if (response.status !== 200) {
        return "error";
      }
      else {
        return response.json();
      }
    }
    catch (e) {
      console.log(e);
      return "error";
    }
  }



}










