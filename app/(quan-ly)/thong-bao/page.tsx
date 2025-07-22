import { List, ListItem, ThemeIcon, Title } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons-react";

const data = [
  {
    id: 1,
    title: "ông Nguyễn Văn A đã đến hạn nâng lương BHXH",
    content: "Noi dung 1",
  },
  {
    id: 2,
    title: "Tieu de 2",
    content: "Noi dung 2",
  },
  {
    id: 3,
    title: "Tieu de 3",
    content: "Noi dung 3",
  },
];

export default function ThongBaoPage() {
  return (
    <div>
      <Title order={3}>Tất cả thông báo</Title>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleDashed size={16} />
          </ThemeIcon>
        }
      >
        {data.map((item) => (
          <ListItem key={item.id}>{item.title}</ListItem>
        ))}
      </List>
    </div>
  );
}
