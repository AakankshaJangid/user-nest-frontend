import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-01.png";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data.accessToken);
        localStorage.setItem("authToken", data.accessToken);
        navigate("/dashboard");
        setLoginData({
          email: "",
          password: "",
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
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
      <form className="w-2/4 p-6 bg-gray-100 bg-opacity-55 shadow-md rounded-md">
        <h1 className="text-[#1A1A89] text-2xl font-semibold mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            className="w-full border-b-2 border-gray-300 p-2 bg-transparent outline-none"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#fa7b7b] text-white py-2 px-4 rounded-md hover:bg-[#ED6464]"
        >
          Login
        </button>
        <p className="text-sm my-2">
          Don't have an account?{" "}
          <span className="text-[#1A1A89]">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
