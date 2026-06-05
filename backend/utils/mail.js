import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
};

const sendEmail = async (options) => {
  if (process.env.SENDGRID_API_KEY) {
    // Use SendGrid HTTP API (Bypasses Render SMTP Block)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: options.to,
      from: process.env.EMAIL, // Make sure this email is verified in SendGrid Single Sender
      subject: options.subject,
      html: options.html,
    };
    await sgMail.send(msg);
  } else {
    // Fallback to Nodemailer (For local development)
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
};

export const sendResetOtpMail = async (to, otp) => {
  await sendEmail({
    to,
    subject: "Password Reset",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};

export const sendDeliveryOtpMail = async (user, otp) => {
  await sendEmail({
    to: user.email,
    subject: "Delivery OTP",
    html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};

export const sendSignupOtpMail = async (to, otp) => {
  await sendEmail({
    to,
    subject: "Verify Your Email Address",
    html: `<p>Your OTP for joining MunchBae is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};
