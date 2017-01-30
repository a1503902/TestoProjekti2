var express          = require('express');
var expressValidator = require('express-validator');
var app              = express();
var bodyParser       = require('body-parser');
var port             = process.env.PORT || 8080;
var router           = express.Router();
var cors             = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ohjelmistoprojekti:asdasd123@ds127429.mlab.com:27429/ohjelmistoprojektidb');

// Controllers
var authenticateController = require('./app/controllers/authenticate');
var carsController         = require('./app/controllers/cars');
var routesController       = require('./app/controllers/routes');
var employeesController    = require('./app/controllers/employees');
var workdaysController     = require('./app/controllers/workdays');
var deliveriesController   = require('./app/controllers/deliveries');

router.use('/authenticate', authenticateController);

// Protected routes, requires authentication
/*
router.use(function(req, res, next) {
    console.log('protected route');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
    	jwt.verify(token, app.get('secret'), function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				req.decoded = decoded;    
				next();
			}
		});
    }else{
    	return res.status(403).send({ 
			success: false, 
			message: 'Missing authenticate token.' 
		});
    }
});
*/
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