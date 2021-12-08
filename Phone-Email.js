const nodemailer = require('nodemailer')
const email = 'omegasoundcloudrapper@gmail.com'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: 'vyttctjjsgxdyqgd',
	}
})
module.exports = {
	sendMessage(to, subject, text) {
		if (to == 'phone') {to = '5082999556@txt.att.net'; subject = null}
		var mailOptions = {
			from: email,
			to: to,
			subject: subject,
			text: text,
		}
		transporter.sendMail(mailOptions, function(err, inf){
			if (err) {
				throw err
			}else{
				console.log("Email/Text successfully sent: " + inf.response)
			}
		})
	}
}