import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import DropdownConfigurationReducer from "./dropdown-configuration/DropdownConfigurationReducer";
import faqsCategoriesReducer from "./faqs-category/faqsCategoryReducer";
import metaDataReducer from "./meta-data/metaDataReducer";

export default combineReducers({
  metaData: metaDataReducer,
  login: authReducer,
  dropdownData: DropdownConfigurationReducer,
  faqsCategories: faqsCategoriesReducer,
});
