"use server";

import { prisma } from '@/lib/prisma';
import { BacLuongMax } from '@/types/bac-luong-max';

export const getManyBacLuongMax = async ():Promise<BacLuongMax[]> => {
    const bacLuongMax = await prisma.bacLuongMax.findMany({
        orderBy: {
            id: 'asc'
        }
    })
    return bacLuongMax
}