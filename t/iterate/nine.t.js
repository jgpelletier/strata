#!/usr/bin/env node

require('./proof')(4, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/nine.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        strata.iterator('a', async())
    }, function (cursor) {
        assert(cursor.index, 0, 'index')
        assert(cursor.offset, 0, 'offset')
        assert(cursor.length, 3, 'length')
        cursor.unlock(async())
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ], 'records')
    }, function() {
        strata.close(async())
    })
})
