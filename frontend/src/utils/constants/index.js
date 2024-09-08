export const constRoute = {
  tasks: '/tasks',
  createTask: "/create-task",
}

export const LOCAL_STORAGE_KEYS = {
  DASHBOARD_TAB: "DASHBOARD_TAB",
};

export const BranchColor = "#007575";

export const MetaDataActionKey = {
  getStagesMetaData: "GET_STAGES_META",
};

export const UserActionKey = {
  getUsersReq: "GET_USER_REQUEST",
  getUsersSuccess: "GET_USER_SUCCESS",
  getUsersFailure: "GET_USER_FAILURE",

  searchUsersReq: "SEARCH_USER_REQUEST",
  searchUsersSuccess: "SEARCH_USER_SUCCESS",
  searchUsersFailure: "SEARCH_USER_FAILURE",

  addUserReq: "ADD_USER_REQUEST",
  addUserSuccess: "ADD_USER_SUCCESS",
  addUserFailure: "ADD_USER_FAILURE",

  editUserReq: "EDIT_USER_REQUEST",
  editUserSuccess: "EDIT_USER_SUCCESS",
  editUserFailure: "EDIT_USER_FAILURE",

  deleteUserReq: "DELETE_USER_REQ",
  deleteUserSuccess: "DELETE_USER_SUCCESS",
  deleteUserFailure: "DELETE_USER_FAILURE",
};

export const UserRoles = {
  superAdmin: "super-admin",
  admin: "admin",
  employee: "employee",
  parent: "parent",
};

// notifcations

export const EnvironmentData = [
  { value: "Test", title: "Test" },
  { value: "Live", title: "Live" },
];
export const LanguageData = [
  {
    value: "English",
    title: "English",
  },
  {
    value: "Arabic",
    title: "Arabic",
  },
];

export const EditorToolbar = [
  "heading",
  "|",
  "bold",
  "italic",
  "link",
  "bulletedList",
  "numberedList",
  "blockQuote",
  "undo",
  "redo",
];
export const PopconfirmProps = {
  placement: "topLeft",
  okText: "Yes",
  cancelText: "No",
};


export const statusConditionalColors = {
  bidStautsBgColorLightBlue: "lightblue",
  bidStautsBgColorLightGreen: "lightgreen",
  bidStautsBgLightRed: "lightcoral",
  bidStautsBgLightYellow: "lightyellow",
  bidStautsBgMuddy: "#8B7355",
  statusWonColor: "#ffffff",
  statusWonBgColor: "#009E60",
  statusLostColor: "#2686C7",
  statusLostBgColor: "#D2042D",
  statusWonNotPaidColor: "#ffffff",
  statusWonNotPaidBgColor: "#FF4433",
  statusApproveColor: "#ffffff",
  statusApproveBgColor: "#5dbea3",
  statusDeclineColor: "#ffffff",
  statusDeclineBgColor: "#EE4B2B",
  statusOpenColor: "#2E8B57",
  statusOpenBgColor: "#9FE2BF",
  statusClosedColor: "#ffffff",
  statusClosedBgColor: "#E0115F",
  stautsCancelledColor: "#ffffff",
  stautsCancelledBgColor: "#a50b5e"

}
