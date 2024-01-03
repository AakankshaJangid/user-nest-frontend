import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg-01.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    howDidYouHearAboutThis: [],
    city: "Mumbai",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedHeardAbout = [...formData.howDidYouHearAboutThis];
    if (checked) {
      updatedHeardAbout.push(value);
    } else {
      updatedHeardAbout = updatedHeardAbout.filter((item) => item !== value);
    }
    setFormData({
      ...formData,
      howDidYouHearAboutThis: updatedHeardAbout,
    });
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      setFormData({
        adminName: "",
        email: "",
        password: "",
        phone: "",
        gender: "Male",
        howDidYouHearAboutThis: [],
        city: "Mumbai",
        state: "",
      });

      alert("submitted");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <form className="w-3/5 p-6 bg-gray-100 bg-opacity-55 shadow-md rounded-md my-10">
        <h1 className="text-[#1A1A89] text-2xl font-semibold mb-4">Signup</h1>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="adminName"
              value={formData.adminName}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                />
                <span className="ml-1">Male</span>
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                />
                <span className="ml-1">Female</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  checked={formData.gender === "Others"}
                  onChange={handleInputChange}
                />
                <span className="ml-1">Others</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">How did you hear about this?</label>
            <div>
              <label className="inline-block mr-4">
                <input
                  type="checkbox"
                  name="heardAbout"
                  value="LinkedIn"
                  checked={formData.howDidYouHearAboutThis.includes("LinkedIn")}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">LinkedIn</span>
              </label>
              <label className="inline-block mr-4">
                <input
                  type="checkbox"
                  name="heardAbout"
                  value="Friends"
                  checked={formData.howDidYouHearAboutThis.includes("Friends")}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">Friends</span>
              </label>
              <label className="inline-block mr-4">
                <input
                  type="checkbox"
                  name="heardAbout"
                  value="JobPortal"
                  checked={formData.howDidYouHearAboutThis.includes(
                    "JobPortal"
                  )}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">Job Portal</span>
              </label>
              <label className="inline-block">
                <input
                  type="checkbox"
                  name="heardAbout"
                  value="Others"
                  checked={formData.howDidYouHearAboutThis.includes("Others")}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">Others</span>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block mb-1">
              State
            </label>
            <select
              id="city"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
              required
            >
              <option value="Mumbai">Gujarat</option>
              <option value="Pune">Maharashtra</option>
              <option value="Ahmedabad">Karnataka</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#fa7b7b] text-white py-2 px-4 rounded-md hover:bg-[#ED6464]"
        >
          Save
        </button>
        <p className="text-sm my-2">
          Already have an account?{" "}
          <span className="text-[#1A1A89]">
            <Link to={"/"}>Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
