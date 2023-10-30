import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: `${process.env.SMTP_EMAIL}`,
    pass: `${process.env.SMTP_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const mailOptions = (emailText, emailSubject, emailRecipient) => {
  console.log(process.env.SMTP_USERNAME, process.env.SMTP_PASSWORD);
  return {
    from: "robertquartey7@gmail.com",
    to: emailRecipient,
    subject: emailSubject,
    html: emailText,
  };
};
