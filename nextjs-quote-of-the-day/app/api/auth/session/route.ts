// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;    

    if (!token) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ data: null }, { status: 200 });
    }    

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("session route error:", error);
    
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 },
    );
  }
}
