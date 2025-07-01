import {
  List,
  ListItem,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";
import { getManyMucLuongToiThieu } from "@/actions/muc-luong-toi-thieu";
import dayjs from "dayjs";

const mucLuongToiThieu = await getManyMucLuongToiThieu();
const mucLuong = mucLuongToiThieu[0].mucLuong;

const calculateTotalSalary = (item: ThongTinBHXHResponse, mucLuong: number) => {
  const phuCapSalary = item.phuCap ? item.phuCap.heSo * mucLuong : 0;
  const trachNhiemSalary = item.trachNhiem
    ? item.trachNhiem.heSo * mucLuong
    : 0;
  const bacSalary = item.bacNgachLuong.heSo * mucLuong;
  return phuCapSalary + trachNhiemSalary + bacSalary;
};

export function TheoDoiBHXHTable({ data }: { data: ThongTinBHXHResponse[] }) {
  return (
    <Table highlightOnHover withTableBorder>
      <TableThead>
        <TableTr>
          <TableTh>STT</TableTh>
          <TableTh>Họ và tên</TableTh>
          <TableTh>Phòng</TableTh>
          <TableTh>Chức danh</TableTh>
          <TableTh>Mức lương (đồng)</TableTh>
          <TableTh>Thời gian áp dụng</TableTh>
          <TableTh>Thời gian nâng bậc tiếp theo</TableTh>
          <TableTh>Trách nhiệm</TableTh>
          <TableTh>Thành tiền</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((item, index) => (
          <TableTr key={item.id}>
            <TableTd>{index + 1}</TableTd>
            <TableTd>{item.nhanVien.ten}</TableTd>
            <TableTd>{item.nhanVien.phong.ten}</TableTd>
            <TableTd>
              <List size="sm">
                {item.phuCap && (
                  <ListItem>
                    {item.phuCap.chucDanh}, hệ số{" "}
                    {item.phuCap.heSo.toLocaleString("vi-VN")}
                  </ListItem>
                )}
                {item.trachNhiem && (
                  <ListItem>
                    {item.trachNhiem.chucDanh}, hệ số{" "}
                    {item.trachNhiem.heSo.toLocaleString("vi-VN")}
                  </ListItem>
                )}
                <ListItem>
                  {item.ngachLuong.chucDanh}, bậc {item.bacNgachLuong.bac}, hệ
                  số {item.bacNgachLuong.heSo.toLocaleString("vi-VN")}
                </ListItem>
              </List>
            </TableTd>
            <TableTd>
              {calculateTotalSalary(item, mucLuong).toLocaleString("vi-VN")}
            </TableTd>
            <TableTd>{item.ngayApDung.toLocaleString("vi-VN")}</TableTd>
            <TableTd>
             {dayjs(item.ngayApDung).add(item.bacNgachLuong.thoiGianNangBac, "day").format("DD/MM/YYYY")}
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
