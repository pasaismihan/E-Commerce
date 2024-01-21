import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  // kullanicidan gelen istegi json formatina ceviriyoruz
  const body = await request.json();
  // istekten gelen verileri cikartiyoruz (json formatinda oldugu icin {} kullanarak verileri direkt aliyoruz)
  const { name, description, brand, price, inStock, category, image } = body;

  // Veritabanina yeni kullanici ekliyoruz
  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      price: parseFloat(price),
      inStock,
      category,
      image,
    },
  });

  return NextResponse.json(product);
}
