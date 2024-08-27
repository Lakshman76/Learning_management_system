import nodemailer from 'nodemailer';
const sendEmail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: {
      name: "Lakshman Kumar",
      address: process.env.EMAIL_USERNAME,
    }, // sender address
    to: email, //or --> to: process.env.RECEIVERS_EMAIL, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });
};

export default sendEmail;