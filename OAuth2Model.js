var color = require('chalk');
var currentClientId = null;


module.exports = function(db) {
  /* @TODO get  authorized clients dynamicaly */
    var authorizedClientIds = ['s6BhdRkqt45'];

    var oauth2Model = {
        getClient : function(clientId, clientSecret, cb) {
    
            currentClientId = clientId;
          
            console.log(color.cyan('Info: '), 'Exec getClient');
            db.query( 'SELECT ClientId, ClientSecret, RedirectUri FROM OauthClients WHERE \
                ClientId = ?',
                { replacements: [clientId], type: db.QueryTypes.SELECT } 
            )
            .then( function( res ) {
                
                if(!res.length) return cb(null);
                var client = res[0];
                if (clientSecret !== null && client.ClientSecret !== clientSecret) return cb();
                cb(null, {
                    clientId: client.ClientId,
                    clientSecret: client.ClientSecret,
                    redirectUri : client.RedirectUri
                });
            }, function(err) {
                if(err) {
                    console.log(color.red('Error: '), err);
                    return cb(err);
                }
            });
        },
        grantTypeAllowed  : function(clientId, grantType, cb) {
          if (grantType === 'password') {
            return cb(
              false,
              authorizedClientIds.indexOf(clientId) >= 0
            );
          }
          cb(false, true);
        },
        getUser : function(username, password, cb) {
          
          console.log(color.cyan('Info: '), 'Exec getUser');
          
          db.query('select Users.id from Users \
            where (Users.email = ? ) and Users.Password = ? ', 
             { replacements: [username,password], type: db.QueryTypes.SELECT } 
          )
          .then( function(res) {
            cb(null, res.length ? res : false);
          }, function(err) {
            if(err) {
              console.log(color.red('Error: '), err);
              cb(err);
            }
          });
      },
      saveAccessToken : function(accessToken, clientId, expires, userId, cb) {
      console.log('\n', color.cyan('Info: '), 'Exec saveAccessToken');
      
      db.query('INSERT INTO OauthAccessTokens(AccessToken, ClientId, UserId, expires) \
        VALUES (?, ?, ?, ?)', 
        { replacements: [accessToken, clientId,
          userId[0].id, expires]}
       )
      .then(function(res) {
        cb(null);
      }, function(err) {
        if(err) {
          console.log('\n', color.red('Error: '), err);
          cb(err);
        }
      });
    },
    getAccessToken : function(bearerToken, cb) {
      console.log('\n', color.cyan('Info: '), 'Exec getAccessToken');
      db.query(
        'SELECT AccessToken, ClientId, expires, UserId \
        FROM OauthAccessTokens \
        WHERE AccessToken = ?',
        { replacements: [bearerToken], type: db.QueryTypes.SELECT }
      ).
      then( function(res) {
        if(!res.length) return cb(null);
        var token = res[0];
        cb(null, {
          accessToken : token.access_token,
          clientId    : token.client_id,
          expires     : token.expires,
          userId      : token.user_id
        });
      }, function(err) {
        
        if(err) {
          console.log('\n', color.red('Error: '), err);
          return cb(err);
        }
      });
    }
    };

    return oauth2Model;

};