"use client";

import { xuatThongTinBHXHById } from "@/actions/theo-doi-bhxh";
import { Button } from "@mantine/core";
import { IconFileExcel } from "@tabler/icons-react";

export function ExcelBtn({ id }: { id: number }) {
  const handleXuatExcel = async () => {
    const base64Url = await xuatThongTinBHXHById(id);
    const link = document.createElement("a");
    link.href = base64Url;
    link.download = "export.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <Button
      onClick={() => handleXuatExcel()}
      color="green"
      leftSection={<IconFileExcel />}
    >
      Xuất thông tin Excel
    </Button>
  );
}
