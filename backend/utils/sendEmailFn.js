const nodemailer = require('nodemailer');

const sendEmailFn = async ({ email, subject, msg }) => {
    return new Promise(async (resolve, reject) => {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASS
            }
        });

        let options = {
            from: "Drink Bihar",
            to: email,
            subject: subject,
            html: msg
        };

        mailTransporter.sendMail(options, (err) => {
            if (err) {
                console.log(`Failed to send message to ${email}.`);
                reject(err);
            } else {
                console.log(`Message sent successfully to ${email}.`);
                resolve(true);
            }
        });
    });

}

module.exports = sendEmailFn;