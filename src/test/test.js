'use strict';
const nodemailer = require('nodemailer');
async function main() {
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
//        sendmail: true,
        newline: 'windows',
        logger: false,
        port: 2525,
        auth: {
            user: "test1.openmy.info",
            pass: "mypass"
        }
    });

    // Message object
    let message = {
        from: 'Andris <andris@kreata.ee>',

        // Comma separated list of recipients
        to: 'Andris Reinman <andris.reinman@gmail.com>',
        bcc: 'andris@ethereal.email',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Test email as it goes...</p>',

        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),
                cid: 'note@example.com' // should be as unique as possible
            }
        ]
    };
    let info = await transporter.sendMail(message);
    console.log('Message sent successfully as %s', info.messageId);
}
main().catch(err => {
    console.error(err.message);
    process.exit(1);
});
