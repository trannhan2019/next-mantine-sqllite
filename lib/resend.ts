import { Resend } from "resend";
import { DIA_CHI_EMAIL_NHAN } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendEmail = async ({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) => {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // hoặc domain đã xác minh
      to: DIA_CHI_EMAIL_NHAN,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
