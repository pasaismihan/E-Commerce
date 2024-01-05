import prisma from '@/libs/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";



export async function getSession() {
    // getServerSession fonksiyonu next-auth uzerinden kullanilip serverda bulunan authentication bilgilerini getServerSession icerisine gonderiyoruz
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        // asenkron olarak olusturdugumuz getSession fonksiyonunu burada bekleyerek session degiskeni ile kullaniyoruz
        const session = await getSession();

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })
        if (!currentUser) {
            return null
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(), // createdAt ozelligini toISOString ile tarih ve saat formatina cevirip createdAt adiyla kullaniyoruz
            updatedAt: currentUser.updatedAt.toISOString(), // updatedAt ozelligini toISOString ile tarih ve saat formatina cevirip updatedAt adiyla kullaniyoruz
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error:any) {
        return null
    }
}