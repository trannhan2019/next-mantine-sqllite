"use server";

import { prisma } from "@/lib/prisma";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import dayjs from "dayjs";
import { DAYS_SEND_NOTIFICATION } from "@/lib/constants";
import { xuatThongTinBHXH, xuatThongTinBHXHWithTemplate } from "@/lib/excel";

export const getTheoDoiBHXH = async (): Promise<ThongTinBHXHResponse[]> => {
  const thongTinBHXHs = await prisma.thongTinBHXH.findMany({
    include: {
      nhanVien: {
        include: {
          phong: true,
        },
      },
      ngachLuong: {
        include: {
          bacNgach: true,
        },
      },
      bacLuong: true,
      phuCap: true,
      trachNhiem: true,
    },
  });
  return thongTinBHXHs;
};

export const getTheoDoiBHXHById = async (
  id: number
): Promise<ThongTinBHXHResponse | null> => {
  const thongTinBHXH = await prisma.thongTinBHXH.findUnique({
    where: { id: id },
    include: {
      nhanVien: {
        include: {
          phong: true,
        },
      },
      ngachLuong: {
        include: {
          bacNgach: true,
        },
      },
      bacLuong: true,
      phuCap: true,
      trachNhiem: true,
    },
  });
  return thongTinBHXH;
};

export const xuatThongTinBHXHById = async (id: number) => {
  // 1. Lấy thong tin BHXH theo id
  const thongTinBHXH = await getTheoDoiBHXHById(id);
  // console.log(thongTinBHXH);
  if (!thongTinBHXH) return null;
  const dataExcel = {
    id: thongTinBHXH?.id,
    ten: thongTinBHXH?.nhanVien.ten,
    phong: thongTinBHXH?.nhanVien.phong.ten,
  };
  // 2. Tạo workbook và worksheet
  return await xuatThongTinBHXH(dataExcel);
};

export const xuatThongTinBHXHByIdWithTemplate = async (id: number) => {
  // 1. Lấy thong tin BHXH theo id
  const thongTinBHXH = await getTheoDoiBHXHById(id);
  if (!thongTinBHXH) return null;
  const dataExcel = {
    "Họ và tên": thongTinBHXH?.nhanVien.ten,
    "Phòng/Đơn vị": thongTinBHXH?.nhanVien.phong.ten,
  };
  // 2. Tạo workbook và worksheet
  return await xuatThongTinBHXHWithTemplate(dataExcel);
};

export const getBHXHGanDenHan = async () => {
  const allBhxhRecords = await prisma.thongTinBHXH.findMany({
    include: {
      nhanVien: true,
      ngachLuong: {
        include: {
          bacNgach: true,
        },
      },
      bacLuong: true,
    },
  });

  // Sử dụng Day.js để tạo các đối tượng ngày
  const now = dayjs(); // Thời điểm hiện tại

  const filteredRecords = allBhxhRecords.filter((record) => {
    // Chuyển đổi ngayApDung từ Date của Prisma sang đối tượng Day.js
    const ngayApDungDayjs = dayjs(record.ngayApDung);

    // Cộng thêm thoiGianNangBac (số ngày)
    const calculatedDate = ngayApDungDayjs.add(
      record.bacLuong.thoiGianNangBac,
      "day"
    );

    // So sánh ngày đã tính toán với khoảng thời gian 15 ngày gần đây
    // isAfter() và isBefore() là các phương thức của Day.js
    // Hoặc bạn có thể dùng các toán tử so sánh thông thường vì Day.js objects có thể so sánh được
    return (
      record.ngachLuong.bacNgach.length !== record.bacLuong.bac &&
      calculatedDate.diff(now, "day") < DAYS_SEND_NOTIFICATION
    );
    // Hoặc cách này cũng đúng:
    // return calculatedDate >= fifteenDaysAgo && calculatedDate <= now;
  });

  return filteredRecords;
};
