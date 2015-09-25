//let config = require('!!json!./apiConfig.json');

import { Parse } from 'node-parse-api';

//let config = require('Config'); // externals.Config

let options = {
  /*app_id: config.appId,   //eslint-disable-line
  api_key: config.apiKey  //eslint-disable-line*/
  app_id: 'G8uut7RIyYCwCgAS7tioU4eZRqzHltm1bReq4o8X', //eslint-disable-line
  api_key: 'Lw3ZTfc2ER4kVh6zznDeXJfn1xphDFPgSYWGWVVz' //eslint-disable-line
};

let instance = null;

export default class ParseCOM {
  constructor() {
    if(!instance) {
      instance = this;
      this.parseAPI = new Parse(options);
      this.parseAPI.initialize();
    }
    return instance;
  }

  static get API() {
    let api = instance;
    if(!api) {
      api = new ParseCOM();
    }
    return api;
  }

  signIn(userData, success, fail = undefined) {
    return this.parseAPI.insertUser(userData)
    .then(
      (result) => success(result),
      (error) => fail(error)
    );
  }

  getUsers(success, fail = undefined) {
    return this.parseAPI.find('')
    .then(
      (result) => success(result),
      (error) => fail(error)
    );
  }

  login(user, pass, success, fail = undefined) {
    return this.parseAPI.loginUser(user, pass)
    .then(
      (result) => success(result),
      (error) => fail(error)
    );
  }

  logout(sessionToken, success, fail = undefined) {
    return this.parseAPI.logoutUser(sessionToken)
    .then(
      (result) => success(result),
      (error) => fail(error)
    );
  }

  update(obj, field, value, success, fail = undefined) {
    return this.parseAPI.update(obj, field, value)
    .then(
      (result) => success(result),
      (error) => fail(error)
    );
  }
}
