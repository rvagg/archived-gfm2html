#!/usr/bin/env node

const gfm2html = require('./')
    , fs       = require('fs')

var input = ''

function usageAndExit () {
  console.error('Usage: gfm2html <markdown file> <output file>')
  process.exit(-1)
}

function finish(input) {
  gfm2html(input, function (err, data) {
    if (err)
      throw err

    if (process.argv[3] === '-')
      process.stdout.write(data)
    else
      fs.writeFileSync(process.argv[3], data, 'utf8')
  })
}

if (process.argv.length < 4)
  return usageAndExit()

if (process.argv[2] === '-') {
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read()
    if (chunk !== null) input += chunk
  })

  process.stdin.on('end', function() {
    finish(input)
  })
} else {
  if (!fs.existsSync(process.argv[2])) {
    console.error('File "' + process.argv[2] + '" does not exist')
    return usageAndExit()
  }
  finish(fs.readFileSync(process.argv[2], 'utf8'))
}
