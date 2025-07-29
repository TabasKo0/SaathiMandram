"use client";

import React, { useEffect, useState } from 'react';

const dummyJobs = [
  {
    id: "JOB001",
    area_of_work: "Electrician",
    location: "Chennai",
    pay: "₹20,000/month",
    benefits: "Free lunch, Transport allowance",
    job_description: "Install and maintain wiring.",
    job_type: "Full-Time",
    recruiter_phone: "9876543210"
  },
  {
    id: "JOB002",
    area_of_work: "Housekeeping Staff",
    location: "Mumbai",
    pay: "₹15,000/month",
    benefits: "Health insurance",
    job_description: "Maintain cleanliness in rooms.",
    job_type: "Part-Time",
    recruiter_phone: "9876543211"
  }
];

const JobBubbles = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  const [applied, setApplied] = useState({}); // track applied jobs

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => {
        if (!res.ok) throw new Error('Server Error');
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setError(true);
        setJobs(dummyJobs);
      });
  }, []);

  const handleApply = async (jobId) => {
    const phone = sessionStorage.getItem("phoneOnly");
    if (!phone) return alert("Please log in to apply.");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, job_id: jobId })
      });

      const result = await res.json();
      if (res.ok) {
        alert("Application submitted successfully!");
        setApplied(prev => ({ ...prev, [jobId]: true }));
      } else {
        alert("Error: " + result.error || "Something went wrong");
      }
    } catch (err) {
      alert("Application failed: " + err.message);
    }
  };

  return (
    <div className="p-4">
      {error && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-4 rounded">
          Server not responding. Showing sample jobs.
        </div>
      )}

      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job.id} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
            <h2 className="text-2xl font-bold text-green-700">{job.area_of_work}</h2>
            <p className="text-black text-xl"><strong>Location:</strong> {job.location}</p>
            <p className="text-black"><strong>Pay:</strong> {job.pay}</p>
            <p className="text-black"><strong>Description:</strong> {job.job_description}</p>
            <p className="text-black"><strong>Benefits:</strong> {job.benefits}</p>
            <p className="text-black"><strong>Job Type:</strong> {job.job_type}</p>
            <p className="text-black"><strong>Contact:</strong> {job.recruiter_phone}</p>
            <p className="text-black"><strong>Applicants:</strong> {job.applicant_count}</p>
            <button
              className={`mt-4 px-4 py-2 rounded font-semibold ${
                applied[job.id]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
              disabled={applied[job.id]}
              onClick={() => handleApply(job.id)}
            >
              {applied[job.id] ? "Applied" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobBubbles;
