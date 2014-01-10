module.exports.routes = function(app){

  app.get('/', function(req, res) {

    res.render('index', {
      title : 'Your Page Title',
      description: 'Your Page Description',
      author: 'Your Name'
    });

  });

}