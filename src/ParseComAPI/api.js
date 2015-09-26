
//import { Parse } from 'node-parse-api';
import { Parse } from 'parse';

let options = {
  /*app_id: config.appId,   //eslint-disable-line
  api_key: config.apiKey  //eslint-disable-line*/
  appId: 'G8uut7RIyYCwCgAS7tioU4eZRqzHltm1bReq4o8X', //eslint-disable-line
  apiKey: 'Lw3ZTfc2ER4kVh6zznDeXJfn1xphDFPgSYWGWVVz' //eslint-disable-line
};

let instance = null;

export default class ParseCOM {
  constructor() {
    if(!instance) {
      instance = this;
      // initialize api with options
      Parse.initialize(options.appId, options.apiKey);
      this.parseAPI = Parse;
      (options);
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

  signUp(userData) {
    return new Promise((resolve, reject) => {
      let user = new this.parseAPI.User();
      user.set('username', userData.username);
      user.set('password', userData.password);
      user.signUp(null, {
        success: (user) => (resolve(user)),
        error: (user, error) => (reject({ user, error }))
      });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      let query = new this.parseAPI.Query(Parse.User);
      query.find({
        success: (users) => (resolve(users)),
        error: (user, error) => (reject([]))
      });
    })
  }

  login(user, pass) {
    let self = this;
    return new Promise((resolve, reject) => {
      return self.parseAPI.Parse.User.logIn(user, pass, {
        success: (users) => (resolve(users)),
        error: (user, error) => (reject([]))
      })
    })
  }

  logout(sessionToken) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.parseAPI.Parse.User.logOut()
      .then( (res) => {
        console.log("logout:", res);
      });
      let currUser = self.parseAPI.Parse.User.current();
      if (!currUser) {
        return resolve();
      } else {
        return reject();
      }
    });
  }

  update(obj, field, value) {
    return this.parseAPI.update(obj, field, value)
    .then(
      success,
      fail || () => {}
    );
  }
}
