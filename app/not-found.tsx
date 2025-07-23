import { Bg404 } from "@/components/common/bg-404";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import classes from "./not-found.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Bg404 className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Group justify="center" className="mt-4">
            <Button component={Link} href="/" size="md">
              Trở về trang chủ
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
