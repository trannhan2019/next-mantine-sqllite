import { Title, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ChiTietBHXHCard } from "@/components/chi-tiet-bhxh/card";
import { getTheoDoiBHXHById } from "@/actions/theo-doi-bhxh";
import { getManyMucLuongToiThieu } from "@/actions/muc-luong-toi-thieu";
import { ChiTietBHXHTable } from "@/components/chi-tiet-bhxh/table";
import { ExcelBtn } from "@/components/chi-tiet-bhxh/excel-btn";

export default async function TheoDoiBHXHChiTietPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dataBHXH = await getTheoDoiBHXHById(parseInt(id));
  const mucLuongToiThieu = await getManyMucLuongToiThieu();
  const mucLuong = mucLuongToiThieu[0].mucLuong;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-4">
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft />}
            component={Link}
            href="/theo-doi-bhxh"
          ></Button>
          <Title order={3} c="gray.8" className="uppercase">
            Bảng theo dõi chi tiết
          </Title>
        </div>
        <ExcelBtn id={parseInt(id)} />
      </div>
      <ChiTietBHXHCard data={dataBHXH} mucLuong={mucLuong} />
      <ChiTietBHXHTable />
    </div>
  );
}
