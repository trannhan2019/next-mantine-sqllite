import { tinhSoNgayNangBacConLai } from "@/lib/util";
import { ThongTinBHXHWithNhanVienNgachLuongBacLuong } from "@/types/thong-tin-bhxh";
import { ActionIcon, Indicator, Menu } from "@mantine/core";
import { IconBellRinging } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  data: ThongTinBHXHWithNhanVienNgachLuongBacLuong[] | undefined;
}

export function NotificationHeader({ data }: Props) {
  return (
    <Menu width={300}>
      <Menu.Target>
        <Indicator color="red" processing inline label={data?.length} size={14}>
          <ActionIcon variant="subtle" size={"lg"}>
            <IconBellRinging />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown className="h-[400px] overflow-y-scroll">
        <Menu.Label>Notifications</Menu.Label>
        {data?.map((item) => (
          <Menu.Item
            key={item.id}
            component={Link}
            href={`/theo-doi-bhxh/${item.id}`}
          >
            {item.nhanVien.ten} còn{" "}
            {tinhSoNgayNangBacConLai(
              item.ngayApDung,
              item.bacLuong.thoiGianNangBac
            )}{" "}
            ngày đến hạn nâng lương BHXH
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
