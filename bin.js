#!/usr/bin/env node

const gfm2html = require('./')
    , fs       = require('fs')

function usageAndExit () {
  console.error('Usage: gfm2html <markdown file> <output file>')
  process.exit(-1)
}

if (process.argv.length < 4)
  return usageAndExit()

if (!fs.existsSync(process.argv[2])) {
  console.error('File "' + process.argv[2] + '" does not exist')
  return usageAndExit()
}

gfm2html(fs.readFileSync(process.argv[2], 'utf8'), function (err, data) {
  if (err)
    throw err

  fs.writeFileSync(process.argv[3], data, 'utf8')
})