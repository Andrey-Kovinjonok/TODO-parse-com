import { CREATE_TODO
        , SET_EDIT_TODO
        , CHANGE_TODO
        , LOAD_TODOS
        , DELETE_TODO } from './TodoActions.js';

import { ADD_USERS, LOG_IN, LOG_OUT } from './ParseComActions.js';

const initialState = {
  todos: [],
  lastIndex: -1,
  users: []
  //user: {}
};

export default function todoReducer(state = initialState, action) {

  console.log('todoReducer:', state, action);
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            index: state.lastIndex + 1,
            marked: false,
            text: action.text
          }
        ],
        lastIndex: state.lastIndex + 1
      };


    case SET_EDIT_TODO:
      return {
        ...state,
        ['editTodo']: action.editTodo
      };

    case CHANGE_TODO:
      let todos = state.todos.map(todo =>
        (todo.index === action.index) ? { ...todo, text: action.text } : todo
      );
      return {
        ...state,
        ['editTodo']: undefined,
        ['todos']: todos,
        ['lastIndex']: state.lastIndex
      };

    case DELETE_TODO:
      let arr = state.todos.filter(todo => todo.index !== action.index);
      return {
        ...state,
        ['todos']: arr,
        ['lastIndex']: state.lastIndex
      };

    case LOAD_TODOS:
      let d = {
        //need save state, because we already have user's data
        ...state,
        todosObj: action.todosObj,
        todos: action.todos,
        ['lastIndex']: action.todos.length
      };
      console.log(d);
      return d;

    case ADD_USERS:
      return {
        ...state,
        users: [
          ...state.users,
          ...action.users
        ]
      };

    case LOG_IN:
      return {
        ...state,
        user: action.userData
      };

    case LOG_OUT:
      return {
        ...state,
        user: undefined
      };

    default:
      return state ? state : initialState;
  }
}
