const uuidv1 = require('uuid/v1');
var randomize = require('randomatic');
require("../models/user");
var User = mongoose.model('userCollection');
var consts = require('../config/constant');
var usersBL = require('../serviceImpl/userBL');
var mailBL = require('../serviceImpl/mailBL');

var logger = log4js.getLogger('user.js');

module.exports = {
    //User Registration
    userRegister: function (req, res) {
        let tempKey = randomize('A0', 8);
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
                    to: req.body.email,
                    subject: "How-Bright account Activation ✔",
                    body: 'Hello &nbsp;' + req.body.name + ',<br><br><p></p><p>We are excited to add you as a new member in our community. Your account has been created in the <b>How-Bright</b> portal. To activate your account please click on the link below</p><p><i><b>Activation Link:</b></i> http://localhost:4200/activate/'+ tempKey +' and click on activation button.</p><p>This message was generated automatically.</p><p>If you need help or have questions, email hnath723@gmail.com anytime.</p> <br> <p>Sincerely, <br>Himanshu Nath <br>How Bright Team</p>'
                }
                mailBL.sendMail(emailObject, res);
                res.send({ status: true, message: consts.SUCCESS, result });
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
                    console.log(result);
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
        User.findOneAndUpdate({tempKey: req.params.key, status: false}, { $set: { status: true, tempKey: null } }, function(err, result){
            if(err) {
                logger.error('userActivate: error while updating user status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while updating user status", err });
            } else {
                console.log(result)
                res.send({ status: true, message: consts.SUCCESS, result });
            }
        });
    },

    //User Active Status
    userActivateStatus: function(req, res) {
        User.findOne({tempKey: req.params.key, status: false}, function(err, result){
            if(err) {
                logger.error('userActivateStatus: error while getting status: ' + err);
                res.send({ status: false, message: consts.FAIL, devMsg: "error while getting status", err });
            } else {
                console.log(result)
                res.send({ status: true, message: consts.SUCCESS, activationStatus: false });
            }
        });        
    }
}