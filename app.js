var express = require('express'),
    Sequelize = require('sequelize'),
    color = require('chalk'),
    bodyParser    = require('body-parser'),
    oauthserver = require('oauth2-server'),
    load = require('express-load');
    models = require("./models");
  


var app = express();

/*===== LOAD CONFIG, CONTROLLERS AND ROUTES ======*/

load('config')
  .into(app);

/*===== CONFIG APP ======*/
  
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());

app.set('env', app.config.env.mode);

app.listen('5445'); //config port
console.log('server started 127.0.0.1:5445');

/*===== CONFIG OAUTH ======*/


var dbConfig = app.config.config[app.get('env')];


var database = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password, {
    host   : dbConfig.host,
    logging : function(str) {
      console.log(color.cyan( new Array(93).join('-')), '\n');
      console.log(color.yellow(str), '\n');
    }
});

app.oauth = oauthserver({
  model: require('./OAuth2Model')(database), // See below for specification 
  grants: ['password'],
  //debug: true
  accessTokenLifetime : 604800
});

app.all('/oauth/token', app.oauth.grant());

load('routes')
  .into(app);


// app.get('/test',app.oauth.authorise() ,function (req,res) {
  
//    models.User.findAll()
// 	  .then(function (users) {
// 		  res.send(users);
// 	  })
	  
// });