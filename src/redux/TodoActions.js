import parseCom from './../ParseComAPI/api.js';

export const CREATE_TODO = 'CREATE_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const SET_EDIT_TODO = 'SET_EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const LOAD_TODOS = 'LOAD_TODOS';


export function createTodo(text) {
  return {
    type: CREATE_TODO,
    text,
    postPromise: (state) => {
      return parseCom.API.update(state.user
                                , state.todosObj
                                , 'todos'
                                , state.todos);
    },
    date: Date.Now
  };
}

export function changeTodo(todo) {
  return {
    type: CHANGE_TODO,
    ...todo,
    postPromise: (state) => {
      return parseCom.API.update(state.user
                                , state.todosObj
                                , 'todos'
                                , state.todos);
    },
    date: Date.Now
  };
}

export function deleteTodo(todo) {
  return {
    ...todo,
    postPromise: (state) => {
      return parseCom.API.update(state.user
                                , state.todosObj
                                , 'todos'
                                , state.todos);
    },
    type: DELETE_TODO
  };
}

export function setEditTodo(todo) {
  return {
    type: SET_EDIT_TODO,
    editTodo: todo
  };
}

export function loadTodos(username) {
  return {
    type: LOAD_TODOS,
    promise: parseCom.API.loadTodos(username),
    onSuccess: (result) => {
      console.log('receive TODOS', result);
      let todosObj = result.pop();
      return todosObj ? {
        ['todosObj']: todosObj,
        todos: todosObj.attributes.todos
      } : {
        ['todosObj']: todosObj,
        todos: []
      };
    }
  };
}
