import { BacLuong } from "./bac-luong";
import { HeSoPhuCap } from "./hs-phu-cap";

export interface LichSuBHXH {
  id: number;
  nhanVienId: number;
  bacLuongId: number;
  phuCapId: number | null;
  trachNhiemId: number | null;
  mucLuongToiThieuVungId: number;
  ngayApDung: Date | null;
  thongTinQD: string | null;
}

export type LichSuBHXHWithLuong = LichSuBHXH & {
  bacLuong: BacLuong;
  phuCap: HeSoPhuCap | null;
  trachNhiem: HeSoPhuCap | null;
};
