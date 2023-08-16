import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    // Move the PrismaClient instantiation and usage inside the server-side block
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    const registration = await prisma.registration.findMany({
      where: {
        userId: user.id,
      },
    });

    // Close the Prisma client connection after use
    await prisma.$disconnect();

    return NextResponse.json(registration);
  } catch (error) {
    return new Response("Error retrieving registrations");
  }
}