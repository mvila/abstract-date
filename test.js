'use strict';

import { assert } from 'chai';
import AbstractDate from './src';

describe('AbstractDate', function() {
  describe('constructor', function() {
    it('should accept strings', function() {
      let date = new AbstractDate('2015-12-01 01:23:45.678');
      assert.equal(date.toString(), '2015-12-01 01:23:45.678');
    });

    it('should accept ISO strings', function() {
      let date = new AbstractDate('2015-12-01T01:23:45.678Z');
      assert.equal(date.toString(), '2015-12-01 01:23:45.678');
    });

    it('should throw an error with invalid string', function() {
      assert.throw(function() {
        let date = new AbstractDate('2015-12'); // eslint-disable-line no-unused-vars
      });
    });

    it('should throw an error with invalid string date', function() {
      assert.throw(function() {
        let date = new AbstractDate('2015-12-01 01:23:99.000'); // eslint-disable-line no-unused-vars
      });
    });

    it('should accept date', function() {
      let date = new AbstractDate(new Date('2015-12-01T01:23:45.678Z'));
      assert.equal(date.toString(), '2015-12-01 01:23:45.678');
    });

    it('should throw an error with invalid date', function() {
      assert.throw(function() {
        let date = new AbstractDate(new Date('2015-12-01T01:23:99.000Z')); // eslint-disable-line no-unused-vars
      });
    });

    it('should throw an error for invalid type', function() {
      assert.throw(function() {
        let date = new AbstractDate(undefined); // eslint-disable-line no-unused-vars
      });

      assert.throw(function() {
        let date = new AbstractDate(false); // eslint-disable-line no-unused-vars
      });

      assert.throw(function() {
        let date = new AbstractDate(1); // eslint-disable-line no-unused-vars
      });

      assert.throw(function() {
        let date = new AbstractDate({}); // eslint-disable-line no-unused-vars
      });
    });
  });

  describe('toDate()', function() {
    it('should return a Date instance', function() {
      let abstractDate = new AbstractDate('2015-12-01 01:23:45.678');
      let date = abstractDate.toDate();
      assert.instanceOf(date, Date);
      assert.equal(date.toISOString(), '2015-12-01T01:23:45.678Z');
    });
  });

  describe('toString() and toJSON()', function() {
    it('should return a string', function() {
      let abstractDate = new AbstractDate('2015-12-01 01:23:45.678');
      let str = abstractDate.toString();
      assert.equal(typeof str, 'string');
      assert.equal(str, '2015-12-01 01:23:45.678');
      let json = abstractDate.toJSON();
      assert.equal(typeof json, 'string');
      assert.equal(json, '2015-12-01 01:23:45.678');
    });
  });
});
