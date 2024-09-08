import { EMPTY_NULL_DATA } from "utils/constants/const";
import moment from "moment";
import { statusConditionalColors } from "utils/constants";

export const addDebounce = (fn, delay) => {
  let timer;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
};

export const setRules = (title, arrayOfRules = []) => {
  return [
    {
      required: true,
      message: `${title} is required`,
    },
    ...arrayOfRules
  ];
};

export const sortCol = (a, b, dataIndex) => {
  if (a[dataIndex]?.length > 0 && b[dataIndex]?.length > 0) {
    return a[dataIndex].length - b[dataIndex].length;
  } else {
    return null;
  }
};

export const renderItemDataOrEmptyNull = (text, fixedDigits) => {
  if (text) {
    if (typeof text === "number") {
      if (typeof fixedDigits === "number") {
        return numberWithCommas(text?.toFixed(fixedDigits));
      } else {
        return numberWithCommas(text);
      }
    } else {
      return text;
    }
  } else {
    if (text === 0) {
      return 0;
    } else {
      return EMPTY_NULL_DATA;
    }
  }
};

export function numberWithCommas(value) {
  if (
    value === "NaN" ||
    Number.isNaN(value) ||
    value === "" ||
    value === undefined
  ) {
    return "";
  } else {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const copyToClipboard = (text) => {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export const scrollToElement = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export const formatDate = (dateInput, format = "DD-MM-YYYY") => {
  const date = moment(dateInput).format(format); // Current date and time
  return date;
};


export const getTimeFromOperationsWithDays = (
  firstTime,
  lastTime,
  Operation = "-"
) => {
  let timeOperated = "";
  const startTime = new Date(firstTime);
  const endTime = new Date(lastTime);

  switch (Operation) {
    case "+":
      timeOperated = startTime + endTime;
      break;
    case "-":
      timeOperated = startTime - endTime;

      break;
    case "*": {
      timeOperated = startTime * endTime;
      break;
    }
    case "/":
      timeOperated = startTime / endTime;
      break;
    default:
      timeOperated = new Date();
  }

  return convertMillisecondsToDigitalTime(timeOperated);
};

export const convertMillisecondsToDigitalTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return `${days} days ${hours}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

export const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const goBack = (res = null, props) => {
  if (res?.data?.statusCode) {
    props.history.goBack();
  } else if (res === null) {
    props.history.goBack();
  }
};

export const findGrade = (grade) => {
  switch (grade) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    case "D":
      return 4;
    case "1":
      return "A";
    case "2":
      return "B";
    case "3":
      return "C";
    case "4":
      return "D";
    default:
      break;
  }
};

export const findAuctionTranslationObj = (arr, languageKey = "en") => {
  return arr.find((item) => item.languageCode === languageKey);
};

export const sortArrCompareMaxValues = (a, b, key = "value") => {
  return b[key] - a[key];
};

export const getTimeFromdateString = (dateString) => {
  // Convert the date string to a Date object
  const dateObj = new Date(dateString);

  // Extract the time from the Date object
  return dateObj.toTimeString().slice(0, 8);
};

export const findDataOnStatus = (status) => {
  switch (status) {
    case "B-0001":
      return "Open";
    case "B-0002":
      return "Won (Not Paid)";
    case "B-0003":
      return "Won (Paid)";
    case "B-0004":
      return "Lost (Out Bid)";
    default:
      return EMPTY_NULL_DATA;
  }

  // B-0001 highest
  // B-0002 won but not paid
  // B-0003 won and also paid
  // B-0004 Lost (Out Bid)
  // B-0005 lost the bid
};

export const renderStatusColor = (status) => {
  if (status === "") {
    return null;
  }
  if (status === "B-0001" || status === "Open" || status === "open") {
    return statusConditionalColors?.statusOpenColor;
  } else if (status === "B-0002") {
    return statusConditionalColors.statusWonNotPaidColor;
  } else if (status === "B-0003" || status === "won" || status === "Won") {
    return statusConditionalColors.statusWonColor;
  } else if (
    status === "B-0005" ||
    status === "B-0004" ||
    status === "lost" ||
    status === "Lost"
  ) {
    return statusConditionalColors.statusLostColor;
  } else if (status === "cancelled" || status === "Cancelled") {
    return statusConditionalColors.stautsCancelledColor;
  } else if (
    status === "declined" ||
    status === "Declined" ||
    status === "decline" ||
    status === "Decline"
  ) {
    return statusConditionalColors.statusDeclineColor;
  } else if (
    status === "approved" ||
    status === "Approved" ||
    status === "approve" ||
    status === "Approve"
  ) {
    return statusConditionalColors.statusApproveColor;
  } else return "";
};

export const renderStatusBackgroundColor = (status) => {
  if (status === "") {
    return null;
  }
  if (status === "B-0001" || status === "Open" || status === "open") {
    return statusConditionalColors?.statusOpenBgColor;
  } else if (status === "B-0002") {
    return statusConditionalColors.statusWonNotPaidBgColor;
  } else if (status === "B-0003" || status === "won" || status === "Won") {
    return statusConditionalColors.statusWonBgColor;
  } else if (
    status === "B-0005" ||
    status === "B-0004" ||
    status === "lost" ||
    status === "Lost"
  ) {
    return statusConditionalColors.statusLostBgColor;
  } else if (status === "cancelled" || status === "Cancelled") {
    return statusConditionalColors.stautsCancelledBgColor;
  } else if (
    status === "declined" ||
    status === "Declined" ||
    status === "decline" ||
    status === "Decline"
  ) {
    return statusConditionalColors.statusDeclineBgColor;
  } else if (
    status === "approved" ||
    status === "Approved" ||
    status === "approve" ||
    status === "Approve"
  ) {
    return statusConditionalColors.statusApproveBgColor;
  } else return "";
};

export const getTimeAMPMFromDate = (datePara) => {
  const date = new Date(datePara);

  // Get hours and minutes

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Create the final time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  return formattedTime;
};

export const excelSerialToJSDate = (serial) => {
  const utcDays = Math.floor(serial - 25569); // Adjust for Excel's date epoch (January 1, 1970)
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const milliseconds = utcDays * millisecondsPerDay;
  const date = new Date(milliseconds);
  return date;
};

export const findFileExtension = (url) => {
  // Get the portion of the URL after the last dot (.)
  const parts = url.split(".");

  if (parts.length > 1) {
    // The extension is the last part of the URL
    return parts[parts.length - 1];
  } else {
    // If there's no dot in the URL, return an empty string or handle it as needed
    return "";
  }
};

export const onChangeCustomDebounce = (
  delay = 2000,
  setCheck = "Set Bolean state",
  value = "Here you need to pass value of the onChange like e.target.value",
  eventStateValue = "Your state value which you have to setState(e.target.value)"
) => {
  setTimeout(() => {
    setCheck(true);
  }, delay);
  if (eventStateValue?.length > value?.length) {
    setCheck(false);
  }
  if (eventStateValue.length + 1 === value.length) {
    setCheck(false);
  }
  // Note:
  // Use this check settled by
  // setCheck state === true
  // then call the function using it to as dependency.
};

export const defaultValueDate = moment(new Date());

