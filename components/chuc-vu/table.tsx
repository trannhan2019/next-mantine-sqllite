"use client";

import { Table } from "@mantine/core";
import { ChucVu } from "@/types/chuc-vu";

interface Props {
  data: ChucVu[];
}

export function ChucVuTable({ data }: Props) {
  const rows = data.map((element, idx) => (
    <Table.Tr key={element.id}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>{element.ten}</Table.Td>
      <Table.Td>{element.tenVietTat}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Tên phòng</Table.Th>
          <Table.Th>Tên viết tắt</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
