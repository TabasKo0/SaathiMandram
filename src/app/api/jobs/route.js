import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  const {
    recruiter_phone,
    area_of_work,
    pay,
    job_description,
    job_type,
    benefits
  } = await request.json();

  try {
    const recruiter = db.prepare("SELECT * FROM users WHERE phone = ?").get(recruiter_phone);

    if (!recruiter || !recruiter.is_recruiter) {
      return NextResponse.json({ error: "Only recruiters can post jobs" }, { status: 403 });
    }

    db.prepare(
      `INSERT INTO jobs
        (recruiter_phone, area_of_work, pay, job_description, job_type, benefits, applicants)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      recruiter_phone, area_of_work, pay, job_description, job_type, benefits, "[]"
    );

    return NextResponse.json({ message: "Job posted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
