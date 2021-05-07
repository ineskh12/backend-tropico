
var serviceAccount = require("/Users/ines/inesprojects/backend-tropico/tropicobackendv2-firebase-adminsdk-ydgb4-0e2505e37a.json");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://utap.firebaseio.com'
});


var topicName = 'utap'

var message = {
  notification: {
    title: '`utaptest',
    body: 'test test'
  },
 
  topic: topicName,
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