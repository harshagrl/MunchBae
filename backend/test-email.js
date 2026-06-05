import nodemailer from "nodemailer";

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: "munchbaehelp@gmail.com",
      pass: "lakz bvzl lxkl dazd",
    },
  });
};

const testEmail = async () => {
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: "munchbaehelp@gmail.com",
      to: "munchbaehelp@gmail.com",
      subject: "Test Email",
      html: "<p>Test email</p>",
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

testEmail();
