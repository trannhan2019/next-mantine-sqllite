import {
  Table,
  TableCaption,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { HeSoPhuCap } from "@/types/hs-phu-cap";

type HeSoPhuCapTableProps = {
  dataHeSoPhuCap: HeSoPhuCap[];
  dataHeSoTrachNhiem: HeSoPhuCap[];
};

export function HeSoPhuCapTable({
  dataHeSoPhuCap,
  dataHeSoTrachNhiem,
}: HeSoPhuCapTableProps) {
  const phuCapTable = (
    <Table highlightOnHover withRowBorders withTableBorder captionSide="top">
      <TableCaption className="font-bold uppercase">Hệ số phụ cấp</TableCaption>
      <TableThead>
        <TableTr>
          <TableTh>STT</TableTh>
          <TableTh>Chức danh</TableTh>
          <TableTh>Hệ số</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {dataHeSoPhuCap.map((item, index) => (
          <TableTr key={item.id}>
            <TableTd>{index + 1}</TableTd>
            <TableTd>{item.chucDanh}</TableTd>
            <TableTd>{item.heSo.toLocaleString("vi-VN")}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );

  const heSoTrachNhiemTable = (
    <Table highlightOnHover withRowBorders withTableBorder captionSide="top">
      <TableCaption className="font-bold uppercase">
        Hệ số trách nhiệm
      </TableCaption>
      <TableThead>
        <TableTr>
          <TableTh>STT</TableTh>
          <TableTh>Chức danh</TableTh>
          <TableTh>Hệ số</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {dataHeSoTrachNhiem.map((item, index) => (
          <TableTr key={item.id}>
            <TableTd>{index + 1}</TableTd>
            <TableTd>{item.chucDanh}</TableTd>
            <TableTd>{item.heSo.toLocaleString("vi-VN")}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );

  return (
    <div className="flex flex-col md:flex-row gap-7">
      <div className="w-full">{phuCapTable}</div>
      <div className="w-full">{heSoTrachNhiemTable}</div>
    </div>
  );
}
