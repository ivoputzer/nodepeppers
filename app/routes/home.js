module.exports.routes = function(app){

  app.get('/', function(req, res){
    res.render('home/index')
  })

}