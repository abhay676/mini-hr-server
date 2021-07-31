import nodemailer from 'nodemailer';
import { environment } from '../../config/environment.js';

const transport = nodemailer.createTransport({
  service: environment.MAIL_SERVICE,
  auth: {
    user: environment.MAIL_USER,
    pass: environment.MAIL_PWD,
  },
});

export const sendMail = async (to, OTP) => {
  return transport.sendMail({
    from: environment.MAIL_USER,
    to,
    subject: 'One-time Password for Login | MINI-HR',
    html: `
    <p>Welcome to MINI-HR platform</p>
    <p>Here is your OTP: <a href="#">${OTP}</a> .</p>
    <footer>Thanks!</footer>
    `,
  });
};
