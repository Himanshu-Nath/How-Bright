mongoose = require('mongoose');
log4js = require('log4js');
async = require('async');
const express = require('express');
const db = require('./server/config/db');
const path = require('path');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const app = express();

const consts = require('./server/config/constant')
require('./server/config/db')
log4js.configure({
    appenders: {'file': { type: 'file', filename: 'log/server.log' },
                'console': { type: 'console' } },
    categories: { 'default': { appenders: ['file', 'console'], level: 'info' } }
});
const logger = log4js.getLogger('server.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var User = require('./server/routes/user')

app.post('/api/login', User.userLogin);
app.post('/api/register', User.userRegister);
app.get('/api/useractivate/:key', User.userActivate);
app.get('/api/availabilitycheck/:data', User.checkUser);
app.get('/api/userstatus/:key', User.userActivateStatus);
app.get('/api/userbyemail/:email', User.getUserInfoByEmail);
app.post('/api/forgotpassword/sendmail', User.sendForgotPasswordMail);
app.put('/api/createPassword', User.createNewPassword);
app.get('/api/createpassword/status/:key', User.checkCreatePasswordStatus);

app.use('/', express.static(__dirname + '/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname, '/dist/how-bright')));

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/how-bright/index.html'));
})

app.listen(consts.PORT, function() {
    logger.info("Server is running at port: "+consts.PORT);
    // logger.warn('Cheese is quite smelly.');
    // logger.error('Cheese is too ripe!');
    // logger.fatal('Cheese was breeding ground for listeria.');
})