import { prisma } from "@/lib/prisma";

import {
  phongData,
  chucvuData,
  nhanVienData,
  duLieuMucLuongToiThieu,
  duLieuHeSoTrachNhiem,
  duLieuHeSoPhuCap,
  dulieuNgachLuong,
  dulieuBacNgachLuong,
} from "./data/data";

async function main() {
  // const prisma = new PrismaClient();
  // await prisma.product.deleteMany();

  await prisma.phong.createMany({ data: phongData });
  await prisma.chucVu.createMany({ data: chucvuData });
  await prisma.nhanVien.createMany({ data: nhanVienData });
  await prisma.mucLuongToiThieuVung.createMany({
    data: duLieuMucLuongToiThieu,
  });
  await prisma.heSoTrachNhiem.createMany({ data: duLieuHeSoTrachNhiem });
  await prisma.heSoPhuCap.createMany({ data: duLieuHeSoPhuCap });
  await prisma.ngachLuong.createMany({ data: dulieuNgachLuong });
  await prisma.bacNgachLuong.createMany({ data: dulieuBacNgachLuong });

  console.log("Seed completed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
