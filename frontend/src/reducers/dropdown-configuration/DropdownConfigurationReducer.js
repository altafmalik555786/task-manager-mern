import {
  UPDATE_DROPDOWN_CONFIGURATIONS,
  DELETE_DROPDOWN_CONFIGURATION,
  ADD_DROPDOWN_CONFIGURATIONS,
  GET_DROPDOWN_CONFIGURATIONS,
} from "actions/dropdown-configuration/DropdownConfigurationActions";

const initialState = {
  dropdowns: [],
};

const updateDropdowns = (payload, allData) => {
  const data = [...allData];
  let index = data.findIndex((el) => el.id === payload.id);
  if (index > -1) {
    data[index] = payload;
  }
  return data;
};

const DropdownConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DROPDOWN_CONFIGURATIONS:
      return {
        // ...state,
        dropdowns: action.payload,
      };
    case ADD_DROPDOWN_CONFIGURATIONS:
      return {
        ...state,
        dropdowns: [...state.dropdowns, action.payload],
      };
    case UPDATE_DROPDOWN_CONFIGURATIONS:
      return {
        ...state,
        dropdowns: updateDropdowns(action.payload, state.dropdowns),
      };
    case DELETE_DROPDOWN_CONFIGURATION:
      return {
        ...state,
        dropdowns: state.dropdowns.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};
export default DropdownConfigurationReducer;
