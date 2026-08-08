import { NextResponse } from "next/server";

// Public registration is disabled — only the admin can manage accounts.
// To create new admin accounts, use the admin dashboard or the seed script.
export async function POST() {
  return NextResponse.json(
    { error: "L'inscription publique est désactivée. Seul l'administrateur peut créer des comptes." },
    { status: 403 }
  );
}
