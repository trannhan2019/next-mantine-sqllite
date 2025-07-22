import {
  Anchor,
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
import Link from "next/link";

const mucLuongToiThieu = await getManyMucLuongToiThieu();
const mucLuong = mucLuongToiThieu[0].mucLuong;

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
            <TableTd>
              <Anchor
                component={Link}
                href={`/theo-doi-bhxh/${item.id}`}
                c="gray.9"
                fz="sm"
              >
                {item.nhanVien.ten}
              </Anchor>
            </TableTd>
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
                  {item.ngachLuong.chucDanh}, bậc {item.bacLuong.bac}, hệ số{" "}
                  {item.bacLuong.heSo.toLocaleString("vi-VN")}
                </ListItem>
              </List>
            </TableTd>
            <TableTd>
              {calculateTotalSalary(
                item.phuCap?.heSo,
                item.trachNhiem?.heSo,
                item.bacLuong,
                mucLuong
              ).toLocaleString("vi-VN")}
            </TableTd>
            <TableTd>{item.ngayApDung.toLocaleDateString("vi-VN")}</TableTd>
            <TableTd>
              {isBacLuongMax(item.bacLuong, item.ngachLuong.bacNgach) ||
              item.isMaxBac ? (
                <Badge variant="outline" color="green">
                  Đã max bậc
                </Badge>
              ) : (
                <Badge
                  color={formatColorTheoNgayApDung(
                    item.ngayApDung,
                    item.bacLuong.thoiGianNangBac
                  )}
                >
                  {formatNgayApDungTiepTheo(
                    item.ngayApDung,
                    item.bacLuong.thoiGianNangBac
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
