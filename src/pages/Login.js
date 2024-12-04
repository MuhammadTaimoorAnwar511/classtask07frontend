import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
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
        localStorage.setItem("token", data.access_token); // Store JWT token
        navigate("/home"); // Redirect to Home
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <label className="block text-gray-700 mb-2 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
            required
          />
          <label className="block text-gray-700 mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-bold"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
