const { response } = require('express');
const { ERROR_INVALID_ID, ERROR_RECORD_NOT_FOUND, ERROR_SERVER_ERROR, CON_IDENTITY } = require('../../const');
const { statusCodes } = require('../../json');
const { sendFailureResponse } = require('../emitters/event-creator');

const handleCatchedError = ({
  error,
  at = "at position is not defined",
  res = null,
  status = 500,
  message = "Server error! Something went wrong."
}) => {
  // console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  console.log(" ////////////////////////// handleCatchedError Start /////////////////////////// ")
  console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  // console.log(" /////////////////////////////////////////////////////////////////////////////// ")

  console.log(" -----------------> [At]:", at, "[Error]: ", error);

  if (![ERROR_INVALID_ID, ERROR_RECORD_NOT_FOUND, ERROR_SERVER_ERROR]?.includes(error?.message)) {
    if (res) {
      sendFailureResponse({ res, status, message })
    }
  }

  // console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  console.log(" ////////////////////////// handleCatchedError End ///////////////////////////// ")
  console.log(" /////////////////////////////////////////////////////////////////////////////// ")
  // console.log(" /////////////////////////////////////////////////////////////////////////////// ")
};

const toCapitalCase = (string) => {
  return string?.charAt(0).toUpperCase() + string.slice(1)
}

const compareObjectsDeepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

const findIntersectionObjects = (obj1, obj2) => {
  const result = {};
  const deepIntersection = (source, target, currentKey = '') => {
    for (const key in source) {
      const newKey = currentKey ? `${currentKey}.${key}` : key;
      if (target.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && typeof target[key] === 'object') {
          result[newKey] = {};
          deepIntersection(source[key], target[key], newKey);
        } else if (source[key] === target[key]) {
          result[newKey] = source[key];
        }
      }
    }
  };
  deepIntersection(obj1, obj2);
  return result;
};

const getToken = (req) => {
  return req.headers.authorization.split(' ')[1]
}

const convertVartoString = (paramObj, index = 0) => {
  return Object.keys(paramObj)[0]
}

const uniqueIdTimeStamp = () => {
    const timestamp = Date.now(); 
    const randomComponent = Math.floor(Math.random() * 1000000); 
    return `${timestamp}-${randomComponent}`;
}

const findStatusOnMsg = ({ message = "", data = null }) => {
  var getCode = null

  switch (true) {
    case statusCodes[200].msgIncludes.some(item => message?.includes(item)):
      getCode = statusCodes[200]?.status
      if (data && statusCodes[201].msgIncludes.some(item => message?.includes(item))) {
        getCode = statusCodes[201]?.status
      }
      break;

    case statusCodes[201].msgIncludes.some(item => message.includes(item)):
      if (data) {
        getCode = statusCodes[201]?.status
      }
      break;

    case statusCodes[204].msgIncludes.some(item => message.includes(item)):
      getCode = statusCodes[204]?.status
      if (data && statusCodes[202].msgIncludes.some(item => message.includes(item)) ) {
        getCode = statusCodes[202].status
      }
      break;

    case statusCodes[401].msgIncludes.some(item => message.includes(item)):
      getCode = statusCodes[401]?.status
      break;

    case statusCodes[403].msgIncludes.some(item => message.includes(item)):
      getCode = statusCodes[403]?.status
      break;

    case statusCodes[404].msgIncludes.some(item => message.includes(item)):
      getCode = statusCodes[404].status
      break;

    default:
      break;
  }

  return getCode
}

module.exports = {
  handleCatchedError,
  compareObjectsDeepEqual,
  toCapitalCase,
  findIntersectionObjects,
  getToken,
  convertVartoString,
  findStatusOnMsg,
  uniqueIdTimeStamp,
};
