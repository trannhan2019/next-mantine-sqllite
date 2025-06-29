import { MucLuongToiThieu } from "@/types/muc-luong-toi-thieu";
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import dayjs from "dayjs";

interface Props {
  data: MucLuongToiThieu[];
}

export function MucLuongToiThieuTable({ data }: Props) {
  return (
    <div>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>STT</TableTh>
            <TableTh>Mức lương tối thiểu (đồng/tháng)</TableTh>
            <TableTh>Thời gian áp dụng</TableTh>
            <TableTh>Căn cứ pháp lý</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {data.map((item, index) => (
            <TableTr key={item.id}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{item.mucLuong.toLocaleString("vi-VN")}</TableTd>
              <TableTd>
                {dayjs(item.thoiGianApdung)
                  .format("DD/MM/YYYY")
                  .toLocaleLowerCase()}
              </TableTd>
              <TableTd>{item.canCuPhapLy}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  );
}
