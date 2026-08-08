import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const password = await bcrypt.hash("admin123", 12);
    const admin = await db.user.upsert({
      where: { email: "admin@letsshine.africa" },
      update: {},
      create: {
        email: "admin@letsshine.africa",
        name: "Admin LET'S SHINE",
        password,
        role: "ADMIN",
        country: "Guinée",
      },
    });
    return NextResponse.json({ 
      success: true, 
      message: "Admin created successfully!", 
      email: admin.email 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
