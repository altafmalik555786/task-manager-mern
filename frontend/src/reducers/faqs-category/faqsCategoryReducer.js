import { ALL_FAQS_CATEGORIES } from "actions/faqs-category/faqsCatepgryAction";

const initialState = {
  faqsCategories: [],
};

export default function faqsCategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_FAQS_CATEGORIES:
      return {
        ...state,
        faqsCategories: action.payload,
      };
      break;

    default:
      return state;
  }
}
