
require('./../styles/login.styl');

import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import parseComActions from './../redux/ParseComActions.js';

@connect(
  state => ({ users: state.users }),
  dispatch => bindActionCreators(parseComActions, dispatch)
)
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUnknownUser: true
    };
  }

  static propTypes = {
    user: PropTypes.object
  }

  /*static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }*/

  handleSubmit(event) {
    event.preventDefault();
    // need for getDOMNode() call going away in React 0.14
    //const input = this.refs.username.getDOMNode();
    //this.props.login(input.value);
    //input.value = '';
  }

  handleInputUser(event) {
    event.preventDefault();
    let { dispatch, users } = this.props;
    let nameOfUser = event.target.value;
    let filteredUsers = users.filter(user => (user === nameOfUser));
    if (filteredUser.length === 0) {
      this.setState({ isUnknownUser: true });
    } else {
      this.setState({ isUnknownUser: false });
    }
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className={ styles.login + ' container' }>

        <h1>Login</h1>

        { !user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text"
                   placeholder="username"
                   onChange={::this.handleInputUser} />
            <button className="btn" onClick={::this.handleSubmit}>
              Sign Up
            </button>

            <button className="btn" onClick={::this.handleSubmit}>
              Log In
            </button>

          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }

        { user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
