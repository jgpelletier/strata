#!/usr/bin/env node

require("./proof")(4, function (step, ok, equal, Strata, tmp, deepEqual,
  say, serialize, gather, load, objectify) {
  var strata, purge, count = 0;

  function tracer (type, report, callback) {
    switch (type) {
    case "reference":
      if (++count == 2) {
        ok(report().cache.length > 2, "unpurged");
        strata.purge(0);
        equal(0, report().cache.length, "purged");
      }
      callback();
      break;
    default:
      callback();
    }
  }

  step(function () {

    serialize(__dirname + '/fixtures/tree.before.json', tmp, step());

  }, function () {

    strata = new Strata(tmp, { leafSize: 3, branchSize: 3, tracer: tracer });
    strata.open(step());

  }, function () {

    strata.mutator('h', step());

  }, function (cursor) {

    step(function () {

      cursor.indexOf('h', step());

    }, function (index) {

      cursor.remove(index, step());

    }, function () {

      cursor.indexOf('i', step());

    }, function (index) {

      cursor.remove(index, step());
      cursor.unlock();

    });
  }, function () {

    strata.mutator('e', step());

  }, function (cursor) {

    step(function () {

      cursor.indexOf('e', step());

    }, function (index) {

      cursor.remove(index, step());

    }, function () {

      cursor.indexOf('g', step());

    }, function (index) {

      cursor.remove(index, step());
      cursor.unlock();

    });
  }, function () {

    gather(step, strata);

  }, function (records) {

    deepEqual(records, [ 'a', 'b', 'c', 'd',  'f', 'j', 'k', 'l', 'm', 'n' ], 'records');
    strata.balance(step());

  }, function () {

    objectify(tmp, step());
    load(__dirname + '/fixtures/tree.after.json', step());

  }, function (actual, expected) {

    deepEqual(actual, expected, 'merge');

    strata.close(step());

  });
});