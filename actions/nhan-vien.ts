"use server";

import { prisma } from "@/lib/prisma";
import { NhanVienWithPhongChucVuTotal } from "@/types/nhan-vien";

export const getManyNhanVien = async ({
  page = 1,
  pageSize = 10,
}): Promise<NhanVienWithPhongChucVuTotal> => {
  const nhanVien = await prisma.nhanVien.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      soThuTu: "asc",
    },
    include: {
      phong: true,
      chucVu: true,
    },
  });
  // Lấy tổng số bản ghi để tính toán phân trang
  const total = await prisma.nhanVien.count();
  return { data: nhanVien, total };
};
