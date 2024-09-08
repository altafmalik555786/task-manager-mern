export const GET_DROPDOWN_CONFIGURATIONS = "GET_DROPDOWN_CONFIGURATIONS";
export const ADD_DROPDOWN_CONFIGURATIONS = "ADD_DROPDOWN_CONFIGURATIONS";
export const UPDATE_DROPDOWN_CONFIGURATIONS = "UPDATE_DROPDOWN_CONFIGURATIONS";
export const DELETE_DROPDOWN_CONFIGURATION = "DELETE_DROPDOWN_CONFIGURATION";

const getDropdownConfiguration = (data) => {
  return {
    type: GET_DROPDOWN_CONFIGURATIONS,
    payload: data,
  };
};
const addDropdownConfiguration = (data) => {
  return {
    type: ADD_DROPDOWN_CONFIGURATIONS,
    payload: data,
  };
};
const updateDropdownConfiguration = (data) => {
  return {
    type: UPDATE_DROPDOWN_CONFIGURATIONS,
    payload: data,
  };
};
const deleteDropdownConfiguration = (data) => {
  return {
    type: DELETE_DROPDOWN_CONFIGURATION,
    payload: data,
  };
};

export const getDropdownConfigurationAction = (data) => {
  return (dispatch) => {
    dispatch(getDropdownConfiguration(data));
  };
};
export const addDropdownConfigurationAction = (data) => {
  return (dispatch) => {
    dispatch(addDropdownConfiguration(data));
  };
};
export const updateDropdownConfigurationAction = (data) => {
  return (dispatch) => {
    dispatch(updateDropdownConfiguration(data));
  };
};
export const deleteDropdownConfigurationAction = (data) => {
  return (dispatch) => {
    dispatch(deleteDropdownConfiguration(data));
  };
};
