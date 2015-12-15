'use strict';

import { assert } from 'chai';
import { cloneDeep } from 'better-clone';
import AbstractDate from './src';

describe('AbstractDate', function() {
  describe('constructor', function() {
    it('should accept strings', function() {
      let date = new AbstractDate('2015-12-01T01:23:45.678');
      assert.equal(date.toString(), '2015-12-01T01:23:45.678');
    });

    it('should accept ISO strings', function() {
      let date = new AbstractDate('2015-12-01T01:23:45.678Z');
      assert.equal(date.toString(), '2015-12-01T01:23:45.678');
    });

    it('should throw an error with invalid string', function() {
      assert.throw(function() {
        let date = new AbstractDate('2015-12'); // eslint-disable-line no-unused-vars
      });
    });

    it('should throw an error with invalid string date', function() {
      assert.throw(function() {
        let date = new AbstractDate('2015-12-01T01:23:99.000'); // eslint-disable-line no-unused-vars
      });
    });

    it('should accept numbers', function() {
      let date = new AbstractDate(1448933025678);
      assert.equal(date.toString(), '2015-12-01T01:23:45.678');
    });

    it('should accept dates', function() {
      let date = new AbstractDate(new Date('2015-12-01T01:23:45.678Z'));
      assert.equal(date.toString(), '2015-12-01T01:23:45.678');
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
        let date = new AbstractDate({}); // eslint-disable-line no-unused-vars
      });
    });
  });

  describe('toDate()', function() {
    it('should return a Date instance', function() {
      let abstractDate = new AbstractDate('2015-12-01T01:23:45.678');
      let date = abstractDate.toDate();
      assert.instanceOf(date, Date);
      assert.equal(date.toISOString(), '2015-12-01T01:23:45.678Z');
    });
  });

  describe('toString() and toJSON()', function() {
    it('should return a string', function() {
      let abstractDate = new AbstractDate('2015-12-01T01:23:45.678');
      let str = abstractDate.toString();
      assert.equal(typeof str, 'string');
      assert.equal(str, '2015-12-01T01:23:45.678');
      let json = abstractDate.toJSON();
      assert.equal(typeof json, 'string');
      assert.equal(json, '2015-12-01T01:23:45.678');
    });
  });

  describe('an instance', function() {
    it('should be comparable to another AbstractDate instance', function() {
      let d1 = new AbstractDate('2015-12-01T00:00:00.000');
      let d2 = new AbstractDate('2015-12-02T00:00:00.000');
      assert(d1 < d2);
      assert(d2 > d1);
      let d3 = new AbstractDate('2015-12-01T00:00:00.000');
      assert(d1 <= d3);
    });

    it('should be comparable to a Date instance', function() {
      let d1 = new AbstractDate('2015-12-01T00:00:00.000');
      let d2 = new Date('2015-12-02T00:00:00.000');
      assert(d1 < d2);
      assert(d2 > d1);
      let d3 = new Date('2015-12-01T00:00:00.000');
      assert(d1 <= d3);
    });
  });

  describe('clone()', function() {
    it('should return an identical abstract date', function() {
      let date1 = new AbstractDate('2015-12-01T01:23:45.678');
      let date2 = date1.clone();
      assert.instanceOf(date2, AbstractDate);
      assert.equal(date2.valueOf(), date1.valueOf());
    });

    it('should be invoked by the better-clone module', function() {
      let event1 = {
        name: 'Party',
        date: new AbstractDate('2015-12-01T01:23:45.678')
      };
      let event2 = cloneDeep(event1);
      assert.instanceOf(event2.date, AbstractDate);
      assert.equal(event2.date.valueOf(), event1.date.valueOf());
    });
  });
});
