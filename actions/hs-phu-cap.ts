import { prisma } from "@/lib/prisma";
import { HeSoPhuCap } from "@/types/hs-phu-cap";

export const getManyHeSoPhuCap = async (): Promise<HeSoPhuCap[]> => {
  const heSoPhuCap = await prisma.heSoPhuCap.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return heSoPhuCap;
};

export const getManyHeSoTrachNhiem = async (): Promise<HeSoPhuCap[]> => {
  const heSoTrachNhiem = await prisma.heSoTrachNhiem.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return heSoTrachNhiem;
};
