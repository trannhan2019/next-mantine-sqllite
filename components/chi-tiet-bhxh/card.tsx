"use client";

import {
  calculateTotalSalary,
  formatNgayApDungTiepTheo,
  isBacLuongMax,
  timBacLuongTiepTheo,
} from "@/lib/util";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import { Badge, Card, Divider, List, Text, Title } from "@mantine/core";

interface Props {
  data: ThongTinBHXHResponse | null;
  mucLuong: number;
}

export function ChiTietBHXHCard({ data, mucLuong }: Props) {
  const bacLuongTiepTheo =
    data?.bacLuong &&
    timBacLuongTiepTheo(data.bacLuong, data.ngachLuong.bacNgach);
  return (
    <Card shadow="md" radius="md">
      <Text>
        Họ và tên: <span className="font-semibold">{data?.nhanVien.ten}</span>
      </Text>

      <Text>
        Phòng: <span className="font-semibold">{data?.nhanVien.phong.ten}</span>
      </Text>

      <List size="md">
        {data?.phuCap && (
          <List.Item>
            {data?.phuCap.chucDanh}, hệ số{" "}
            {data?.phuCap.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        {data?.trachNhiem && (
          <List.Item>
            {data?.trachNhiem.chucDanh}, hệ số{" "}
            {data?.trachNhiem.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        <List.Item>
          {data?.ngachLuong.chucDanh}, bậc {data?.bacLuong.bac}, hệ số{" "}
          {data?.bacLuong.heSo.toLocaleString("vi-VN")}
        </List.Item>
      </List>

      <Text>
        Mức lương:{" "}
        <span className="font-semibold">
          {calculateTotalSalary(
            data?.phuCap?.heSo,
            data?.trachNhiem?.heSo,
            data?.bacLuong,
            mucLuong
          ).toLocaleString("vi-VN")}{" "}
          đồng
        </span>
      </Text>
      <Text>
        Ngày áp dụng:{" "}
        <span className="font-semibold">
          {data?.ngayApDung.toLocaleDateString("vi-VN")}
        </span>
      </Text>
      <Divider my="md" />
      <Title order={4} c="blue.6" mb={"md"}>
        Thông tin nâng bậc tiếp theo
      </Title>
      {isBacLuongMax(data?.bacLuong, data?.ngachLuong.bacNgach) ? (
        <Badge variant="outline" color="green">
          Đã max bậc
        </Badge>
      ) : (
        <div>
          <Text>
            Thời gian nâng bậc tiếp theo:{" "}
            <span className="font-semibold">
              {formatNgayApDungTiepTheo(
                data?.ngayApDung,
                data?.bacLuong?.thoiGianNangBac || 0
              )}
            </span>
          </Text>
          <List size="md">
            {data?.phuCap && (
              <List.Item>
                {data?.phuCap.chucDanh}, hệ số{" "}
                {data?.phuCap.heSo.toLocaleString("vi-VN")}
              </List.Item>
            )}
            {data?.trachNhiem && (
              <List.Item>
                {data?.trachNhiem.chucDanh}, hệ số{" "}
                {data?.trachNhiem.heSo.toLocaleString("vi-VN")}
              </List.Item>
            )}
            <List.Item>
              {data?.ngachLuong.chucDanh}, bậc {bacLuongTiepTheo?.bac}, hệ số{" "}
              {bacLuongTiepTheo?.heSo.toLocaleString("vi-VN")}
            </List.Item>
          </List>
          <Text>
            Mức lương:{" "}
            <span className="font-semibold">
              {calculateTotalSalary(
                data?.phuCap?.heSo,
                data?.trachNhiem?.heSo,
                bacLuongTiepTheo,
                mucLuong
              ).toLocaleString("vi-VN")}{" "}
              đồng
            </span>
          </Text>
        </div>
      )}
    </Card>
  );
}
