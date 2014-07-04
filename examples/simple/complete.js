var gfm2js = require('../../gfm2html.js')

var opt = {
  "template" : "<html><head><title>{{title}}</title>{{style}}</head><body>{{contents}}</body></html>",
  "style" : "FOOBAR!",
  "title" : "What?!",
}
gfm2js("_hello_ *gmf2html*",opt,function(e,html) {
  console.log(html)
})
