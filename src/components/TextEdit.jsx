import React, { Component, PropTypes } from 'react';
//import classnames from 'classnames';

export default class TextEdit extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    onChange: PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    //editing: PropTypes.bool,
    newTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which !== 13) {
      return;
    }

    if (this.props.onSave) {
      this.props.onSave(text);
    }
    if (this.props.newTodo) {
      this.setState({ text: '' });
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }

  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.text !== nextProps.text) {
      this.setState({text: nextProps.text});
    }
  }

  render() {
    /*const inputClass = classnames({ 'edit': this.props.editing,
                                    'todo-edit': this.props.newTodo});*/
    return (
      <input className={'todo-edit'}
             type='text'
             placeholder={this.props.placeholder}
             autoFocus='true'
             value={this.state.text}
             onBlur={::this.handleBlur}
             onChange={::this.handleChange}
             onKeyDown={::this.handleSubmit} />
    );
  }
}
