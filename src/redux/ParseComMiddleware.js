
export default store => next => action => {
  if (!action.promise) {
    return next(action);
  } else {
    let { promise, onSuccess, onFail } = action;

    return promise.then(
      onSuccess,
      onFail
    );
  }
};
