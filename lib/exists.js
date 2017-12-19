'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function exists ({
  name,
  rcExtensions = true
}) {
  const rootDir = process.cwd()

  function getDirectory (searchPath) {
    try {
      const stats = fs.statSync(searchPath)
      return stats.isDirectory() ? searchPath : path.dirname(searchPath)
    } catch (err) {
      return path.dirname(searchPath)
    }
  }

  function getFile (searchPath) {
    try {
      const stats = fs.statSync(searchPath)
      return stats.isFile() ? Object.assign(stats, {fileName: path.basename(searchPath)}) : false
    } catch (err) {
      return false
    }
  }

  function search (directory) {
    const jsName = `${name}.config.js`
    let stats = getFile(path.join(directory, jsName))
    if (stats === false && rcExtensions) {
      const rcName = `.${name}rc`
      const extensions = ['', '.js', '.json', '.yml', '.yaml']
      for (const ext of extensions) {
        stats = getFile(path.join(directory, `${rcName}${ext}`))
        if (stats) {
          return stats
        }
      }
      const nextDir = path.dirname(directory)
      return rootDir !== nextDir ? search(nextDir) : false
    } else {
      return stats
    }
  }

  return function (searchPath) {
    const absolutePath = path.resolve(rootDir, searchPath)
    const searchDir = getDirectory(absolutePath)
    return search(searchDir)
  }
}
