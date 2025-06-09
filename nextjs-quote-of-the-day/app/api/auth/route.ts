import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  setAuthCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { action, name, email, password } = await request.json();
    console.log(action, name, email, password);

    if (action === "signup") {
      // Signup logic
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "Name, email, and password are required" },
          { status: 400 },
        );
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 },
        );
      }

      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = await generateToken(user);
      setAuthCookie(token);

      return NextResponse.json(
        { data: { user: { id: user.id, name: user.name, email: user.email } } },
        { status: 201 },
      );
    }

    // for login
    else if (action === "login") {
      // Login logic
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 },
        );
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }

      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }

      const token = await generateToken(user);
      await setAuthCookie(token);

      // console.log("route.ts token:", token);
      

      return NextResponse.json(
        { data: { user: { id: user.id, name: user.name, email: user.email } } },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
