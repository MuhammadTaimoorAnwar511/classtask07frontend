import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login"); // Redirect to Login
      } else {
        setError(data.error || "Failed to signup");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <label className="block text-gray-700 mb-2 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your username"
            required
          />
          <label className="block text-gray-700 mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-bold"
          >
            Signup
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
