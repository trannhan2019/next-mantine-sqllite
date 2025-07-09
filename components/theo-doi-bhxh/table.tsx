import {
  Badge,
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
import {
  calculateTotalSalary,
  formatColorTheoNgayApDung,
  formatNgayApDungTiepTheo,
  isBacLuongMax,
} from "@/lib/util";
import { getManyBacLuongMax } from "@/actions/bac-luong-max";

const mucLuongToiThieu = await getManyMucLuongToiThieu();
const mucLuong = mucLuongToiThieu[0].mucLuong;
const bacLuongMax = await getManyBacLuongMax();

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
                  {item.bacNgachLuong.ngach.chucDanh}, bậc{" "}
                  {item.bacNgachLuong.bac}, hệ số{" "}
                  {item.bacNgachLuong.heSo.toLocaleString("vi-VN")}
                </ListItem>
              </List>
            </TableTd>
            <TableTd>
              {calculateTotalSalary(item, mucLuong).toLocaleString("vi-VN")}
            </TableTd>
            <TableTd>{item.ngayApDung.toLocaleString("vi-VN")}</TableTd>
            <TableTd>
              {isBacLuongMax(item.bacNgachLuong, bacLuongMax) ||
              item.isMaxBac ? (
                <Badge variant="outline" color="green">
                  Đã max bậc
                </Badge>
              ) : (
                <Badge color={formatColorTheoNgayApDung(item.ngayApDung, item.bacNgachLuong.thoiGianNangBac)}>
                  {formatNgayApDungTiepTheo(
                    item.ngayApDung,
                    item.bacNgachLuong.thoiGianNangBac
                  )}
                </Badge>
              )}
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
