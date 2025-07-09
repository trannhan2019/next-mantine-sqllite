import { prisma } from "@/lib/prisma";
import { phongData } from "./data/phong";
import { chucvuData } from "./data/chuc-vu";
import { nhanVienData } from "./data/nhan-vien";
import { duLieuMucLuongToiThieu } from "./data/muc-luong-toi-thieu";
import { duLieuHeSoTrachNhiem } from "./data/he-so-trach-nhiem";
import { duLieuHeSoPhuCap } from "./data/he-so-phu-cap";
import { dulieuNgachLuong } from "./data/ngach-luong";
import { dulieuBacNgachLuong } from "./data/bac-luong";
import { dulieuBHXH } from "./data/theo-doi-bhxh";
import { duLieuHeSoLuongMax } from "./data/bac-luong-max";


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
  await prisma.thongTinBHXH.createMany({ data: dulieuBHXH });
  await prisma.heSoLuongMax.createMany({ data: duLieuHeSoLuongMax });

  console.log("Seed completed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
