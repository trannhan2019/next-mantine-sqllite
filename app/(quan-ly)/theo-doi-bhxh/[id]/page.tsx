import { Title, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ChiTietBHXHCard } from "@/components/chi-tiet-bhxh/card";

export default async function TheoDoiBHXHChiTietPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button
          size="xs"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft />}
          component={Link}
          href="/theo-doi-bhxh"
        ></Button>
        <Title order={2} c="gray.8"> Bảng theo dõi chi tiết của ông {id}  </Title>
      </div>
      <ChiTietBHXHCard />
    </div>
  );
}
