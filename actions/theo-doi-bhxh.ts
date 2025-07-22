"use server";

import { prisma } from "@/lib/prisma";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import { DAY_15 } from "@/lib/constants";

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
  console.log(thongTinBHXH);
  const dataExcel = {
    id: thongTinBHXH?.id,
    ten: thongTinBHXH?.nhanVien.ten,
    phong: thongTinBHXH?.nhanVien.phong.ten,
  };

  // 2. Tạo workbook và worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Báo cáo lương BHXH");
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Họ và Tên", key: "ten", width: 30 },
    { header: "Phòng", key: "phong", width: 30 },
  ];
  worksheet.addRow(dataExcel);
  // Xuất workbook ra buffer
  const buffer = await workbook.xlsx.writeBuffer();
  // Chuyển buffer sang base64 để gửi về client
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
};

export const xuatThongTinBHXHByIdWithTemplate = async (id: number) => {
  // 1. Lấy thong tin BHXH theo id
  const thongTinBHXH = await getTheoDoiBHXHById(id);
  const dataExcel = {
    "Họ và tên": thongTinBHXH?.nhanVien.ten,
    "Phòng/Đơn vị": thongTinBHXH?.nhanVien.phong.ten,
  };

  const workbook = new ExcelJS.Workbook();
  // Đọc template từ thư mục public hoặc thư mục server
  const filePath = path.join(process.cwd(), "public/report_bhxh.xlsx");
  const buffer = fs.readFileSync(filePath);

  await workbook.xlsx.load(buffer.buffer); // Nạp nội dung template

  const worksheet = workbook.getWorksheet("Sheet1"); // hoặc tên khác phù hợp
  const startRow = 3;
  const entries = Object.entries(dataExcel);

  if (!worksheet) throw new Error("Không tìm thấy worksheet 'Sheet1'");

  entries.forEach(([key, value], index) => {
    const row = worksheet.getRow(startRow + index);
    row.getCell(1).value = key; // Cột A: tên thuộc tính
    row.getCell(2).value = value; // Cột B: giá trị
    row.commit();
  });
  // Xuất workbook ra buffer
  const bufferExcel = await workbook.xlsx.writeBuffer();
  // Chuyển buffer sang base64 để gửi về client
  const base64 = Buffer.from(bufferExcel).toString("base64");
  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
};

export const getRecentBhxhRecords = async () => {
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
      calculatedDate.diff(now, "day") < DAY_15
    );
    // Hoặc cách này cũng đúng:
    // return calculatedDate >= fifteenDaysAgo && calculatedDate <= now;
  });

  return filteredRecords;
};
