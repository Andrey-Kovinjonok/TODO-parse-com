import React, { Component, PropTypes }from 'react';


import * as todoActions from './../redux/TodoActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
  state => ({ todos: state.todos }),
  dispatch => bindActionCreators(todoActions, dispatch)
)
export default class TodoItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    setEditItem: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    todoData: PropTypes.object.isRequired,
    listIndex: PropTypes.number.isRequired
  }

  removeItem() {
    const { deleteTodo } = this.props;
    deleteTodo(this.props.todoData);
  }

  editItem() {
    const { setEditTodo } = this.props;
    setEditTodo(this.props.todoData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
  }

  render() {
    let { todoData, listIndex } = this.props;
    let { disabled } = this.state;
    let removeButtonClass = disabled ?
                            'todo__remove-button--disabled' :
                            'todo__remove-button';
    let todoTextClass = disabled ?
                        'todo__text--disabled' :
                        'todo__text';

    return (
      <div className={'todo__list-item'}>
        <div className={removeButtonClass}
             onClick={::this.removeItem}>
          X
        </div>
        <div className={todoTextClass}
             onClick={::this.editItem}>
          {listIndex + 1 + '. ' + todoData.text}
        </div>
      </div>
    );
  }
}
