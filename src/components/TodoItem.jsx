import React, { Component, PropTypes }from 'react';

export default class TodoItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  static propTypes = {
    actions: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    editItem: PropTypes.func.isRequired,
    todoData: PropTypes.object.isRequired
  }

  removeItem() {
    this.props.actions.deleteTodo(this.props.todoData);
  }

  editItem() {
    //this.props.editItem(this.props.todoData);
    this.props.actions.editTodo(this.props.todoData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
  }

  render() {
    let {text, index} = this.props.todoData;
    let {disabled} = this.state;
    let removeButtonClass = disabled ?
                            'todo-remove-button-disabled' :
                            'todo-remove-button';
    let todoTextClass = disabled ?
                        'todo-text-disabled' :
                        'todo-text';

    return (
      <div className={'todo-list-item'}>
        <div className={removeButtonClass}
             onClick={::this.removeItem}>
          X
        </div>
        <div className={todoTextClass}
             onClick={::this.editItem}>
          {index + 1 + '. ' + text}
        </div>
      </div>
    );
  }
}
