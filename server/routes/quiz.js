require("../models/quiz");
var Quiz = mongoose.model('quizCollection');
var consts = require('../config/constant');

var logger = log4js.getLogger('quiz.js');