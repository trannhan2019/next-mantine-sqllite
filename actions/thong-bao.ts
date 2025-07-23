"use server";

import { prisma } from "@/lib/prisma";
import { getBHXHGanDenHan } from "./theo-doi-bhxh";
import dayjs from "dayjs";
import { resendEmail } from "@/lib/resend";
import { DAYS_BETWEEN_EMAILS } from "@/lib/constants";
import { sendGmailEmail } from "@/lib/node-mailer";

export const sendNotificationEmail = async () => {
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
      // await resendEmail({
      //   subject: "Thông báo nâng lương BHXH gần đến hạn",
      //   html: `Thông tin theo dõi BHXH của CBNV ${record.nhanVien.ten} đã gần đến hạn nâng lương !`,
      // });
      await sendGmailEmail({
        subject: "Thông báo nâng lương BHXH gần đến hạn",
        html: `<p>Kính gửi,</p>
        <p>Chúng tôi xin thông báo rằng nhân viên <strong>${record.nhanVien.ten}</strong>
        thuộc ngạch <strong>${record.ngachLuong.chucDanh}</strong>, bậc <strong>${record.bacLuong.bac}</strong> sắp đến kỳ nâng bậc.</p>
        <p>Ngày áp dụng thông tin BHXH hiện tại: <strong>${dayjs(record.ngayApDung).format("DD/MM/YYYY")}</strong></p>
        <p>Thời gian cần để nâng bậc tiếp theo: <strong>${record.bacLuong.thoiGianNangBac} ngày</strong></p>
        <p>Ngày dự kiến nâng bậc tiếp theo: <strong>${dayjs(record.ngayApDung).add(record.bacLuong.thoiGianNangBac, "day").format("DD/MM/YYYY")}</strong></p>
        <p>Trân trọng,</p>
        <p>Hệ thống quản lý</p>`,
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
  return thongTinBHXHSapDenHan;
};
