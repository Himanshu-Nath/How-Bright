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

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb', parameterLimit: 1000000}));

app.use(express.static(path.join(__dirname, 'public')));

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

app.use('*', function(req, res){
    res.send(path.join(__dirname, 'dist/index.html'));
})

app.listen(consts.PORT, function() {
    logger.info("Server is running at port: "+consts.PORT);
    // logger.warn('Cheese is quite smelly.');
    // logger.error('Cheese is too ripe!');
    // logger.fatal('Cheese was breeding ground for listeria.');
})