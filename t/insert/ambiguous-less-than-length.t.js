#!/usr/bin/env node

require('./proof')(3, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/ambiguous.before.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'a', 'd', 'f', 'g', 'h', 'i', 'l', 'm', 'n' ], 'records')
    }, function () {
        strata.mutator('d', async())
    }, function (cursor) {
        async(function () {
            cursor.indexOf('e', async())
        }, function (index) {
            assert(index <= cursor.length, 'unambiguous')
            cursor.insert('e', 'e', ~index, async())
        }, function () {
            cursor.unlock(async())
        }, function () {
            gather(strata, async())
        })
    }, function (records) {
        assert(records, [ 'a', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'm', 'n' ], 'records after insert')
    }, function() {
        strata.close(async())
    })
})
