#!/usr/bin/env node

require('./proof')(1, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/empties-pivot.before.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        strata.mutator('ay', async())
    }, function (cursor) {
        async(function () {
            cursor.remove(cursor.index, async())
        }, function () {
            cursor.unlock(async())
        })
    }, function () {
        console.log('before balance')
        strata.balance(async())
    }, function () {
        console.log('after balance')
        vivify(tmp, async())
        load(__dirname + '/fixtures/empties-pivot.after.json', async())
    }, function (actual, expected) {
        assert(actual, expected, 'after')
        strata.close(async())
    })
})
