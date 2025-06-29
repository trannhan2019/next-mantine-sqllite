"use client";

import { SegmentedControl } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconShoppingCart,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "./sidebar.module.css";

// Menu items.
const tabs = {
  main: [
    { link: "/", label: "Theo dõi BHXH", icon: IconBellRinging },
    { link: "", label: "Billing", icon: IconReceipt2 },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "SSH Keys", icon: IconKey },
  ],
  quanly: [
    {
      link: "/quan-ly-phong-cbnv-chucvu",
      label: "Phòng, Nhân viên, Chức vụ",
      icon: IconShoppingCart,
    },
    {
      link: "/quan-ly-ngach-bac-luong",
      label: "Bậc, ngạch lương",
      icon: IconLicense,
    },
    { link: "", label: "Reviews", icon: IconMessage2 },
    { link: "", label: "Messages", icon: IconMessages },
  ],
};

export function Sidebar() {
  const pathname = usePathname();
  const [section, setSection] = useState<"main" | "quanly">("main");
  useEffect(() => {
    if (pathname.startsWith("/quan-ly")) {
      setSection("quanly");
    } else {
      setSection("main");
    }
  }, [pathname]);

  const links = tabs[section].map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathname || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <SegmentedControl
          value={section}
          onChange={(value: string) => setSection(value as "main" | "quanly")}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Menu Theo dõi", value: "main" },
            { label: "Menu Quản lý", value: "quanly" },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
