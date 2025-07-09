import { BacLuongWithNgach } from "./bac-luong";
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
    isMaxBac: boolean;
}

export type ThongTinBHXHResponse = ThongTinBHXH & {
    nhanVien: NhanVienWithPhong;
    bacNgachLuong: BacLuongWithNgach;
    phuCap: HeSoPhuCap | null;
    trachNhiem: HeSoPhuCap | null;
}