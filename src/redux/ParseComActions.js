import parseCom from './../ParseComAPI/api.js';

export const ADD_USERS = 'ADD_USERS';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function signUp(user) {
  return {
    type: ADD_USERS,
    promise: parseCom.API.signUp(user),
    onSuccess: () => ({ users: [user.attributes.username] })

  };
}

export function getUsers() {
  return {
    type: ADD_USERS,
    promise: parseCom.API.getUsers(),
    onSuccess: (result)=> {
      console.log(result);
      return { users: result };
    },
    onFail: (err) => {
      console.log(err);
      return err;
    }
  };
}

export function login(user) {
  return {
    type: LOG_IN,
    promise: parseCom.API.login(user.username, user.password),
    onSuccess: (result)=>({
      userData: {
        ...result.attributes
      }
    }),
    onFail: (err) => {
      console.log('Autentification error: ', err);
      return err;
    }
  };
}

export function logout(sessionToken) {
  return {
    type: LOG_OUT,
    promise: parseCom.API.logout(sessionToken),
    onSuccess: () => ({

    }),
    onFail: (err) => {
      console.log('Autentification error: ', err);
      return err;
    }
  };
}
