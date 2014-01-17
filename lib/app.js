var express  = require('express')
  , http     = require('http')
  , path     = require('path')
  , fs       = require('fs')

express.path = function () {
  var args = Array.prototype.slice.apply(arguments)
  args.unshift(__dirname, '..')
  return path.join.apply(null, args)
}

express.app  = express ()

require(express.path('app/config', process.env.NODE_ENV || process.argv[2] || express.app.get('env')))(express)

express.app.locals(require(express.path('app/lang/it.json')).locals)

fs.readdirSync(express.path('app/routes')).forEach(function (file) {
  if ( 'js' == file.substr(-2) )
    require(express.path('app/routes', file)).routes(express.app)
})

express.app.get('/*', function(req, res){
  res.render('400')
})

http.createServer(express.app).listen(express.app.get('port'), function () {
  console.log('+ Enviroment has been set to:', express.app.get('env'))
  console.log('+ Server is listening on port:', express.app.get('port'))
})