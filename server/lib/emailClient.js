import sgMail from '@sendgrid/mail';

class EmailClient {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  send(req) {
    const msgOpts = {
      to: req.to,
      from: process.env.EMAIL_CONFIRMATION_SENDER,
      subject: req.emailSubject,
      html: req.emailTemplateHTML
    };
    sgMail
      .send(msgOpts)
      .then(() => {}, (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      });
  }
}

export default new EmailClient();
