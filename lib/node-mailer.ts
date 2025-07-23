import nodemailer from "nodemailer";
import { DIA_CHI_EMAIL_NHAN } from "./constants";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER, // your@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // App password từ bước 2
  },
});

export async function sendGmailEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: `"Hệ thống" <${process.env.GMAIL_USER}>`,
      to: [DIA_CHI_EMAIL_NHAN, "phongtochuchanhchinh.sba@gmail.com"],
      subject,
      text: html,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
