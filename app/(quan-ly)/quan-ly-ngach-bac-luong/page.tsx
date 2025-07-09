import { MucLuongToiThieuTable } from "@/components/muc-luong-toi-thieu/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { getManyMucLuongToiThieu } from "@/actions/muc-luong-toi-thieu";
import { HeSoPhuCapTable } from "@/components/he-so-phu-cap/table";
import { getManyHeSoPhuCap, getManyHeSoTrachNhiem } from "@/actions/hs-phu-cap";
import { NgachLuongList } from "@/components/ngach-luong/list";
import { getManyNgachLuong } from "@/actions/ngach-luong";
import { BacLuongMaxTable } from "@/components/bac-luong-max/table";
import { getManyBacLuongMax } from "@/actions/bac-luong-max";

export default async function QuanLyBacLuong() {
  const mucLuongToiThieu = await getManyMucLuongToiThieu();
  const heSoPhuCap = await getManyHeSoPhuCap();
  const heSoTrachNhiem = await getManyHeSoTrachNhiem();
  const ngachLuong = await getManyNgachLuong();
  const bacLuongMax = await getManyBacLuongMax();
  return (
    <div>
      <Tabs defaultValue="ngachBacLuong">
        <TabsList mb={"md"}>
          <TabsTab value="ngachBacLuong" leftSection={<IconPhoto size={12} />}>
            Ngạch, bậc lương
          </TabsTab>
          <TabsTab value="phuCap" leftSection={<IconPhoto size={12} />}>
            Hệ số phụ cấp, trách nhiệm
          </TabsTab>
          <TabsTab value="bacLuongMax" leftSection={<IconPhoto size={12} />}>
            Bậc lương max
          </TabsTab>
          <TabsTab
            value="mucLuongToiThieu"
            leftSection={<IconPhoto size={12} />}
          >
            Mức lương tối thiểu vùng
          </TabsTab>
        </TabsList>

        <TabsPanel value="ngachBacLuong">
          <NgachLuongList data={ngachLuong} />
        </TabsPanel>
        <TabsPanel value="phuCap">
          <HeSoPhuCapTable
            dataHeSoPhuCap={heSoPhuCap}
            dataHeSoTrachNhiem={heSoTrachNhiem}
          />
        </TabsPanel>
        <TabsPanel value="bacLuongMax">
          <BacLuongMaxTable data={bacLuongMax} />
        </TabsPanel>
        <TabsPanel value="mucLuongToiThieu">
          <MucLuongToiThieuTable data={mucLuongToiThieu} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}
