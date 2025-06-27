import { ChucVu } from "./chuc-vu";
import { Phong } from "./phong";

export type NhanVien = {
  id: number;
  ten: string;
  soThuTu: number;
};

export type NhanVienWithChucVu = NhanVien & {
  chucVu: ChucVu;
};

export type NhanVienWithPhong = NhanVien & {
  phong: Phong;
};

export type NhanVienWithPhongChucVu = NhanVien & {
  phong: Phong;
  chucVu: ChucVu;
};

export type NhanVienWithPhongChucVuTotal = {
  data: NhanVienWithPhongChucVu[];
  total: number;
};
