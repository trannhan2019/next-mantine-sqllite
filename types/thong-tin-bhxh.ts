import { BacLuong } from "./bac-luong";
import { HeSoPhuCap } from "./hs-phu-cap";
import { NgachLuongWithBac } from "./ngach-luong";
import { NhanVienWithPhong } from "./nhan-vien";

export type ThongTinBHXH = {
  id: number;
  nhanVienId: number;
  bacLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  ngayApDung: Date;
  thongTin: string | null;
  isMaxBac: boolean;
};

export type ThongTinBHXHResponse = ThongTinBHXH & {
  nhanVien: NhanVienWithPhong;
  ngachLuong: NgachLuongWithBac;
  bacLuong: BacLuong;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
};
