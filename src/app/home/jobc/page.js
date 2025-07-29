"use client";

import React, { useEffect, useState } from "react";
const dummyUser = {
  image: "/dummy.jpg",
  name: "Demo Recruiter",
  age: "N/A",
  gender: "N/A",
  fieldOfWork: "N/A",
  experience: "N/A",
  contact: "N/A",
  bio: "This is demo data.",
  position: "N/A",
  company: "N/A",
  is_recruiter: 1
};

export default function RecruiterJobsPage() {
  // You should replace this with actual logged-in recruiter's phone,
  // e.g. from context, session, or a global state.
   const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
  const [recruiterPhone, setRecruiterPhone] = useState(null);

useEffect(() => {
  const phone = sessionStorage.getItem("phoneOnly");
  setRecruiterPhone(phone);
}, []);
    useEffect(() => {
      const phone = sessionStorage.getItem("phoneOnly");
      if (!phone) {
        setUser(dummyUser);
        setError(true);
        return;
      }
  
      fetch(`/api/users?phone=${phone}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          const mapped = {
            image: data.picture_link || "/dummy.jpg",
            name: data.name || "Unnamed",
            age: data.age || "N/A",
            gender: data.gender || "N/A",
            fieldOfWork: data.field_of_work || "N/A",
            experience: data.years_of_experience
              ? `${data.years_of_experience} years`
              : "N/A",
            contact: data.phone || "N/A",
            bio: data.remarks || "No bio available.",
            position: data.position || "N/A",
            company: data.company_name || "N/A",
            is_recruiter: data.is_recruiter
          };
          setUser(mapped);
        })
        .catch((err) => {
          console.error("Server error:", err);
          setUser(dummyUser);
          setError(true);
        });
    }, []);



  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // New job form state
  const [newJob, setNewJob] = useState({
    area_of_work: "",
    pay: "",
    job_description: "",
    job_type: "",
    benefits: "",
    location: "",
  });
  const [addingJob, setAddingJob] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  // Fetch jobs posted by recruiter
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobsc?phone=${encodeURIComponent(recruiterPhone)}`);
        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    }
    if (recruiterPhone) fetchJobs();
  }, [recruiterPhone]);

  // Handle new job form input changes
  function handleChange(e) {
    setNewJob(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Submit new job
  async function handleAddJob(e) {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);
    setAddingJob(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recruiter_phone: recruiterPhone,
          ...newJob,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add job");
      setAddSuccess(data.message || "Job added successfully");
      setNewJob({
        area_of_work: "",
        pay: "",
        job_description: "",
        job_type: "",
        benefits: "",
        location: "",
      });
      // Refresh job list
      const refreshed = await fetch(`/api/jobsc?phone=${encodeURIComponent(recruiterPhone)}`);
      const refreshedData = await refreshed.json();
      console.log(refreshedData);
      setJobs(refreshedData);
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddingJob(false);
    }
  }

  return (
    <main className="min-h-screen  p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center text-green-800">Recruiter Job Management</h1>

        {loading && <p className="text-center text-lg">Loading jobs...</p>}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <p className="text-center text-lg text-gray-600 mb-8">You have not posted any jobs yet.</p>
        )}
        <div className="p-10 bg-gray-200 rounded-xl shadow-md mb-10">
          <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Your Posted Jobs</h2>
          {/* Jobs list */}
          <ul className="space-y-10 mb-14">
            {jobs.map(job => (
              <li key={job.id} className="border rounded-xl p-6 shadow-md bg-white">
                <h2 className="text-3xl font-semibold text-green-700 mb-3">{job.area_of_work}</h2>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Pay:</strong> {job.pay}</p>
                <p><strong>Description:</strong> {job.job_description}</p>
                <p><strong>Benefits:</strong> {job.benefits}</p>
                <p><strong>Job Type:</strong> {job.job_type}</p>
                <p className="mb-4"><strong>Applicants:</strong> {job.applicant_count}</p>
                {(job.applicants && job.applicants.length) > 0 ? (
                  <div>
                    <h3 className="font-semibold text-xl mb-3">Applicants:</h3>
                    <ul className="space-y-3">
                      {(job.applicants).map(applicant => (
                        <li key={applicant.phone} className="flex items-center space-x-4">
                          <img
                            src={applicant.picture_link || "/default-avatar.png"}
                            alt={applicant.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-gray-700">{applicant.phone}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-600">No applicants yet.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Add Job Form */}
         <div className="p-10 bg-gray-200 rounded-xl shadow-md mb-10">
        <section className="border rounded-xl p-8 bg-yellow-50 shadow-md  mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center text-yellow-700">Add New Job</h2>

          {addError && <p className="text-red-600 mb-3 text-center">{addError}</p>}
          {addSuccess && <p className="text-green-700 mb-3 text-center">{addSuccess}</p>}

          <form onSubmit={handleAddJob} className="space-y-6">
            <div>
              <label htmlFor="area_of_work" className="block font-semibold mb-1">Area of Work *</label>
              <input
                type="text"
                name="area_of_work"
                id="area_of_work"
                value={newJob.area_of_work}
                onChange={handleChange}
                required
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="pay" className="block font-semibold mb-1">Pay *</label>
              <input
                type="text"
                name="pay"
                id="pay"
                value={newJob.pay}
                onChange={handleChange}
                required
                placeholder="E.g. ₹20,000/month"
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="job_description" className="block font-semibold mb-1">Job Description</label>
              <textarea
                name="job_description"
                id="job_description"
                value={newJob.job_description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="job_type" className="block font-semibold mb-1">Job Type</label>
              <input
                type="text"
                name="job_type"
                id="job_type"
                value={newJob.job_type}
                onChange={handleChange}
                placeholder="E.g. Full-time, Part-time"
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="benefits" className="block font-semibold mb-1">Benefits</label>
              <input
                type="text"
                name="benefits"
                id="benefits"
                value={newJob.benefits}
                onChange={handleChange}
                placeholder="E.g. Health insurance, transport"
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="location" className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={newJob.location}
                onChange={handleChange}
                placeholder="E.g. Chennai"
                className="w-full p-3 rounded border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={addingJob}
              className={`w-full py-4 mt-6 rounded font-semibold text-white ${
                addingJob ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {addingJob ? "Adding Job..." : "Add Job"}
            </button>
          </form>
        </section>
        </div>
      </div>
    </main>
  );
}
