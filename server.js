const express = require('express');
const bodyParser = require('body-parser');
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

// listen for requests
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is listening on port 3001");
});
