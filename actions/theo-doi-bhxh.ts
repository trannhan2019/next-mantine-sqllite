"use server";

import { prisma } from "@/lib/prisma";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import ExcelJS from "exceljs";

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
