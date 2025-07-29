"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function OTPWithProfile() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loggedInPhone, setLoggedInPhone] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    place: "",
    field_of_work: "",
    remarks: "",
    picture_link: "",
    years_of_experience: "",
  });

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
         auth,
        "recaptcha-container",
        { size: "invisible" },
       
      );
    }
  };

  const sendOtp = async () => {
    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent");
    } catch (err) {
      alert("Failed to send OTP: " + err.message);
    }
  };

 const verifyOtp = async () => {
  try {
    const result = await confirmationResult.confirm(otp);
    const phoneNumber = result.user.phoneNumber;
    setLoggedInPhone(phoneNumber);
    alert("Phone verified!");

    // fetch existing user info if available
    fetchUserInfo(phoneNumber);
  } catch (err) {
    alert("Invalid OTP");
  }
};

const fetchUserInfo = async (phoneNumber) => {
  try {
    const res = await fetch(`/api/users?phone=${encodeURIComponent(phoneNumber)}`);
    if (res.ok) {
      const data = await res.json();
      setUserInfo({
        name: data.name ?? "",
        age: data.age ?? "",
        place: data.place ?? "",
        field_of_work: data.field_of_work ?? "",
        remarks: data.remarks ?? "",
        picture_link: data.picture_link ?? "",
        years_of_experience: data.years_of_experience ?? "",
      });
    } else {
      console.log("No previous user data found.");
    }
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
};

  const handleInputChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveUserInfo = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: loggedInPhone, ...userInfo }),
      });
      const data = await res.json();
      if (res.ok) alert(data.message);
      else alert(data.error);
    } catch (err) {
      alert("Failed to save user info");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {!loggedInPhone && (
        <>
          <h2 className="text-xl font-bold mb-4">Login with Phone OTP</h2>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
          >
            Send OTP
          </button>

          <div id="recaptcha-container"></div>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={verifyOtp}
                className="bg-green-600 text-white px-4 py-2 rounded w-full mb-4"
              >
                Verify OTP
              </button>
            </>
          )}
        </>
      )}

      {loggedInPhone && (
        <>
          <h2 className="text-xl font-bold mb-4">Fill Your Profile Info</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={userInfo.age}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={userInfo.place}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="field_of_work"
            placeholder="Field of Work"
            value={userInfo.field_of_work}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={userInfo.remarks}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="picture_link"
            placeholder="Picture Link"
            value={userInfo.picture_link}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="years_of_experience"
            placeholder="Years of Experience"
            value={userInfo.years_of_experience}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
          />

          <button
            onClick={saveUserInfo}
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
          >
            Save Profile
          </button>
        </>
      )}
    </div>
  );
}
