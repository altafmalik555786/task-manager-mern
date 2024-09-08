import * as React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";
import LoginForm from "views/Login";
import _ from "lodash";

export const requestErrorHandel = async ({ error }) => {
  console.log("error", error)
  const { status, data } = error?.response
  console.log("status", status, "data", data)

  if (data.success) {
    NotificationManager.error(data.message)
  }
  if (error?.response?.status === 401) {
    NotificationManager.error(
      error?.response?.data?.message ?? "Internal Server Errror"
    );
    setTimeout(() => {
      localStorage.clear();
      // window.location.href = "/";
    }, 500);
    return;
  } else if (error?.response?.data?.statusCode === 422) {
    if (error?.response?.data?.errors?.message?.length > 0) {
      NotificationManager.error(
        error?.response?.data?.errors?.message ?? "Internal Server Errror"
      );
    } else if (data?.statusCode === 422) {
      NotificationManager.error(
        Object.values(error?.response?.data?.errors)[0]
      )
    } else {
      NotificationManager.error(
        error?.response?.data?.message ?? "Internal Server Errror"
      );
    }
  } else if (!navigator.onLine) {
    NotificationManager.info(
      "No internet connection, Please check your internet"
    );
  } else {
    return NotificationManager.error(
      error?.response?.data?.message ?? "Internal Server Errror"
    );
  }
};

export const successMessage = ({ message }) => {
  return NotificationManager.success(message);
};

export const infoMessage = (info) => {
  return NotificationManager.info(info);
};

export const showValidationError = (errorMsg) => {
  const debounceAlert = _.debounce(
    () => NotificationManager.error(errorMsg),
    800
  );
  debounceAlert();
};

export const formateDateWithMoment = (date, formate = "DD-MM-YYYY") => {
  return moment(date).format(formate);
};

export const Capitalize = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const removeUndercore = (value) => {
  return value.replace(/_/g, " ");
};

export const convertToTitleCase = (value) => {
  return value.replace(/_/g, " ").toUpperCase();
};

export const renderLoader = (
  <LoadingOutlined
    style={{ fontSize: 45, textAlign: "center", alignSelf: "center" }}
  />
);

export const renderNoDataPlaceholder = (isLoading, msg, icon) => (
  <div
    style={{
      minHeight: "50vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {icon && icon}
    <br />
    {isLoading ? <></> : msg ? msg : <h4>No Data Found</h4>}
  </div>
);

export const validateSelectedFile = async (file) => {
  const MAX_FILE_SIZE = 5120; // 5MB
  const fileSizeKiloBytes = file.size / 1024;
  const { width, height } = await getImageDimensions(file);

  if (width < 500 || height < 350) {
    NotificationManager.error("Minimum dimension for image 500x350");
    return false;
  }

  if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    NotificationManager.error("File size is greater than 5MB");
    return false;
  }
  return true;
};


export const getImageDimensions = (file) => {
  var _URL = window.URL || window.webkitURL;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        width: img.width,
        height: img.height,
      });
    img.onerror = (error) => reject(error);
    img.src = _URL.createObjectURL(file);
  });
};

export const validateSelectedVideoFile = async (file) => {
  const MAX_FILE_SIZE = 256000; // 50MB
  const fileSizeKiloBytes = file.size / 1024;
  const duration = await getVideoDuration(file);

  if (duration.toFixed(0) > 60) {
    NotificationManager.error("Video must be shorter than 60 seconds");
    return false;
  }

  if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    NotificationManager.error("File size is greater than 50MB");
    return false;
  }
  return true;
};

export const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });


const uploadFileToAWS = async (
  singedUrl,
  file,
  mimeType,
  isDocument = false
) => {
  try {
    const requestObject = {
      method: "PUT",

      body: file,
    };
    if (!isDocument) {
      requestObject.headers = {
        "Content-Type": mimeType,
      };
    }
    const awsresposne = await fetch(singedUrl, requestObject);
    return awsresposne;
  } catch (error) {
    console.log("error in aws uplaod", error);
  }
};

export const isVideoFiles = (file) => {
  if (file) {
    const path = file?.url?.type
      ? file?.url?.type.split("/")
      : file?.file.split(".");
    const mimeType = path[path.length - 1];
    return (
      [
        "webm",
        "mpg",
        "mp2",
        "mpeg",
        "mpe",
        "mpv",
        "ogg",
        "mp4",
        "m4p",
        "m4v",
        "avi",
        "wmv",
        "mov",
        "qt",
        "flv",
        "swf",
        "avchd",
      ].indexOf(mimeType.toLowerCase()) > -1
    );
  }
};


export const loginRedirect = (props) => {
  const token = localStorage.getItem("userToken");
  return token ? (
    <Redirect to={"/admin/tasks"} />
  ) : (
    <LoginForm {...props} />
  );
};

export const stringifyNumber = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
