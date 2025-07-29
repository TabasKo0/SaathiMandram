// app/api/apply/route.js
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { phone, job_id } = await req.json();

    if (!phone || !job_id) {
      return NextResponse.json({ error: "Missing phone or job ID" }, { status: 400 });
    }

    // Check if already applied
    const existing = db.prepare("SELECT * FROM applications WHERE phone = ? AND job_id = ?").get(phone, job_id);
    if (existing) {
      return NextResponse.json({ error: "Already applied" }, { status: 409 });
    }

    db.prepare("INSERT INTO applications (phone, job_id) VALUES (?, ?)").run(phone, job_id);

    return NextResponse.json({ message: "Application successful" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
