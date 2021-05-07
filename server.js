const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var firebase = require("firebase/app");
var sys=  require('util')
const firebaseConfig = {
    apiKey: "AIzaSyBZB9bZKVAn46s44dZLJ2GReVA-N4NJ1QM",
    authDomain: "tropicobackendv2.firebaseapp.com",
    projectId: "tropicobackendv2",
    storageBucket: "tropicobackendv2.appspot.com",
    messagingSenderId: "112097654724",
    appId: "1:112097654724:web:9d13976eed8de6614ed691",
    measurementId: "G-519HW39T1P"
  };
  firebase.initializeApp(firebaseConfig);
console.log('hi ines')
var path = require('path');

// create express app
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));


// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,authorization,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Utap application."});
});

require('./app/routes/ad.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/news.routes.js')(app);
require('./app/routes/product.routes.js')(app);

require("firebase/auth");
require("firebase/firestore")





// listen for requests
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening on port 3001");
});


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