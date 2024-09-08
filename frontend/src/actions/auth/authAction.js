export const SET_USER_INFO = "SET_USER_INFO";

export const _setLoginUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      payload: data,
    });
  };
};
