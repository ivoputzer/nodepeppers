module.exports = exports = function (express) {

  var stylus = require('stylus')
    , app    = express.app

  app.set('env', 'development')
  app.set('port', 3000)

  app.set('views', express.path('app/views'))
  app.set('view engine', 'jade')
  app.set('view options', {layout: true})

  app.use(stylus.middleware({
    src: express.path('app/assets/stylus'),
    dest: express.path('www/css/') // gotcha, trailing slash is needed here!
  }))

  app.use(express.static(express.path('www')))
  app.use(express.logger({format: 'dev', stream: process.stdout}))

}