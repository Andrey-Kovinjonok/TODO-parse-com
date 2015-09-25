import parseCom from './../ParseComAPI/api.js'

export const SIGN_IN = 'SIGN_IN';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function signIn(user) {
  return {
    type: SIGN_IN,
    promise: parseCom.API(user),
    onSuccess: ()=>({ user: user.username })
  };
}
