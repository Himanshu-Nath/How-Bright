const uuidv1 = require('uuid/v1');
var randomize = require('randomatic');
require("../models/user");
var User = mongoose.model('userCollection');
var consts = require('../config/constant');
var usersBL = require('../serviceImpl/userBL');
var mailBL = require('../serviceImpl/mailBL');

var logger = log4js.getLogger('user.js');

var userProjection = {
    name: 1,
    email: 1,
    username: 1,
    gender: 1,
    dob: 1,
    mobile: 1,
    role: 1,
    status: 1,
    image: 1,
    question: 1
};

module.exports = {
    //User Registration
    userRegister: function (req, res) {
        let tempKey = randomize('A0a!', 12);
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            dob: req.body.dob,
            mobile: req.body.mobile,
            role: req.body.role,
            tempKey: tempKey,
            token: '',
            question: {q1: req.body.question, a1: req.body.answer}
        });
        user.save(function (err, result) {
            if (err) {
                logger.error('userRegister: error while registration due to: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "Registration failed", err });
            } else {
                var emailObject = {
                    name: req.body.name,
                    from: consts.EMAIL.user,
                    from_name: consts.EMAIL.from,
                    to: req.body.email,
                    subject: "How-Bright account Activation ✔",
                    body: 'Hello &nbsp;' + req.body.name + ',<br><br><p></p><p>We are excited to add you as a new member in our community. Your account has been created in the <b>How-Bright</b> portal. To activate your account please click on the link below</p><p><i><b>Activation Link:</b></i> http://localhost:4200/activate/'+ tempKey +' and click on activation button.</p><p>This message was generated automatically.</p><p>If you need help or have questions, email hnath723@gmail.com anytime.</p> <br> <p>Sincerely, <br>Himanshu Nath <br>How Bright Team</p>'
                }
                mailBL.sendMail(emailObject, res);
                // res.send({ status: true, message: consts.SUCCESS, result });
            }
        })
    },

    //User Login
    userLogin: function (req, res) {
        let token = uuidv1();
        var userProjection = {
            name: 1,
            email: 1,
            username: 1,
            gender: 1,
            dob: 1,
            mobile: 1,
            role: 1,
            status: 1,
            image: 1
        };
        User.findOne({ username: req.body.username, password: req.body.password, status: true }, userProjection, function (err, result) {
            if (err) {
                logger.error('userLogin: error while login due to: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "User not found", err });
            } else {
                if(result != null) {
                    result.token = token;
                    User.findByIdAndUpdate(result._id, { $set: { token: token, lastLogin: new Date() } }, { new: true }, function (err, model) {
                        if (err) {
                            logger.error('userLogin: error while updating token: ' + err);
                            res.send({ status: false, message: consts.FAIL, devMsg: "error while updating token", err });
                        } else {
                            res.send({ status: true, message: consts.SUCCESS, result });
                        }
                    })
                } else {
                    logger.error('userLogin: user not found');
                    res.send({ status: false, message: consts.FAIL, devMsg: "User not found / not active" });
                }                
            }
        })
    },

    //Activate User
    userActivate: function(req, res) {
        User.findOneAndUpdate({tempKey: req.params.key, status: false}, { $set: { status: true } }, function(err, result){
            if(err) {
                logger.error('userActivate: error while updating user status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while updating user status", err });
            } else {
                if(result != null) {
                    res.send({ status: true, message: consts.SUCCESS, result });
                } else {
                    res.send({ status: false, message: consts.FAIL, devMsg: "user activation failed" });
                }                
            }
        });
    },

    //User Active Status
    userActivateStatus: function(req, res) {
        User.findOne({tempKey: req.params.key}, function(err, result){
            if(err) {
                logger.error('userActivateStatus: error while getting status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting status", err });
            } else {
                if(result != null) {
                    res.send({ status: true, message: consts.SUCCESS, activationStatus: result.status, name: result.name });
                } else {
                    res.send({ status: false, message: consts.FAIL, devMsg: "user not found" });
                }                
            }
        });        
    },

    //Check user exist or not
    checkUser: function(req, res) {
        User.count( {$or: [{username: req.params.data},{email: req.params.data}]}, function(err, result){
            if(err) {
                logger.error('checkUser: error while getting user: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting user", err });
            } else {
                res.send({ status: true, message: consts.SUCCESS, count: result });             
            }
        });        
    },

    //Get user info by email
    getUserInfoByEmail: function(req, res) {
        User.findOne( {email: req.params.email, status: true}, userProjection, function(err, result){
            if(err) {
                logger.error('getUserInfoByEmail: error while getting user info by email: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting user info by email", err });
            } else {
                res.send({ status: true, message: consts.SUCCESS, result: result });             
            }
        });        
    },

    //Send mail for forgot password
    sendForgotPasswordMail: function(req, res) {
        User.findOneAndUpdate( {email: req.body.email, 'question.q1': req.body.question, 'question.a1': req.body.answer}, {$set: {status: false}},function(err, result){
            if(err) {
                logger.error('sendForgotPasswordMail: error while getting user info: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting user info", err });
            } else {
                if(result != null) {
                    let tempKey = result.tempKey == null ? randomize('A0a!', 12) : result.tempKey;
                    var emailObject = {
                        name: req.body.name,
                        from: consts.EMAIL.user,
                        from_name: consts.EMAIL.from,
                        to: req.body.email,
                        subject: "How-Bright Change Password ✔",
                        body: 'Hello &nbsp;' + result.name + ',<br><br><p></p><p>Looks like you had like to change your <b>How-Bright</b> password. Please click the following link to do so:</p><p><i><b>Link:</b></i> http://localhost:4200/createpassword/'+ tempKey +' and click on submit button.</p><p>This message was generated automatically. Please disregard this e-mail if you did not request a password reset. Cheers,</p><p>If you need help or have questions, email hnath723@gmail.com anytime.</p> <br> <p>Sincerely, <br>Himanshu Nath <br>How Bright Team</p>'
                    }
                    mailBL.sendMail(emailObject, res);
                } else {
                    res.send({ status: false, message: consts.FAIL, devMsg: "user credential not matched" });             
                }                
            }
        });        
    },

    //Create new password
    createNewPassword: function(req, res) {
        User.findOneAndUpdate({_id: req.body.id, email: req.body.email, status: false}, { $set: { status: true, password: req.body.password } }, function(err, result){
            if(err) {
                logger.error('userActivate: error while updating user status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while updating user status", err });
            } else {
                if(result != null) {
                    res.send({ status: true, message: consts.SUCCESS, result });
                } else {
                    res.send({ status: false, message: consts.FAIL, devMsg: "user activation failed" });
                }                
            }
        });
    },

    //Check create new password status
    checkCreatePasswordStatus: function(req, res) {
        User.findOne({tempKey: req.params.key}, function(err, result){
            if(err) {
                logger.error('checkCreatePasswordStatus: error while getting create new password status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting status", err });
            } else {
                if(result != null) {
                    res.send({ status: true, message: consts.SUCCESS, activationStatus: result.status, name: result.name, id: result._id, email: result.email });
                } else {
                    res.send({ status: false, message: consts.FAIL, devMsg: "user not found" });
                }                
            }
        });        
    },
}