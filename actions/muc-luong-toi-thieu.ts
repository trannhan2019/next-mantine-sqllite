"use server";

import { prisma } from "@/lib/prisma";
import { MucLuongToiThieu } from "@/types/muc-luong-toi-thieu";

export const getManyMucLuongToiThieu = async (): Promise<
  MucLuongToiThieu[]
> => {
  const mucLuongToiThieu = await prisma.mucLuongToiThieuVung.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return mucLuongToiThieu;
};
