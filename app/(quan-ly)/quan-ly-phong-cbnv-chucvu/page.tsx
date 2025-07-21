import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";

import { PhongTable } from "@/components/phong/table";
import { getManyPhong } from "@/actions/phong";
import { ChucVuTable } from "@/components/chuc-vu/table";
import { getManyChucVu } from "@/actions/chuc-vu";
import { getManyNhanVien } from "@/actions/nhan-vien";
import { NhanVienTable } from "@/components/nhan-vien/table";
import { searchParams } from "@/types/common";

export default async function QuanLyPhongCBNVChucVu({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  // Lấy các tham số phân trang từ searchParams
  const { page, pageSize } = await searchParams;
  const pageParam = parseInt(page || "1", 10);
  const pageSizeParam = parseInt(pageSize || "10", 10);

  const phong = await getManyPhong();
  const chucvu = await getManyChucVu();
  const { data, total } = await getManyNhanVien({
    page: pageParam,
    pageSize: pageSizeParam,
  });

  return (
    <div>
      <Tabs defaultValue="phong">
        <TabsList mb={"md"}>
          <TabsTab value="phong">Phòng</TabsTab>
          <TabsTab value="nhanvien">Nhân viên</TabsTab>
          <TabsTab value="chucvu">Chức vụ</TabsTab>
        </TabsList>

        <TabsPanel value="phong">
          <PhongTable data={phong} />
        </TabsPanel>

        <TabsPanel value="nhanvien">
          <NhanVienTable data={data} total={total} />
        </TabsPanel>

        <TabsPanel value="chucvu">
          <ChucVuTable data={chucvu} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}
