var express          = require('express');
var expressValidator = require('express-validator');
var app              = express();
var bodyParser       = require('body-parser');

var port = process.env.PORT || 8080;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());





var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ohjelmistoprojekti:asdasd123@ds127429.mlab.com:27429/ohjelmistoprojektidb');

// Controllers
var carsController       = require('./app/controllers/cars');
var routesController     = require('./app/controllers/routes');
var employeesController  = require('./app/controllers/employees');
var workdaysController   = require('./app/controllers/workdays');
var deliveriesController = require('./app/controllers/deliveries');

router.use('/cars', carsController);
router.use('/routes', routesController);
router.use('/employees', employeesController);
router.use('/workdays', workdaysController);
router.use('/deliveries', deliveriesController);

// Sets routes prefix
app.use('/api', router);

// Start server
app.listen(port);
console.log('Listening port ' + port);