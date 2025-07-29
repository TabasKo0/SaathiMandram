import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawPhone = searchParams.get("phone");
  if (!rawPhone) {
    return NextResponse.json({ error: "Recruiter phone is required" }, { status: 400 });
  }
  const recruiterPhone = rawPhone.replace(/\s+/g, "");

  try {
    // Get jobs posted by this recruiter
    const jobs = db.prepare("SELECT * FROM jobs WHERE recruiter_phone = ?").all(recruiterPhone);

    // Append applicant details per job
    const jobsWithApplicants = jobs.map(job => {
      const applicants = db.prepare(`
       SELECT u.name, u.phone, u.picture_link
FROM applications a
JOIN users u ON a.phone = u.phone
WHERE a.job_id = ?
      `).all(job.id);

      return {
        ...job,
        applicant_count: applicants.length,
        applicants
      };
    });

    return NextResponse.json(jobsWithApplicants);
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
