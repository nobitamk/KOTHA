const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // your email
    pass: process.env.MAIL_PASS  // app password (not email password)
  }
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"InfoYieldX" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 InfoYieldX Verification - Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #1ca9c9;">InfoYieldX Account Verification</h2>
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">
          Thank you for signing up with <strong>InfoYieldX</strong>. To complete your registration, please use the following OTP:
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; padding: 12px 24px; font-size: 22px; background: #1ca9c9; color: #fff; border-radius: 6px; letter-spacing: 2px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #666;">
          This OTP will expire in <strong>5 minutes</strong>. Please do not share this code with anyone for security reasons.
        </p>
        <p style="font-size: 14px; color: #666;">
          If you did not request this, please ignore this email.
        </p>
        <br/>
        <p style="font-size: 14px; color: #999;">Best Regards,<br/>The InfoYieldX Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
