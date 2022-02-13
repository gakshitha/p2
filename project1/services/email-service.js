const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

var sendMail = {
    send : function(toEmail, fromEmail,subject, html){
        //data verification
        //mandatory data
        if( toEmail == null )
        {
            return null;
        }

        const msg = {
            to: toEmail,
            //cc: ccEmail,
            //bcc: bccEmail,
            from: fromEmail,
            subject: subject,
            html: html
            //text: text
          }

          sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
            })
            .catch((error) => {
            console.error(error)
            })
    }
}

module.exports = sendMail