import { Title } from "@mantine/core";
import { getTheoDoiBHXH } from "@/actions/theo-doi-bhxh";
import { TheoDoiBHXHTable } from "@/components/theo-doi-bhxh/table";

export default async function TheoDoiBHXH() {
  const dataBHXH = await getTheoDoiBHXH();
  return (
    <div>
      <Title order={2} mb="md"> Theo dõi BHXH </Title>
      <TheoDoiBHXHTable data={dataBHXH} />
    </div>
  );
}
