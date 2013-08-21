const fs        = require('fs')
    , path      = require('path')
    , after     = require('after')
    , brucedown = require('brucedown')

var template
  , style

function render (html, title) {
  return template
    .replace('{{contents}}', html)
    .replace('{{style}}', style)
    .replace('{{title}}', title)
}

function gfm2html (markdown, callback) {
  brucedown(markdown, function (err, html) {
    if (err)
      return callback(err)

    var m = (/<h1>([^<]+)<\/h1>/gmi).exec(html)
      , title
    if (m) {
      title = m[1]
    } else {
      m = (/<h2>([^<]+)<\/h2>/gmi).exec(html)
      title = m ? m[1] : ''
    }

    if (!template || !style) {
      try {
        template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
      } catch (e) {
        return callback(e)
      }
      try {
        style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8')
      } catch (e) {
        return callback(e)
      }
    }

    callback(null, render(html, title, callback))
  })
}

module.exports = gfm2html