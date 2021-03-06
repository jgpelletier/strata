#!/usr/bin/env node

require('./proof')(4, function (async, assert) {
    var strata = new Strata({ directory: tmp, leafSize: 3, branchSize: 3 })
    async(function () {
        serialize(__dirname + '/fixtures/merge.before.json', tmp, async())
    }, function () {
        strata.open(async())
    }, function () {
        strata.mutator('a', async())
    }, function (cursor) {
        async(function () {
            cursor.remove(cursor.index, async())
        }, function () {
            assert(cursor.index, 0, 'unghostable')
            cursor.unlock(async())
        })
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'b', 'c', 'd' ], 'records')
        strata.balance(async())
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'b', 'c', 'd' ], 'merged')
        vivify(tmp, async())
        load(__dirname + '/fixtures/left-most-unghostable.after.json', async())
    }, function (actual, expected) {
        assert.say(expected)
        assert.say(actual)

        assert(actual, expected, 'after')
        strata.close(async())
    })
})
