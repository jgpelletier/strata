#!/usr/bin/env node

require('./proof')(1, function (async, assert) {
    var strata
    async(function () {
        serialize(__dirname + '/fixtures/get.json', tmp, async())
    }, function () {
        strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
        strata.open(async())
    }, function () {
        strata.iterator(strata.key('a'), async())
    }, function (cursor) {
        assert(cursor.get(cursor.offset).record, 'a', 'got')
        cursor.unlock(async())
    }, function () {
        strata.close(async())
    })
})
