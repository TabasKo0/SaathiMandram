'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CameraCapture from "../../components/CameraCapture";

export default function OnboardingPage() {
  const router = useRouter();
  const [loggedInPhone, setLoggedInPhone] = useState("");
  const [step, setStep] = useState(1);
  const [pictureUrl, setPictureUrl] = useState("");


  // Job Seeker form state
  const [jobSeekerData, setJobSeekerData] = useState({
    name: "",
    age: "",
    place: "",
    field_of_work: "",
    phone: "",
    remarks: "",
    picture_link: "",
    years_of_experience: "",
  });

  // Recruiter form state
  const [recruiterData, setRecruiterData] = useState({
    name: "",
    company_name: "",
    position: "",
    phone: "",
    picture_link: "",
    age: "",
  });
async function submitJobSeeker(e) {
  e.preventDefault();
  const payload = {
    ...jobSeekerData,
    picture_link: pictureUrl,
    is_recruiter: 0
  };

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    alert(result.message || "Job Seeker Registered!");
    console.log(result);
  } catch (error) {
    alert("Failed to register: " + error.message);
  }
}

async function submitRecruiter(e) {
  e.preventDefault();
  const payload = {
    ...recruiterData,
    picture_link: pictureUrl,
    is_recruiter: 1,
    field_of_work: "",
    remarks: "",
    years_of_experience: ""
  };

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    alert(result.message || "Recruiter Registered!");
    console.log(result);
  } catch (error) {
    alert("Failed to register: " + error.message);
  }
}

  useEffect(() => {
    const phone = sessionStorage.getItem("phoneOnly");
    const pic = sessionStorage.getItem("picture_link") || "";
    if (phone) {
      setLoggedInPhone(phone);
      setJobSeekerData((d) => ({ ...d, phone }));
      setRecruiterData((d) => ({ ...d, phone }));
    } else {
      router.push("/");
    }
    setPictureUrl(pic);
  }, []);

  // Handle input changes for both forms
  function handleJobSeekerChange(e) {
    const { name, value } = e.target;
    setJobSeekerData((prev) => ({ ...prev, [name]: value }));
  }

  function handleRecruiterChange(e) {
    const { name, value } = e.target;
    setRecruiterData((prev) => ({ ...prev, [name]: value }));
  }

  // On selfie capture
  function handleCapture(url) {
    setPictureUrl(url);
    sessionStorage.setItem("picture_link", url);
    setStep(2);
  }

  // Submit handlers (You can extend these to actually POST to your API)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => window.location.href = "/"}
          className="bg-yellow-500"
          style={{
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
          aria-label="Go to onboarding"
        >
          <span style={{ display: "inline-block", transform: "translateX(-2px)" }}>
            &#8592;
          </span>
        </button>
      </div>

      <div
        style={{
          background: "rgba(221, 221, 221, 0.45)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          marginTop: "24px",
          backdropFilter: "blur(8px)",
          color: "#333",
          minHeight: "80vh",
          width: "95%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Step 1: Take Selfie */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Smile! Your picture will be taken
            </h1>
            <CameraCapture onCapture={handleCapture} />
          </>
        )}

        {/* Step 2: Choose Role */}
        {step === 2 && (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
            <button
              className="w-64 h-24 bg-yellow-600 hover:bg-yellow-700 text-white text-2xl font-bold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              onClick={() => setStep(3)}
              style={{ letterSpacing: "1px" }}
            >
              I am a Job Seeker
            </button>
            <button
              className="w-64 h-24 bg-purple-600 hover:bg-purple-800 text-white text-2xl font-bold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={() => setStep(4)}
              style={{ letterSpacing: "1px" }}
            >
              I am a Recruiter
            </button>
          </div>
        )}

        {/* Step 3: Job Seeker Form */}
        {step === 3 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Job Seeker Registration</h1>
            {pictureUrl && (
              <img
                src={pictureUrl}
                alt="Selfie"
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg mx-auto mb-6"
              />
            )}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
           //   onSubmit={submitJobSeeker}
            >
              <input type="hidden" name="phone" value={loggedInPhone} />

              <div>
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  name="name"
                  value={jobSeekerData.name}
                  onChange={handleJobSeekerChange}
                  type="text"
                  required
                  className="w-full p-2 rounded border"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Age</label>
                <input
                  name="age"
                  value={jobSeekerData.age}
                  onChange={handleJobSeekerChange}
                  type="number"
                  min={0}
                  required
                  className="w-full p-2 rounded border"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Place</label>
                <input
                  name="place"
                  value={jobSeekerData.place}
                  onChange={handleJobSeekerChange}
                  type="text"
                  className="w-full p-2 rounded border"
                  placeholder="Enter your place"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Field of Work</label>
                <input
                  name="field_of_work"
                  value={jobSeekerData.field_of_work}
                  onChange={handleJobSeekerChange}
                  type="text"
                  className="w-full p-2 rounded border"
                  placeholder="Enter your field of work"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone Number</label>
                <input
                  name="phone"
                  value={loggedInPhone}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Remarks</label>
                <input
                  name="remarks"
                  value={jobSeekerData.remarks}
                  onChange={handleJobSeekerChange}
                  type="text"
                  className="w-full p-2 rounded border"
                  placeholder="Any remarks"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Picture Link</label>
                <input
                  name="picture_link"
                  value={pictureUrl}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Years of Experience</label>
                <input
                  name="years_of_experience"
                  value={jobSeekerData.years_of_experience}
                  onChange={handleJobSeekerChange}
                  type="number"
                  min={0}
                  className="w-full p-2 rounded border"
                  placeholder="Enter years of experience"
                />
              </div>

              <button
                type="submit"
                onClick={submitJobSeeker}
                className="col-span-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded transition"
              >
                Register as Job Seeker
              </button>
            </form>
          </>
        )}

        {/* Step 4: Recruiter Form */}
        {step === 4 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Recruiter Registration</h1>
            {pictureUrl && (
              <img
                src={pictureUrl}
                alt="Selfie"
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg mx-auto mb-6"
              />
            )}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={submitRecruiter}
            >
              <input type="hidden" name="phone" value={loggedInPhone} />

              <div>
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  name="name"
                  value={recruiterData.name}
                  onChange={handleRecruiterChange}
                  type="text"
                  required
                  className="w-full p-2 rounded border"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Company Name</label>
                <input
                  name="company_name"
                  value={recruiterData.company_name}
                  onChange={handleRecruiterChange}
                  type="text"
                  className="w-full p-2 rounded border"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Position</label>
                <input
                  name="position"
                  value={recruiterData.position}
                  onChange={handleRecruiterChange}
                  type="text"
                  className="w-full p-2 rounded border"
                  placeholder="Enter your position"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone Number</label>
                <input
                  name="phone"
                  value={loggedInPhone}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Picture Link</label>
                <input
                  name="picture_link"
                  value={pictureUrl}
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Age</label>
                <input
                  name="age"
                  value={recruiterData.age}
                  onChange={handleRecruiterChange}
                  type="number"
                  min={0}
                  className="w-full p-2 rounded border"
                  placeholder="Enter your age"
                />
              </div>

              <button
                type="submit"
                onClick={submitRecruiter}
                className="col-span-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded transition"
              >
                Register as Recruiter
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
