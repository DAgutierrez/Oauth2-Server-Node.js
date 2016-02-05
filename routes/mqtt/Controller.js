var models = require("../../models");
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883');

client.on('connect', function () {
  console.log("conected!");
  client.subscribe('ConnStatus');
  console.log("waiting for a message..");
});

client.on('message', function (topic, message) {
  var data = JSON.parse(message.toString());
  
  var controllerId = data.id;
  
  var Query = { where : { controllerId : controllerId }};
  
  models.Controller.findAll(Query)
  .then( function (controllerFinded) { 
    if (controllerFinded.length) {
      
      var newDataController = {  "statusController" : "On" };
      controllerFinded[0].updateAttributes(newDataController)
      .then ( function (controllerUpdated) {
        
      })
      .catch( function (err) {
        console.log(err.stack);
      }); 
  
    } 
    else  {     
      var newController = {
        "controllerId" : controllerId,
        "statusController" : "On"
      }
      
      models.Controller.create(newController)
      .then( function (controllerCreated) {
        
      })
      .catch( function (err) {
        console.log(err.stack);
      });
    }
  })
  .catch( function (err) {
    console.log(err.stack);
  });
  
});
