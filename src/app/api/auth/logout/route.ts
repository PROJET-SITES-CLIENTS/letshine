import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Clear all NextAuth cookies
  res.cookies.set("next-auth.session-token", "", { expires: new Date(0), path: "/" });
  res.cookies.set("next-auth.callback-url", "", { expires: new Date(0), path: "/" });
  res.cookies.set("next-auth.csrf-token", "", { expires: new Date(0), path: "/" });
  return res;
}
