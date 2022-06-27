const express = require("express");
const helmet = require("helmet");

const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config()
//console.log(dotenv.parsed)
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 // firebase.initializeApp(firebaseConfig);
//console.log('hi ines')
var path = require('path');

// create express app
const app = express();
app.use(helmet());



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));


// parse application/json
app.use(bodyParser.json())

// Configuring the database

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
mongoose.connect(process.env.Url, {
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
require('./app/routes/moome.routes.js')(app);
require('./app/routes/ezzayra.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/notification.routes.js')(app);
require('./app/routes/auth.routes.js')(app);
require("firebase/auth");
require("firebase/firestore")
//console.log(process.env.PORT)

// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port 5000");
});


