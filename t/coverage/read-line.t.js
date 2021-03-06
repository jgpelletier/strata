#!/usr/bin/env node

require('./proof')(2, function (async, assert) {
    var fs = require('fs'), strata
    async(function () {
        fs.writeFile(tmp + '/0.0', '6 x_x\n', 'utf8', async())
    }, function () {
        strata = new Strata({ directory: tmp })
        strata.open(async())
    }, [function () {
        strata.iterator('a', async())
    }, function (error) {
        assert(error.message, 'corrupt line: could not find end of line header', 'cannot find header')
    }], function () {
        fs.writeFile(tmp + '/0.0', '6 x 0\n', 'utf8', async())
    }, function () {
        strata = new Strata({ directory: tmp })
        strata.open(async())
    }, [function () {
        strata.iterator('a', async())
    }, function (error) {
        assert(error.message, 'corrupt line: invalid checksum', 'invalid checksum')
    }])
})
