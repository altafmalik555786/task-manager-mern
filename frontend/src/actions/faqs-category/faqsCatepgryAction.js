export const ALL_FAQS_CATEGORIES = "ALL_FAQS_CATEGORIES";

export const _getAllFAQsCategories = (data) => {
  return (dispatch) => {
    dispatch({
      type: ALL_FAQS_CATEGORIES,
      payload: data,
    });
  };
};
