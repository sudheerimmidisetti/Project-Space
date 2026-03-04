// test-email.js
require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

console.log("Using email:", process.env.EMAIL_USER);

async function testEmail() {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: `Test Script <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email Setup",
            text: "If you see this, your nodemailer setup is working perfectly!"
        });

        console.log("Success! Email sent. Message ID:", info.messageId);
    } catch (error) {
        console.error("Failed to send email. Error details:");
        console.error(error);
    }
}

testEmail();
