# Config Exists

> If you want to load configurations, pls go to [cosmiconfig](https://github.com/davidtheclark/cosmiconfig)

Check if config file is existed in specific folder:

- a `[name].config.js` (anywhere up the directory tree)
- a JSON or YAML "rc file" (anywhere up the directory tree)

For Example:
- `exists.config.js`
- `.existsrc.js`
- `.existsrc.json`
- `.existsrc.yml`
- `.existsrc.yaml`

## Installation

``` bash
$ npm i --save config-exists
# or
$ yarn add config-exists
```

## Usage

### Sync

```js
const config = require('config-exists')
const { exists } = config({name: 'exists'})
const stats = exists('__tests__/fixtures')
// stats: false if not exists, or instance of fs.Stats
```

### Async

```js
const config = require('config-exists')
const { existsAsync } = await config({name: 'exists'})
const stats = exists('__tests__/fixtures')
// stats: false if not exists, or instance of fs.Stats
```

### Options

#### name

Type: `string` Name of config file

#### rcExtensions

Type: `bool` Default: `true` Flag to search `rc` files
