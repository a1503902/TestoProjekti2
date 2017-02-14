var express          = require('express');
var expressValidator = require('express-validator');
var app              = express();
var bodyParser       = require('body-parser');
var port             = process.env.PORT || 8080;
var router           = express.Router();
var cookieParser     = require('cookie-parser');
var cors             = require('cors')
var session          = require('express-session');
var flash            = require('connect-flash');
var config           = require('./config');
var jwt              = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

app.use('/static', express.static(__dirname + '/public/assets'));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'pug');

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ohjelmistoprojekti:asdasd123@ds127429.mlab.com:27429/ohjelmistoprojektidb');


app.use(session({ secret: config.secret, resave: true, saveUninitialized: true })); // session secret
app.use(flash());


var middlewares = {
	loginRedirect: function(req, res, next){
		var token = req.session.token;
		if(token){
			jwt.verify(token, config.secret, function(err, user) {
				if(err){
					req.session.destroy();
					return res.redirect('/login');
				}
				if(!!user.isAdmin && user.isAdmin){
					return res.redirect('/admin/tracking');
				}else{
					return res.redirect('/employees/start');
				}
			});
		}else{
			next();
		}
	},
	isAuth: function(req, res, next){
		console.log('require auth');
		var token = req.session.token;
		if(token){
			jwt.verify(token, config.secret, function(err, user) {
				if (err) {
					req.flash('message', 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.');
					return res.redirect('/login');
				}else{
					req.user = user;
					next();
				}
			});
		}else{
			req.flash('message', 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.');
			return res.redirect('/login');
		}
	},
	isAuthApi: function(req, res, next){
		console.log('require auth api');
		var token = req.session.token;
		if(token){
			jwt.verify(token, config.secret, function(err, user) {
				if (err) {
					return res.json({success: false, message: 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.'});
				}else{
					req.user = user;
					next();
				}
			});
		}else{
			return res.json({success: false, message: 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.'});
		}
	},
	isAdmin: function(req, res, next){
		// Skip if login page
		if(req.url == '/admin/login'){
			next();
		}else{
			console.log('require admin');
			var token = req.session.token;
			if(token){
				jwt.verify(token, config.secret, function(err, user) {
					if (err) {
						req.flash('message', 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.');
						return res.redirect('/admin/login');
					}else{
						if(!!user.isAdmin && user.isAdmin){
							next();
						}else{
							req.flash('message', 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.');
							return res.redirect('/admin/login');
						}
					}
				});
			}else{
				if(req.xhr || req.headers.accept.indexOf('json') > -1){
					return res.json({success: false, message: 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.'});
				}else{
					req.flash('message', 'Sinun pitää olla kirjautunut sisään nähdäksesi sivun.');
					return res.redirect('/admin/login');
				}
			}
		}
	}
}

// Front
var loginController = require('./app/controllers/login');
var frontController = require('./app/controllers/front');
var adminController = require('./app/controllers/admin');

// REST
var carsController       = require('./app/controllers/cars');
var routesController     = require('./app/controllers/routes');
var employeesController  = require('./app/controllers/employees');
var workdaysController   = require('./app/controllers/workdays');
var deliveriesController = require('./app/controllers/deliveries');

// Middlewares
router.all('/login', middlewares.loginRedirect);
router.all('/admin/login', middlewares.loginRedirect);
router.all('/employees/*', middlewares.isAuth);
router.all('/admin/*', middlewares.isAdmin)
router.all('/api/*', middlewares.isAuthApi);

// Routes
router.use('/', loginController);
router.use('/employees', frontController);
router.use('/admin', adminController);

router.use('/api/cars', carsController);
router.use('/api/routes', routesController);
router.use('/api/employees', employeesController);
router.use('/api/workdays', workdaysController);
router.use('/api/deliveries', deliveriesController);

// Set router to app
app.use('/', router);

// Start server
app.listen(port);

console.log('Listening port ' + port);
