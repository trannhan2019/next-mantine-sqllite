import { BacLuong } from "./bac-luong";
import { HeSoPhuCap } from "./hs-phu-cap";
import { NgachLuongWithBac } from "./ngach-luong";
import { NhanVien, NhanVienWithPhong } from "./nhan-vien";

export type ThongTinBHXH = {
  id: number;
  nhanVienId: number;
  bacLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  ngayApDung: Date;
  thongTin: string | null;
  isMaxBac: boolean;
  lastEmailSentAt: Date | null;
};

export type ThongTinBHXHWithNhanVienNgachLuongBacLuong = ThongTinBHXH & {
  nhanVien: NhanVien;
  ngachLuong: NgachLuongWithBac;
  bacLuong: BacLuong;
};

export type ThongTinBHXHResponse = ThongTinBHXH & {
  nhanVien: NhanVienWithPhong;
  ngachLuong: NgachLuongWithBac;
  bacLuong: BacLuong;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
};
