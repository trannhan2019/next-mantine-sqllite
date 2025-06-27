"use server";

import { ChucVu } from '@/types/chuc-vu';
import { prisma } from '@/lib/prisma';


export const getManyChucVu = async ():Promise<ChucVu[]> => {
    const chucVu = await prisma.chucVu.findMany({
        orderBy: {
            id: 'asc'
        }
    })
    return chucVu
}