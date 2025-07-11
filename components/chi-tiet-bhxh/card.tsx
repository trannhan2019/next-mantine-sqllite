"use client";

import { Card, Group, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

export function ChiTietBHXHCard() {
  return (
    <Card shadow="md" radius="md">
      <Group>
        <IconUserCircle color="green" />
        <Text>Họ và tên: <span className="font-semibold">Nguyễn Văn A</span></Text>
      </Group>
      <Group>
        <IconUserCircle color="green" />
        <Text>Phòng: <span className="font-semibold">Phòng A</span></Text>
      </Group>
      <Text>Chức vụ: Chức vụ A</Text>
      <Text>Ngày áp dụng: 01/01/2022</Text>
      <Text>Thời gian nâng bậc: 01/01/2022</Text>
      <Text>Thời gian nâng bậc: 01/01/2022</Text>
    </Card>
  );
}
