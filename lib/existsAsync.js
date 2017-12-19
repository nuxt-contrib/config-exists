'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports = function existsAsync ({
  name,
  rcExtensions = true
}) {
  const rootDir = process.cwd()
  const stat = promisify(fs.stat)

  async function getDirectory (searchPath) {
    try {
      const stats = await stat(searchPath)
      return stats.isDirectory() ? searchPath : path.dirname(searchPath)
    } catch (err) {
      return path.dirname(searchPath)
    }
  }

  async function getFile (searchPath) {
    try {
      const stats = await stat(searchPath)
      return stats.isFile() ? Object.assign(stats, {fileName: path.basename(searchPath)}) : false
    } catch (err) {
      return false
    }
  }

  async function search (directory) {
    const jsName = `${name}.config.js`
    let stats = await getFile(path.join(directory, jsName))
    if (stats === false && rcExtensions) {
      const rcName = `.${name}rc`
      const extensions = ['', '.js', '.json', '.yml', '.yaml']
      for (const ext of extensions) {
        stats = await getFile(path.join(directory, `${rcName}${ext}`))
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

  return async function (searchPath) {
    const absolutePath = path.resolve(rootDir, searchPath)
    const searchDir = await getDirectory(absolutePath)
    return search(searchDir)
  }
}
