"use server";

import { prisma } from "@/lib/prisma";
import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";

export const getTheoDoiBHXH = async (): Promise<ThongTinBHXHResponse[]> => {
    const thongTinBHXH = await prisma.thongTinBHXH.findMany({
        include: {
            nhanVien: {
                include: {
                    phong: true
                },
            },
            bacNgachLuong: {
                include: {
                    ngach: true
                }
            },
            phuCap: true,
            trachNhiem: true,
        },
    });
    return thongTinBHXH;
}
