import React, { Component, PropTypes } from 'react';

import TodoItem from './../components/TodoItem.jsx';
import TodoEditor from './../components/TodoEditor.jsx';

import * as todoActions from './../redux/TodoActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
  state => ({
    todos: state.todos,
    editTodo: state.editTodo,
    username: state.user.username }),
  dispatch => bindActionCreators(todoActions, dispatch),
)
export default class AppView extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    todos: PropTypes.array,
    username: PropTypes.string,
    editTodo: PropTypes.object,
    createTodo: PropTypes.func,
    loadTodos: PropTypes.func,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    const { loadTodos, username } = this.props;
    loadTodos(username);
  }

  componentWillReceiveProps(nextProps) {
    console.log('appview componentWillReceiveProps: ', nextProps);
  }

  render() {
    const { todos, editTodo } = this.props;

    if (todos === undefined) {
      return null;
    }
    let items = todos.map( (todo, i) => {
      let todoData = {
        index: todo.index,
        text: todo.text
      };

      return (<TodoItem key={i}
                        listIndex={i}
                        todoData={todoData}
                        disabled={false}/>);
    });

    return (
      <div className={'body-layer'}>
        <div className={'todo'}>
          <h1>My to do list:</h1>
          {items}
        </div>

        <TodoEditor todo={editTodo || { text: '', index: -1 }} />
      </div>
    );
  }
}

