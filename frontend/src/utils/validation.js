// import { validateInRange } from 'utils';
import { CommonMessages } from './messages';

import moment from 'moment';

export const ValidationRules = {
  email: [
    {
      required: true,
      type: 'email',
      message: 'Please provide valid Email',
    },
  ],
  mobile: [
    {
      required: true,
      type: 'string',
      pattern: '^[0-9*#+]+$',
      message: 'Please provide valid mobile number',
    },
  ],
  password: [
    {
      required: true,
      whitespace: true,
      message: 'Please provide a valid password',
    },
    {
      min: 8,
      message: 'Password should have atleast 8 Characters',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please confirm your password',
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('Passwords do not match');
      },
    }),
  ],
  required: [
    {
      required: true,
      whitespace: true,
    },
  ],
  positiveNumber: [
    {
      type: 'number',
      min: 0,
    },
  ],
  positiveInteger: [
    {
      pattern: /^\d+$/,
      min: 0,
      message: CommonMessages.validationFailed,
    },
  ],
  year: [
    {
      pattern: /^(19|20)\d{2}$/,
      message: CommonMessages.validationFailed,
    },
    () => ({
      validator(rule, value) {
        if (!value || +value <= new moment().year()) {
          return Promise.resolve();
        }
        return Promise.reject(CommonMessages.validationFailed);
      },
    }),
  ],
  maxLength: (maxLength = 50, required = false, message) => {
    return [
      {
        required,
        message: CommonMessages.validationRequired,
      },
      () => ({
        validator(rule, value) {
          if (!value || value.length <= maxLength) {
            return Promise.resolve();
          }
          return Promise.reject(message || `Length should be less than ${maxLength} characters`);
        },
      }),
    ];
  },
  //   lowerBound: (dependency) => {
  //     return [
  //       ({ getFieldValue }) => ({
  //         validator(rule, value) {
  //           const maxLimit = getFieldValue(dependency) || Infinity;
  //           if (!value || validateInRange(value, 0, maxLimit)) {
  //             return Promise.resolve();
  //           }
  //           return Promise.reject(`Value should be in range ${0} - ${maxLimit}`);
  //         },
  //       }),
  //     ];
  //   },
  //   upperBound: (dependency) => {
  //     return [
  //       ({ getFieldValue }) => ({
  //         validator(rule, value) {
  //           const minLimit = getFieldValue(dependency) || 0;
  //           if (!value || validateInRange(value, minLimit)) {
  //             return Promise.resolve();
  //           }
  //           return Promise.reject(`Value should be in range ${minLimit} - Infinity`);
  //         },
  //       }),
  //     ];
  //   },
};
