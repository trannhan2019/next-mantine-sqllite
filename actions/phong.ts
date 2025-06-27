"use server";

import { Phong } from "@/types/phong";
import { prisma } from "@/lib/prisma";

export const getManyPhong = async (): Promise<Phong[]> => {
  const phong = await prisma.phong.findMany({
    orderBy: {
      soThuTu: "asc",
    },
  });
  return phong;
};
