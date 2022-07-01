
const Notfication = require('../models/notification.model');

var serviceAccount = require("../../tropicobackendv2-firebase-adminsdk-ydgb4-0e2505e37a.json");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://utap.firebaseio.com'
});

// Create and Save a new News
exports.create = async(req, res) => {
    
   
    
  
    const notif = new Notfication({
        
        title: req.body.title , 
        body: req.body.body, 
    });

 
    notif.save()
    .then(data => {
      // console.log(data.title)
  
        res.send(data);
         
       var message = {
        notification: {
          title: data.title,
          body: data.body
        },
        data:{
            type:'event',
            title: data.title,
            body: data.body
        },
       
        topic: 'news',
      };



    
      
    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the News."
        });
    });
};
// Retrieve and return all News from the database.
exports.findAll = (req, res) => {
    Notfication.find().sort({"updatedAt":-1})
    .then(notifs => {
       
        res.send({ status:'200', message: "All the notifs",notifs});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notifs."
        });
    });
};

   





