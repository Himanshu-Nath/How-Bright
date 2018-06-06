var consts = require('../config/constant');
var logger = log4js.getLogger('mail.js');
var email = require('../config/email');
module.exports = {
    //Send Mail
    sendMail: function (emailObject, res) {
        let transporter = email.createTransport();
        logger.debug("sendMail: transporter created successfully");
        let mailOptions = {
            from: emailObject.name +'" 👻" <' + emailObject.from + '>',
            to: emailObject.to,
            subject: emailObject.subject,
            html: emailObject.body,
            auth: {
                user: consts.EMAIL.user,
                refreshToken: consts.EMAIL.refreshToken
            }
        };
        email.sendMail(transporter, mailOptions, res);
    }
}