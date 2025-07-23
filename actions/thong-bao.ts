"use server";

import { prisma } from "@/lib/prisma";
import { getBHXHGanDenHan } from "./theo-doi-bhxh";
import dayjs from "dayjs";
import { resendEmail } from "@/lib/resend";

export const sendNotificationEmail = async () => {
  const DAYS_BETWEEN_EMAILS = 5; // Số ngày tối thiểu giữa 2 lần gửi email
  const now = dayjs();
  const thongTinBHXHSapDenHan = await getBHXHGanDenHan();
  if (thongTinBHXHSapDenHan.length <= 0) return false;
  for (const record of thongTinBHXHSapDenHan) {
    const lastSentDayjs = record.lastEmailSentAt
      ? dayjs(record.lastEmailSentAt)
      : null;
    const canSendEmail =
      !lastSentDayjs || now.diff(lastSentDayjs, "day") >= DAYS_BETWEEN_EMAILS;
    if (canSendEmail) {
      await resendEmail({
        subject: "Bao cao thong tin BHXH",
        html: `Thong tin BHXH cua nhan vien ${record.nhanVien.ten} hien tai`,
      });
      await prisma.thongTinBHXH.update({
        where: {
          id: record.id,
        },
        data: {
          lastEmailSentAt: now.toDate(),
        },
      });
    }
  }
  return true;
};
