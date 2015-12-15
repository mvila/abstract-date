'use strict';

const VALID_STRING = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ?$/;

export class AbstractDate {
  constructor(value) {
    if (typeof value === 'string') {
      if (!VALID_STRING.test(value)) {
        throw new Error('Invalid string passed to AbstractDate constructor');
      }
      if (value.slice(-1) === 'Z') value = value.slice(0, -1);
      let date = stringToDate(value);
      if (isNaN(date.valueOf())) {
        throw new Error('Invalid string passed to AbstractDate constructor');
      }
      this.value = value;
    } else if (typeof value === 'number') {
      value = new Date(value);
      value = dateToString(value);
      this.value = value;
    } else if (value instanceof Date) {
      if (isNaN(value.valueOf())) {
        throw new Error('Invalid date passed to AbstractDate constructor');
      }
      value = dateToString(value);
      this.value = value;
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

  valueOf() { // allows comparisons with Date instances
    return this.toDate().valueOf();
  }
}

function stringToDate(str) {
  return new Date(str + 'Z');
}

function dateToString(date) {
  let str = date.toISOString();
  str = str.slice(0, -1); // remove the 'Z' time zone
  return str;
}

export default AbstractDate;
