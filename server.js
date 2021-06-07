const express = require("express");
const helmet = require("helmet");

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
var firebase = require("firebase/app");
var sys = require('util')
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
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
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Utap application." });
});

require('./app/routes/ad.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/news.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/notification.routes.js')(app);
require('./app/routes/auth.routes.js')(app);
require("firebase/auth");
require("firebase/firestore")

// listen for requests
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening on port 3001");
});
