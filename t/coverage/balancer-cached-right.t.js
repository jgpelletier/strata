#!/usr/bin/env node

require('./proof')(2, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/balancer-cached-right.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        strata.mutator('e', async())
    }, function (cursor) {
        async(function () {
            cursor.insert('e', 'e', ~ cursor.index, async())
        }, function () {
            cursor.unlock(async())
        })
    }, function () {
        strata.mutator('a', async())
    }, function (cursor) {
        async(function () {
            cursor.remove(cursor.index, async())
        }, function () {
            cursor.unlock(async())
        })
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [  'b', 'c', 'd',  'e' ], 'records')
        strata.balance(async())
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [  'b', 'c', 'd',  'e' ], 'merged')
    }, function() {
        strata.close(async())
    })
})
