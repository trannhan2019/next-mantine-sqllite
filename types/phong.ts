import { NhanVien } from "./nhan-vien";

export type Phong = {
  id: number;
  ten: string;
  tenVietTat: string;
  soThuTu: number;
};

export type PhongWithNhanVien = Phong & {
  nhanVien: NhanVien[];
};
