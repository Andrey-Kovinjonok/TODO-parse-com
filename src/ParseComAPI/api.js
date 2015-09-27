import { Parse } from 'parse';

let options = {
  appId: 'G8uut7RIyYCwCgAS7tioU4eZRqzHltm1bReq4o8X',
  apiKey: 'Lw3ZTfc2ER4kVh6zznDeXJfn1xphDFPgSYWGWVVz'
};

let instance = null;

export default class ParseCOM {
  constructor() {
    if(!instance) {
      instance = this;
      // initialize api with options
      Parse.initialize(options.appId, options.apiKey);
      this.parseAPI = Parse;
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
        success: (username) => (resolve(username)),
        error: (username, error) => (reject({ username, error }))
      });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      let query = new this.parseAPI.Query(Parse.User);
      query.find({
        success: (users) => (resolve(users)),
        error: () => (reject([]))
      });
    });
  }

  login(user, pass) {
    let self = this;
    return new Promise((resolve, reject) => {
      return self.parseAPI.Parse.User.logIn(user, pass, {
        success: (users) => (resolve(users)),
        error: () => (reject([]))
      });
    });
  }

  logout() {
    let self = this;
    return new Promise((resolve, reject) => {
      self.parseAPI.Parse.User.logOut()
      .then( (res) => {
        console.log('logout: ', res);
      });
      let currUser = self.parseAPI.Parse.User.current();
      if (!currUser) {
        return resolve();
      } else {
        return reject();
      }
    });
  }

  loadTodos(username) {
    let self = this;
    return new Promise((resolve, reject) => {
      let TodosObj = self.parseAPI.Object.extend('Todos');
      let query = new self.parseAPI.Query(TodosObj);
      query.equalTo('user', username);
      query.find({
        success: (todos) => {
          console.log(todos);
          return (resolve(todos));
        },
        error: (res) => {
          console.log(res);
          return (reject(res));
        }
      });
    });
  }

  create(user, todosObj, field, value) {
    console.log('API', field, value);
    let self = this;
    return new Promise((resolve, reject) => {
      if (todosObj) {
        return resolve(todosObj);
      } else {
        let TodosObj = self.parseAPI.Object.extend('Todos');
        let todos = new TodosObj();
        todos.set('user', user.username);
        todos.set(field, value);
        todos.save(null, {
          success: (res) => {
            resolve(res);
          },
          error: (res) => {
            reject('Update error: ', res);
          }
        });
      }
    });
  }

  update(user, todosObj, field, value) {
    return this.create(user, todosObj, field, value)
    .then(
      (resolvedTodoObj) => {
        console.log('API');
        return new Promise((resolve, reject) => {
          resolvedTodoObj.set(field, value);
          resolvedTodoObj.save(null, {
            success: (res) => {
              resolve('Update successful : ', res);
            },
            error: (res) => {
              reject('Update error: ', res);
            }
          });
        });
      },
      (err) => {
        console.log("Can't create TODOS object !!!", err);
      }
    );
  }

}
