#!/usr/bin/env node

require('./proof')(3, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/split.before.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'a', 'c', 'd' ], 'records')
    }, function () {
        strata.mutator('a', async())
    }, function (cursor) {
        async(function () {
            cursor.indexOf('c', async())
        }, function (i) {
            cursor.remove(i, async())
        }, function () {
            cursor.unlock(async())
        })
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'a', 'd' ], 'records')

        strata.purge(0)
        assert(strata.size, 0, 'purged')

        strata.close(async())
    })
})
