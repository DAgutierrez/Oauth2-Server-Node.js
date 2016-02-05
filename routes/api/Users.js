var models = require("../../models");

module.exports = function(app) {

  app.get('/api/users' , app.oauth.authorise() , function ( req, res ) {
	  
	  models.User.findAll()
	  .then(function (users) {
		  res.send(users);
	  })
	  
  });
  
  app.post('/api/users/register', function ( req, res ) {
    
    var username = req.body.username;
    var password = req.body.password; 
    var email = req.body.email;       
    
    var passEncript = encript(email, password);
    
    var user = {
      name : username,
      password : passEncript,
      email : email,      
    }
    
    models.User.create(user)
    .then( function (userCreated) {
      res.send({res : 'user created sucessfull'});
    })
    .catch(function (err) {
      console.log(err.stack);
      res.send({res:'user created failed '});
    });
	   	  
  });
  
  app.get('/api/users/login', app.oauth.authorise(), function ( req, res ) {
        
    var password = req.query.password; 
    var email = req.query.email; 
    
    var passEncript = encript(email, password);
     
    var query = {
      where : {
        password : passEncript,
        email : email
      }          
    }
    
    models.User.findAll(query)
    .then( function (userFinded) {
      if(userFinded.length) {
        res.send({res : 'correct user'});
      }
      else {
        res.send({res : 'wrong user'});
      }      
    })
    .catch(function (err) {
      console.log(err.stack);
      res.send({res: 'query login Failed' });
    });
	   
	  
  });

};

function encript(user, pass) {
   var crypto = require('crypto')
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
   return hmac
}