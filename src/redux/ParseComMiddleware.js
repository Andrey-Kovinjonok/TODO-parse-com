
export default store => next => action => {
  if (!action.promise) {
    let actionResult = next(action);
    if (action.postPromise) {
      action.postPromise(store.getState())
      .then(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
    return actionResult;
  } else {
    let { promise, onSuccess, onFail } = action;

    return promise.then(
      (result) => {
        let data = onSuccess(result);
        return next({
          ...action,
          ...data
        });
      },
      onFail || () => {}
    );
  }
};
