import { MetaDataActionKey } from "utils/constants";

export const getStageMetaDataAction = () => {
  return (dispatch) => {
    getApplicationsDataAPI()
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch({
            type: MetaDataActionKey.getStagesMetaData,
            payload: res.data.data,
          });
        }
      })
      .catch((e) => {});
  };
};
