"use client";

import { Table } from "@mantine/core";
import { Phong } from "@/types/phong";

interface Props {
    data: Phong[];
}

export function PhongTable({ data }: Props) {
    const rows = data.map((element,idx) => (
        <Table.Tr key={element.id}>
          <Table.Td>{idx + 1}</Table.Td>
          <Table.Td>{element.ten}</Table.Td>
          <Table.Td>{element.tenVietTat}</Table.Td>
        </Table.Tr>
      ));
    
      return (
        <Table>
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