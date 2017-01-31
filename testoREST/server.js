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

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ohjelmistoprojekti:asdasd123@ds127429.mlab.com:27429/ohjelmistoprojektidb');

// Controllers
var frontController        = require('./app/controllers/front');
var authenticateController = require('./app/controllers/authenticate');
var carsController         = require('./app/controllers/cars');
var routesController       = require('./app/controllers/routes');
var employeesController    = require('./app/controllers/employees');
var workdaysController     = require('./app/controllers/workdays');
var deliveriesController   = require('./app/controllers/deliveries');

router.use('/', frontController);
router.use('/api/authenticate', authenticateController);

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
router.use('/api/cars', carsController);
router.use('/api/routes', routesController);
router.use('/api/employees', employeesController);
router.use('/api/workdays', workdaysController);
router.use('/api/deliveries', deliveriesController);


// Sets routes prefix
app.use('/', router);

// Start server
app.listen(port);

console.log('Listening port ' + port);
