import nodemailer from "nodemailer";

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

export const sendResetOtpMail = async (to, otp) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Password Reset",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.<p>`,
  });
};
