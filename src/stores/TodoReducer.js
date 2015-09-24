import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from './TodoActions.js';
//import { List } from 'immutable';

/*const initialState = {
  notes: [],
  activeNote: {}
};*/

const initialState = {
  todos: [],
  lastIndex: -1
};

/*
const initialState = new List();

export default function todoReducer(state = initialState, action) {
  console.log('todoReducer:', state, action);
  switch (action.type) {
    case CREATE_TODO:
      return state.concat(action.text);

    case EDIT_TODO:
      return state.set(action.id, action.text);

    case DELETE_TODO:
      return state.delete(action.id);

    default:
    console.log('--DEFAULT ACTION:', state);
      return state;
  }
}*/



export default function todoReducer(state = initialState, action) {
  
  console.log('todoReducer:', state, action);
  switch (action.type) {
    case CREATE_TODO:
      return {
        todos: [
          ...state.todos,
          {
            index: state.lastIndex + 1,
            dbKey: action.dbKey,
            marked: false,
            text: action.text
          }
        ],
        lastIndex: state.lastIndex + 1
      };

    case EDIT_TODO:
      let todos = state.map(todo =>
        (todo.index === action.index) ? { ...todo, text: action.text } : todo
      );
      return {
        todos: todos,
        lastIndex: state.lastIndex
      };

    case DELETE_TODO:
      let arr = state.todos.filter(todo => todo.index !== action.index);
      return {
        todos: arr,
        lastIndex: state.lastIndex
      };

    default:
      console.log('--DEFAULT ACTION:', state);
      return state ? state : initialState;
  }
}

/*const initialTimeState = {};

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading 
// from state. So it's just a personal preference here and you may not need this depending on 
// how your reducers are named and what properties they expose in Redux's store.
export function todoReducer(state = initialTimeState, action) {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        frozen: true
      };

    case 'REQUEST_SUCCESS':
      return {
        ...state,
        time: action.result.time,
        frozen: false
      };

    case 'REQUEST_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        frozen: false
      };

    default:
      return state;
  }
}*/

