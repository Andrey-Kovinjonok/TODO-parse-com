
//let Reflux = require('reflux');

let fetch = require('isomorphic-fetch');
//let fetch = require('node-fetch');
const server = 'http://localhost';
const port = 4001;

//------------------------------------------------------------------------

//let todoIndex = 4;
let gTodos = [];
/*gTodos = [
  { dbKey: 0, text: 'create TODO component' },
  { dbKey: 1, text: 'create server' },
  { dbKey: 2, text: 'create page of items edit' },
  { dbKey: 3, text: 'create data base' },
  { dbKey: 4, text: 'debug and finish project' }
];**/

/*
function testSendData(request, data) {
  console.log('testSendData');
  return new Promise((resolve, reject) => {

    if (request === 'updateTodo') {
      console.log('updateTodo from list');
      gTodos[data.index] = data.text;
      console.log(':', data);
      if (data.text.length !== gTodos.length) {
        resolve(data);
      } else {
        reject(data);
      }
    } else if (request === 'removeTodo') {
      console.log('removeTodo from list');
      let todos = gTodos.filter(el => {
        return el.dbKey !== data.dbKey;
      });
      console.log(':', todos);
      if (todos.length !== gTodos.length) {
        gTodos = todos;
        resolve({ text: data.text, success: true, dbKey: data.dbKey });
      } else {
        reject({ text: data.text, error: true, dbKey: data.dbKey });
      }
    } else {
      todoIndex = todoIndex + 1;
      gTodos.push({ dbKey: todoIndex, text: data });
      if (todoIndex > 0) {
        resolve({
          text: data,
          success: true,
          //error: true
          dbKey: todoIndex
        });
      } else {
        reject({
          text: data,
          //success: true,
          error: true,
          dbKey: data.dbKey
        });
      }
    }
  });
}*/

//------------------------------------------------------------------------
/*let Actions = Reflux.createActions([
  'addTodo',
  'removeTodo',
  'updateTodo',
  'listUpdate'
]);*/

/*
let Storage = Reflux.createStore({
  init: function () {
    this.getTodosFromDB();

    this.listenTo(Actions.addTodo, this.handlerAddTodo);
    this.listenTo(Actions.removeTodo, this.handlerRemoveTodo);
    this.listenTo(Actions.updateTodo, this.handlerUpdateTodo);
  },

  getTodosFromDB: function () {
    //return sendData('getTodos', data)
    const request = server + ':' + port + '/api/getTodos';
    return fetch(request, { method: 'GET',
                             headers: {
                              'Accept': 'application/json'
                            }
    })
    .then( (todos) => {
      console.log('received:', todos);
      return todos.json();
    })
    .then( (todos) => {
      console.log('todos:', todos);
      gTodos = todos;
      Actions.listUpdate(gTodos);
    });
  },

  handlerAddTodo: function (data) {
    console.log("send addTodo", data);
    let request = server + ':' + port + '/api/addTodo';
    request = request + '?body=' + data;
    return fetch(request, { method: 'POST'})
    .then(function (result) {
      console.log("add res=", result);
      if (result.statusText === 'OK') {
        return result.json();
      } else {
        return undefined;
      }
    })
    .then(function (result) {
      console.log("add res = ", result);
      if (result) {
        //gTodos.push({ dbKey: result.dbKey, text: data });
        //Actions.listUpdate(gTodos);
        return self.getTodosFromDB();
      }
    });
  },

  handlerRemoveTodo: function (data) {
    let self = this;
    console.log("send removeTodo", data);
    let request = server + ':' + port + '/api/removeTodo';
    request = request + '?body=' + data.dbKey;
    return fetch(request, { method: 'POST'})
    .then(function (result) {
      console.log(result);
      if (result.statusText === 'OK') {
        return result.json();
      } else {
        return undefined;
      }
    })
    .then(function (removedItems) {
      console.log("removed items = ", removedItems);
      if ((removedItems) && (removedItems.count > 0)) {
        return self.getTodosFromDB();
      }
    });

  },

  handlerUpdateTodo: function (data) {
    let self = this;
    console.log("send removeTodo", data);
    let request = server + ':' + port + '/api/updateTodo';
    request = request + '?body=' + JSON.stringify(data);
    return fetch(request, { method: 'POST'})
    .then(function (result) {
      console.log(result);
      if (result.statusText === 'OK') {
        return result.json();
      } else {
        return undefined;
      }
    })
    .then(function (removedItems) {
      console.log("removed items = ", removedItems);
      if ((removedItems) && (removedItems.count > 0)) {
        return self.getTodosFromDB();
      }
    });
  }

});

module.exports.TodoStore = Storage;
module.exports.Actions = Actions;*/
