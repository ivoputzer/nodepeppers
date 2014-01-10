var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , fs      = require('fs')
  , config  = require('./app/config')(require('./enviroments.json'), process.argv[2] || app.get('env'))
  , stylus  = require('stylus')

app.configure(function () {
  app.set('env', config.mode)
  app.set('port', config.port)
  app.set('views', path.join(__dirname, 'app/views'))
  app.set('view engine', 'jade')
  app.set('view options', {layout: true})
  app.use(stylus.middleware({
    src: path.join(__dirname, 'app/assets/stylus'),
    dest: path.join(__dirname, 'static/css/') // gotcha : trailing slash is needed here
  }))
  app.use(express.static(path.join(__dirname, 'static')))
})

app.configure('development', function () {
  app.use(express.logger({format: 'dev', stream: process.stdout}))
})

app.configure('integration', function () {
  var dev = fs.createWriteStream(path.join(__dirname, 'log/access-dev.log'), {flags: 'a+'})
  app.use(express.logger({format: 'dev', stream: dev}))
})

app.configure('production', function () { /* production only configuration */ })

app.configure('integration', 'production', function () {
  var std = fs.createWriteStream(path.join(__dirname, 'log/access-std.log'), {flags: 'a+'})
  app.use(express.logger({format: 'default', stream: std}))
})

// loading all routes dynamically
fs.readdirSync( path.join(__dirname, 'app/routes')).forEach(function (file) { if ( 'js' == file.substr(-2) ) require(path.join(__dirname ,'app/routes', file)).routes(app) })

// starting the http server on the given port
http.createServer(app).listen( app.get('port'), function() {
  console.log('Enviroment has been set to : ' + app.get('env') )
  console.log('Server is listening on port : ' + app.get('port') )
});