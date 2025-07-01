"use client";

import { Chip, Group, Pagination, Select, Table } from "@mantine/core";
import { NhanVienWithPhongChucVu } from "@/types/nhan-vien";
import { usePhanTrang } from "@/hooks/phan-trang";
import { IconX } from '@tabler/icons-react';

interface Props {
  data: NhanVienWithPhongChucVu[];
  total: number;
}

export function NhanVienTable({ data, total }: Props) {
  const {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  } = usePhanTrang(total);

  const rows = data.map((element, idx) => (
    <Table.Tr key={element.id}>
      <Table.Td>{(currentPage - 1) * pageSize + idx + 1}</Table.Td>
      <Table.Td>{element.ten}</Table.Td>
      <Table.Td>{element.phong.ten}</Table.Td>
      <Table.Td>{element.chucVu.ten}</Table.Td>
      <Table.Td>{element.isActive ? <Chip defaultChecked color="green">Hoạt động</Chip> : <Chip color="red" icon={<IconX size={16} />} defaultChecked>Ngừng hoạt động</Chip>}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Họ và tên</Table.Th>
            <Table.Th>Phòng</Table.Th>
            <Table.Th>Chức vụ</Table.Th>
            <Table.Th>Tình trạng</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Group mt="md" justify="flex-end">
        <Select
          data={["5", "10", "20", "50"]}
          value={String(pageSize)}
          onChange={handlePageSizeChange}
          w={80}
        />
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      </Group>
    </div>
  );
}
