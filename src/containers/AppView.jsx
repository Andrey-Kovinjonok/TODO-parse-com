import React, { Component, PropTypes } from 'react';

import TodoItem from './../components/TodoItem.jsx';
import TodoEditor from './../components/TodoEditor.jsx';

import * as todoActions from './../redux/TodoActions.js';
//import StoreExports from './../stores/TodoStore.jsx';
//let { TodoStore, Actions } = StoreExports;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({ todoState: state.todos }))
export default class AppView extends Component {

  constructor(props, context) {
    super(props, context);
    /*this.state = {
      todoItems: [],
      editTodo: undefined
    };*/
    console.log('constructor:', props, context);
  }

  /*static propTypes = {
    //friendsById: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }*/
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('appview componentDidMounted: ', this);
    dispatch(todoActions.createTodo('firstTodo'));
    console.log('senden action');
  }

  componentWillReceiveProps(nextProps) {
    console.log('appview componentWillReceiveProps: ', nextProps);
  }

  /*shouldComponentUpdate(prev, next) {
    console.log('appview shouldComponentUpdate: ', prev, next);
    return true;
  }*/


  render() {

    const { todoState, dispatch } = this.props;
    console.log('props app view:', this.props);
    //let {todoItems, editTodo} = this.state;

    let actions = bindActionCreators(todoActions, dispatch);

    let editTodo;
    if (editTodo === undefined) {
      editTodo = { dbKey: -1, text: '', index: -1 };
    }

    if (todoState.todos === undefined) {
      return null;
    }
    let items = todoState.todos.map( (todo, i) => {
      let todoData = {
        index: i,
        text: todo.text,
        dbKey: todo.dbKey
      };

      return (<TodoItem key={i}
                        todoData={todoData}
                        //editItem={editTodo}
                        actions={actions}
                        disabled={false}/>);
    });

    return (
      <div className={'body-layer'}>
        <div className={'todo-list'}>
          <h1>My to do list:</h1>
          {items}
        </div>

        <TodoEditor actions={actions} todo={editTodo} />
      </div>
    );
  }
}

