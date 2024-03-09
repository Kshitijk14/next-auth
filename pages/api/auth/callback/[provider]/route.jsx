import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import nodemailer from 'nodemailer';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            // Send OTP via email upon signing in
            const transporter = nodemailer.createTransport({
                host: 'smtp.example.com',
                port: 587,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: 'Login OTP',
                text: `Your OTP for login is: ${otp}`,
            };

            await transporter.sendMail(mailOptions);
            // You can save OTP in a database or session for verification

            return true;
        },
    },
});
