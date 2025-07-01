import { BacLuong } from "./bac-luong";
import { HeSoPhuCap } from "./hs-phu-cap";
import { NhanVienWithPhong } from "./nhan-vien";


export type ThongTinBHXH = {
    id: number;
    nhanVienId: number;
    bacNgachLuongId: number;
    phuCapId: number | null;
    trachNhiemId: number | null;
    ngayApDung: Date;
    thongTin: string | null;
}

export type ThongTinBHXHResponse = ThongTinBHXH & {
    nhanVien: NhanVienWithPhong;
    bacNgachLuong: BacLuong;
    phuCap: HeSoPhuCap | null;
    trachNhiem: HeSoPhuCap | null;
}