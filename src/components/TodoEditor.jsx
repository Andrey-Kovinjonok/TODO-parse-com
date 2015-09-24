import React, { Component, PropTypes } from 'react';

import TextEdit from './TextEdit.jsx';

//import StoreExports from './../stores/TodoStore.jsx';
//let { TodoStore, Actions } = StoreExports;

export default class TodoEditor extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('constructor TodoEditor', props, context);

    this.text = this.props.todo.text;
    this.state = {
      isEdit: this.props.todo.dbKey !== -1
    };
  }

  static propTypes = {
    //isEdit: React.PropTypes.bool.isRequired
    actions: PropTypes.func.isRequired,
    todo: PropTypes.object
  }

  handleChangeText(text){
    if (text.length !== 0) {
      this.text = text;
    }
  }

  handleSaveText(text) {
    if (text.length !== 0) {
      if (this.state.isEdit) {
        let todo = {
          //index: this.props.todo.index,
          //dbKey: this.props.todo.dbKey,
          ...this.props.todo,
          text: text
        };
        //this.props.editHandler(dbKey, todo);
      } else {
        this.props.actions.createTodo(text);
      }
      this.text = '';
    }
  }

  handleClick() {
    const currText = this.text;
    this.handleSaveText(currText);
  }

  componentWillReceiveProps(nextProps) {
    let isEdit = nextProps.todo.dbKey !== -1;
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
                    'todo-question-center' :
                    'todo-question-bottom';
    return (
      <div className={'todo-question ' + className} >
        <TextEdit newTodo={(this.stateisEdit === false)}
                  disabled={isDisabled}
                  text={todoText}
                  placeholder="What should I do?"
                  onChange={::this.handleChangeText}
                  onSave={::this.handleSaveText}/>
        <div className={'add-todo-button'} onClick={::this.handleClick}>
          Confirm
        </div>
      </div>
    );
    // </form>
  }

}
