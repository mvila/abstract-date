'use strict';

const VALID_STRING = /^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d$/;
const VALID_ISO_STRING = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ/;

export class AbstractDate {
  constructor(value) {
    if (typeof value === 'string') {
      if (VALID_STRING.test(value)) {
        // NOOP
      } else if (VALID_ISO_STRING.test(value)) {
        value = value.slice(0, 10) + ' ' + value.slice(11, 23);
      } else {
        throw new Error('Invalid string passed to AbstractDate constructor');
      }
      let date = stringToDate(value);
      if (isNaN(date.valueOf())) {
        throw new Error('Invalid string date passed to AbstractDate constructor');
      }
      this.value = value;
    } else if (value instanceof Date) {
      if (isNaN(value.valueOf())) {
        throw new Error('Invalid date passed to AbstractDate constructor');
      }
      this.value = dateToString(value);
    } else {
      throw new Error('Invalid type passed to AbstractDate constructor');
    }
  }

  toDate() {
    return stringToDate(this.value);
  }

  toString() {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}

function stringToDate(str) {
  str = str.slice(0, 10) + 'T' + str.slice(11, 23) + 'Z';
  return new Date(str);
}

function dateToString(date) {
  let str = date.toISOString();
  str = str.slice(0, 10) + ' ' + str.slice(11, 23);
  return str;
}

export default AbstractDate;
