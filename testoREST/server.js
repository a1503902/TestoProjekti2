
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

// Routes controller
var routesController = require('./app/controllers/routes');
router.use('/routes', routesController);

// Employees controller
var employeesController = require('./app/controllers/employees');
router.use('/employees', employeesController);

// Workdays controller
var workdaysController = require('./app/controllers/workdays');
router.use('/workdays', workdaysController);

// Deliveries controller
var deliveriesController = require('./app/controllers/deliveries');
router.use('/deliveries', deliveriesController);

// Sets routes prefix
app.use('/api', router);

// Start server
app.listen(port);
console.log('Listening port ' + port);