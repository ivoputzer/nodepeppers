module.exports = exports = function (express) {

  var stylus = require('stylus')
    , fs     = require('fs')
    , app    = express.app
    , devLog = fs.createWriteStream(express.path('log/access-dev.log'), {flags: 'a+'})
    , stdLog = fs.createWriteStream(express.path('log/access-std.log'), {flags: 'a+'})

  app.set('env', 'integration')
  app.set('port', 4000)

  app.set('views', express.path('app/views'))
  app.set('view engine', 'jade')
  app.set('view options', {layout: true})

  app.use(stylus.middleware({
    src: express.path('app/assets/stylus'),
    dest: express.path('www/css/') // gotcha, trailing slash is needed here!
  }))



  app.use(express.static(express.path('www')))
  app.use(express.logger({format: 'dev', stream: devLog}))
  app.use(express.logger({format: 'default', stream: stdLog}))

}