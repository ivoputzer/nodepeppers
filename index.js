var express = require('express')
  , http    = require('http')
  , app     = express()
  , config  = require('./app/config')(require('./enviroments.json'), process.argv[2] || app.get('env'))

app.set('env', config.mode)
app.set('port', config.port)

app.get('/', function(req, res){ res.end('hello world') })

http.createServer(app).listen( app.get('port'), function() {
  console.log('Enviroment has been set to : ' + app.get('env') )
  console.log('Server is listening on port : ' + app.get('port') )
});