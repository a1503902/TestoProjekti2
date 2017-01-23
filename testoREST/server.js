
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

// Cars controller
var carsController = require('./app/controllers/cars');
router.use('/cars', carsController);

// Sets routes prefix
app.use('/api', router);

// Start server
app.listen(port);
console.log('Listening port ' + port);