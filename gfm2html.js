const fs        = require('fs')
    , path      = require('path')
    , after     = require('after')
    , brucedown = require('brucedown')

var template
  , style

function render (opt) {
  return opt.template
    .replace('{{contents}}', "<div class=\"body-content\">"+opt.html+"</div>")
    .replace('{{style}}', "<style type=\"text/css\">"+opt.style+"</style>")
    .replace('{{title}}', opt.title)
}

function gfm2html (markdown, opt, callback) {
  if(typeof opt === "function" && typeof callback !== "function") {
    callback = opt || function() {}
  }
  if(typeof opt !== "object") opt = {}

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

    if(typeof opt.template == "undefined") {
      if (!template) {
        try {
          template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
        } catch (e) {
          return callback(e)
        }
      }
      opt.template = template
    }
    if(typeof opt.style == "undefined") {
      if (!style) {
        try {
          style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8')
        } catch (e) {
          return callback(e)
        }
      }
      opt.style = style
    }

    if(typeof opt.title == "undefined") {
      opt.title = title
    }

    opt.html = html

    callback(null, render(opt, callback))
  })
}

module.exports = gfm2html
