'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _server = require('./config/server');

var _server2 = _interopRequireDefault(_server);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _cloudinaryConfig = require('./config/cloudinaryConfig');

var _cloudinaryConfig2 = _interopRequireDefault(_cloudinaryConfig);

var _provider = require('./app/db/provider');

var _provider2 = _interopRequireDefault(_provider);

var _apiRouter = require('./app/routes/apiRouter');

var _apiRouter2 = _interopRequireDefault(_apiRouter);

var _authRouter = require('./app/routes/authRouter');

var _authRouter2 = _interopRequireDefault(_authRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticFolder = 'dist';
var app = (0, _express2.default)();

_cloudinary2.default.config({
    cloud_name: _cloudinaryConfig2.default.cloudName,
    api_key: _cloudinaryConfig2.default.APIKey,
    api_secret: _cloudinaryConfig2.default.APISecret
});

app.use(_bodyParser2.default.json());
app.use(_express2.default.static(__dirname + '/' + staticFolder));

// required for passport
app.use((0, _expressSession2.default)({ secret: 'bike', resave: false, saveUninitialized: true }));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session()); // persistent login sessions
app.use((0, _connectFlash2.default)()); // use connect-flash for flash messages stored in session

app.use('/api', _apiRouter2.default);

app.use('/', _authRouter2.default);

app.use('/', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname + '/' + staticFolder + '/index.html'));
});

app.listen(_server2.default.port, function () {
    console.log('server lintened on ' + _server2.default.port);

    _provider2.default.connect(_db2.default.url).then(function () {
        console.log('connection opened');
    }).catch(function (error) {
        console.log('open db error', error);
    });
});
