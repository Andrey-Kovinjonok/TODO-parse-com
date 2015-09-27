import React, { Component, PropTypes } from 'react';

import TextEdit from './TextEdit.jsx';

import * as todoActions from './../redux/TodoActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
  state => ({ todos: state.todos }),
  dispatch => bindActionCreators(todoActions, dispatch)
)
export default class TodoEditor extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('constructor TodoEditor', props, context);

    this.text = this.props.todo.text;
    this.state = {
      isEdit: this.text.length > 0
    };
  }

  static propTypes = {
    createTodo: PropTypes.func.isRequired,
    changeTodo: PropTypes.func.isRequired,
    todo: PropTypes.object
  }

  handleChangeText(text){
    if (text.length !== 0) {
      this.text = text;
    }
  }

  handleSaveText(text) {
    let { createTodo, changeTodo } = this.props;
    if (text.length !== 0) {
      if (this.state.isEdit) {
        let todo = {
          ...this.props.todo,
          text: text
        };
        changeTodo(todo);
      } else {
        createTodo(text);
      }
      this.text = '';
    }
  }

  handleClick() {
    const currText = this.text;
    this.handleSaveText(currText);
  }

  componentWillReceiveProps(nextProps) {
    let isEdit = nextProps.todo.text.length > 0;
    this.setState({isEdit: isEdit});

    if (isEdit === false) {
      return;
    }
    if (this.text !== nextProps.todo.text) {
      this.text = nextProps.todo.text;
    }
  }

  render() {
    let {isDisabled} = this.state;
    let todoText = this.text;
    // /* <form className={'todo-question'} dbKey='form-question'> */}
    let className = this.stateisEdit ?
                    'todo__question-center' :
                    'todo__question-bottom';
    return (
      <div className={'todo__question ' + className} >
        <TextEdit newTodo={(this.stateisEdit === false)}
                  disabled={isDisabled}
                  text={todoText}
                  placeholder="What should I do?"
                  onChange={::this.handleChangeText}
                  onSave={::this.handleSaveText}/>
        <div className={'todo__confirm-button'} onClick={::this.handleClick}>
          Confirm
        </div>
      </div>
    );
    // </form>
  }

}
