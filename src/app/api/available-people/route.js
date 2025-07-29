import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const users = db.prepare("SELECT * FROM users WHERE is_recruiter = 0").all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
