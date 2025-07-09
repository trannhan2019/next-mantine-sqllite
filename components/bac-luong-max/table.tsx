import { Table, TableThead, TableTr, TableTh, TableTd, TableTbody } from "@mantine/core";
import { BacLuongMax } from "@/types/bac-luong-max";

interface Props {
    data: BacLuongMax[];
}

export function BacLuongMaxTable({ data }: Props) {
    return (
        <Table withTableBorder highlightOnHover>
            <TableThead>
                <TableTr>
                    <TableTh>STT</TableTh>
                    <TableTh>Mã Ngạch</TableTh>
                    <TableTh>Bậc max</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {data.map((element, idx) => (
                    <TableTr key={element.id}>
                        <TableTd>{idx + 1}</TableTd>
                        <TableTd>{element.maNgach}</TableTd>
                        <TableTd>{element.bacMax}</TableTd>
                    </TableTr>
                ))}
            </TableTbody>
        </Table>
    );
}