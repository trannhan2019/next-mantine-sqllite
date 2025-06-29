import { NgachLuongWithBac } from "@/types/ngach-luong";
import { NgachLuongCard } from "./card";

interface Props {
  data: NgachLuongWithBac[];
}
export function NgachLuongList({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <NgachLuongCard key={item.id} data={item} />
      ))}
    </div>
  );
}
