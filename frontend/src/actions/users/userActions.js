import { addUserAPI } from "apis/user-apis/user-api";
import { editUserAPI } from "apis/user-apis/user-api";
import { deleteUserApi } from "apis/user-apis/user-api";
import { searchUsersAPI } from "apis/user-apis/user-api";
import { getCashiersAPI } from "apis/user-apis/user-api";
import { getUsersAPI } from "apis/user-apis/user-api";

import { UserActionKey } from "utils/constants";
import { successMessage } from "utils/helpers/helpers";
import { requestErrorHandel } from "utils/helpers/helpers";

export const getUserAction = (page) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.getUsersReq });
    getUsersAPI(page)
      .then((res) => {
        dispatch({
          type: UserActionKey.getUsersSuccess,
          payload: res.data,
        });
      })
      .catch(async (e) => {
        dispatch({ type: UserActionKey.getUsersFailure });
        await requestErrorHandel({ error: e });
      });
  };
};
export const searchUserAction = (search) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.searchUsersReq });
    searchUsersAPI(search)
      .then((res) => {
        dispatch({
          type: UserActionKey.searchUsersSuccess,
          payload: res.data,
        });
      })
      .catch((e) => {
        dispatch({ type: UserActionKey.searchUsersFailure });
        requestErrorHandel({ error: e });
      });
  };
};
export const addUserAction = (item, onSuccess, onFailure) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.addUserReq });
    addUserAPI(item)
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch({ type: UserActionKey.addUserSuccess, payload: item });
          onSuccess && onSuccess();
          successMessage({ message: res.data?.message || "User Added" });
        } else throw res.data;
      })
      .catch(async (e) => {
        onFailure && onFailure();
        dispatch({ type: UserActionKey.addUserFailure });
        await requestErrorHandel({ error: e });
      });
  };
};
export const updateUserAction = (item, onSuccess, onFailure) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.editUserReq });
    editUserAPI(item)
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch({
            type: UserActionKey.editUserSuccess,
            payload: res.data.data,
          });
          onSuccess && onSuccess();
          successMessage({ message: res.data?.message || "User Updated" });
        } else throw res.data;
      })
      .catch(async (e) => {
        dispatch({ type: UserActionKey.editUserFailure });
        await requestErrorHandel({ error: e });
        onFailure && onFailure();
      });
  };
};
export const deleteUserAction = (id) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.deleteUserReq });
    deleteUserApi(id)
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch({ type: UserActionKey.deleteUserSuccess, payload: id });
          successMessage({ message: res.data?.message || "User Deleted" });
        } else throw res.data;
      })
      .catch(async (e) => {
        dispatch({ type: UserActionKey.deleteUserFailure });
        await requestErrorHandel({ error: e });
      });
  };
};

export const getCashierAction = (page, cashierParams) => {
  return (dispatch) => {
    dispatch({ type: UserActionKey.getCashiersReq });
    getCashiersAPI()
      .then((res) => {
        dispatch({
          type: UserActionKey.getCashiersSuccess,
          payload: res.data.data,
        });
      })
      .catch(async (e) => {
        dispatch({ type: UserActionKey.getCashiersFailure });
        await requestErrorHandel({ error: e });
      });
  };
};
