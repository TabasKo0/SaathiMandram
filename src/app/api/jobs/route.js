// app/api/jobs/route.js
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const jobs = db.prepare("SELECT * FROM jobs").all();

    // Add applicant count for each job
    const jobsWithCount = jobs.map(job => {
      const count = db.prepare("SELECT COUNT(*) as count FROM applications WHERE job_id = ?").get(job.id);
      return { ...job, applicant_count: count.count };
    });

    return NextResponse.json(jobsWithCount);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const {
      recruiter_phone,
      area_of_work,
      pay,
      job_description,
      job_type,
      benefits,
      location
    } = await request.json();

    if (!recruiter_phone || !area_of_work || !pay) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const recruiter = db.prepare("SELECT * FROM users WHERE phone = ?").get(recruiter_phone);

    if (!recruiter || recruiter.is_recruiter !== 1) {
      return NextResponse.json({ error: "Only recruiters can post jobs" }, { status: 403 });
    }

    db.prepare(
      `INSERT INTO jobs
        (recruiter_phone, area_of_work, pay, job_description, job_type, benefits, applicants, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      recruiter_phone,
      area_of_work,
      pay,
      job_description ?? "",
      job_type ?? "",
      benefits ?? "",
      "[]",
      location ?? ""
    );

    return NextResponse.json({ message: "Job posted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
