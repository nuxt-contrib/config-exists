const { existsAsync } = require('../')({name: 'exists'})

test('exists.config.js exists', async () => {
  const stats = await existsAsync('__tests__/fixtures')
  expect(stats.fileName).toBe('exists.config.js')
})

test('exists.config.js exists in files directory', async () => {
  const stats = await existsAsync('__tests__/fixtures/a.js')
  expect(stats.fileName).toBe('exists.config.js')
})

test('exists.config.js exists in parent directory', async () => {
  const stats = await existsAsync('__tests__/fixtures/config/js')
  expect(stats.fileName).toBe('exists.config.js')
})

test('exists.config.js not exists', async () => {
  const stats = await existsAsync('__tests__/')
  expect(stats).toBeFalsy()
})

test('.existsrc.js exists', async () => {
  const stats = await existsAsync('__tests__/fixtures/rc/js')
  expect(stats.fileName).toBe('.existsrc.js')
})

test('exists.config.js folder not included', async () => {
  const stats = await existsAsync('__tests__/fixtures/rc/js/exists.config.js')
  expect(stats.fileName).toBe('.existsrc.js')
})

test('.existsrc.json exists', async () => {
  const stats = await existsAsync('__tests__/fixtures/rc/json')
  expect(stats.fileName).toBe('.existsrc.json')
})

test('.existsrc.yml exists', async () => {
  const stats = await existsAsync('__tests__/fixtures/rc/yml')
  expect(stats.fileName).toBe('.existsrc.yml')
})

test('.existsrc.yaml exists', async () => {
  const stats = await existsAsync('__tests__/fixtures/rc/yml/a')
  expect(stats.fileName).toBe('.existsrc.yaml')
})
