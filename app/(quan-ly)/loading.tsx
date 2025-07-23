import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <LoadingOverlay
      visible={true}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 3, opacity: 0.1 }}
      loaderProps={{ type: "bars" }}
    />
  );
}
