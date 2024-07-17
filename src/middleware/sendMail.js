import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async (user, email) => {
    const username = user; // Replace with actual username
    const temporaryPassword = "tempPassword123"; // Replace with actual temporary password
    const resetPasswordLink = "https://yourdomain.com/reset-password"; // Replace with actual reset password link

    const htmlMessage = `
        <p>Dear ${username},</p>
        <p>Welcome to <strong>BaySide Healthcare</strong>! We are excited to have you join our team and look forward to working with you.</p>

        <h3>Your Login Details</h3>
        <p>To get started, please find below your initial login credentials for our company systems:</p>
        <ul>
            <li><strong>Username:</strong> ${username}</li>
            <li><strong>Temporary Password:</strong> ${temporaryPassword}</li>
        </ul>
        <p>For security reasons, you will need to reset your password upon first login. Please follow the link below to set up your new password:</p>
        <p><a href="${resetPasswordLink}">Reset Password</a></p>

        <h3>Important Instructions</h3>
        <ol>
            <li>Click the link above to access the password reset page.</li>
            <li>Enter your username and temporary password.</li>
            <li>Follow the prompts to create a new, secure password.</li>
            <li>Log in to the system using your new password.</li>
        </ol>

        <h3>Next Steps</h3>
        <p>Once you have reset your password, please log in to our system and complete the following:</p>
        <ul>
            <li>Review and acknowledge the employee handbook.</li>
            <li>Complete any pending onboarding tasks.</li>
            <li>Update your profile information.</li>
        </ul>

        <h3>Contact Information</h3>
        <p>If you encounter any issues or have any questions, please don't hesitate to reach out to our IT Support.</p>
       
    `;
 
  const info = await transporter.sendMail({
    from: '"Bayside Healthcare" samikshyakharel505@gmail.com',
    to: email,
    subject: "Welcome to BaySide Healthcare - Reset Password", // Subject line
    html: htmlMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
