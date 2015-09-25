export const CREATE_TODO = 'CREATE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';


export function createTodo(text) {
  return {
    type: CREATE_TODO,
    text,
    dbKey: -1,
    date: Date.Now
  };
}

export function editTodo(todo) {
  return {
    ...todo,
    type: EDIT_TODO,
    /*index: todo.index,
    text: todo.text,
    dbKey: todo.dbKey,*/
    date: Date.Now
  };
}

export function deleteTodo(todo) {
  return {
    ...todo,
    type: DELETE_TODO
    //text: todo.text
  };
}
