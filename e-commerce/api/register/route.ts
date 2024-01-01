import bycrpt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
  // kullanicidan gelen istegi json formatina ceviriyoruz
  const body = await request.json();
  // istekten gelen verileri cikartiyoruz (json formatinda oldugu icin {} kullanarak verileri direkt aliyoruz)
  const { name, email, password } = body;

  const hashedPassword = await bycrpt.hash(password, 10);

  // Veritabanina yeni kullanici ekliyoruz
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
