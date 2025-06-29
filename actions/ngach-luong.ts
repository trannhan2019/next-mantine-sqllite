"use server";

import { prisma } from "@/lib/prisma";
import { NgachLuongWithBac } from "@/types/ngach-luong";

export const getManyNgachLuong = async (): Promise<NgachLuongWithBac[]> => {
  const ngachLuong = await prisma.ngachLuong.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      bacNgach: true,
    },
  });

  return ngachLuong;
};
