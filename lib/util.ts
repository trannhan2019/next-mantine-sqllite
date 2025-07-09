import { BacLuongWithNgach } from "@/types/bac-luong";
import { BacLuongMax } from "@/types/bac-luong-max";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import dayjs from "dayjs";
import { DAY_15, DAY_30, DAY_7 } from "./constants";

export const timBacLuongMaxTheoNgach = (bacLuong: BacLuongWithNgach, bacLuongMax: BacLuongMax[]) => {
    const bacLuongMaxTheoNgach = bacLuongMax.find((item) => item.maNgach === bacLuong.ngach.maNgach);
    return bacLuongMaxTheoNgach;
}

export const formatNgayApDungTiepTheo = (ngayApDung: Date, thoiGianNangBac: number) => {
    return dayjs(ngayApDung)
        .add(thoiGianNangBac, "day")
        .format("DD/MM/YYYY");
}

export const formatColorTheoNgayApDung = (ngayApDung: Date, thoiGianNangBac: number) => {
    const ngayHientai = dayjs();
    const ngayApDungTiepTheo = dayjs(ngayApDung).add(thoiGianNangBac, "day");

    const soNgayConLai = ngayApDungTiepTheo.diff(ngayHientai, "day");

    // console.log(ngayHientai, ngayApDungTiepTheo, soNgayConLai); 
    // THỜI GIAN ĐỀU LẤY THEO GIỜ Z - GMT+0

    if (soNgayConLai < DAY_7) {
        return "red";
    } else if (soNgayConLai < DAY_15) {
        return "orange";
    } else if (soNgayConLai < DAY_30) {
        return "yellow";
    } else {
        return "blue";
    }
}

export const isBacLuongMax = (bacLuong: BacLuongWithNgach, bacLuongMax: BacLuongMax[]) => {
    const bacLuongMaxTheoNgach = timBacLuongMaxTheoNgach(bacLuong, bacLuongMax);
    return bacLuongMaxTheoNgach?.bacMax === bacLuong.bac;
}

export const calculateTotalSalary = (item: ThongTinBHXHResponse, mucLuong: number) => {
  const phuCapSalary = item.phuCap ? item.phuCap.heSo * mucLuong : 0;
  const trachNhiemSalary = item.trachNhiem
    ? item.trachNhiem.heSo * mucLuong
    : 0;
  const bacSalary = item.bacNgachLuong.heSo * mucLuong;
  return phuCapSalary + trachNhiemSalary + bacSalary;
};