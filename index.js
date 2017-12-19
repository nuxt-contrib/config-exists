'use strict'

const exists = require('./lib/exists')
const existsAsync = require('./lib/existsAsync')

module.exports = function (options) {
  return {
    exists: exists(options),
    existsAsync: existsAsync(options)
  }
}
