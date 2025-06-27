"use client";

import { useDisclosure } from "@mantine/hooks";

import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { Sidebar } from "@/components/layout/sidebar";

export default function QuanLyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <span className="font-bold text-3xl text-blue-700">SBA</span>
          <span className="text-2xl">-</span>
          <span className="text-2xl font-semibold">Quản lý BHXH</span>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
       <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
