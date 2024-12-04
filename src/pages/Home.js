import React, { useState } from "react";

const Home = () => {
  const [feature, setFeature] = useState(""); // State for the input feature
  const [prediction, setPrediction] = useState(""); // State for the prediction result
  const [error, setError] = useState(""); // State for error handling
  const [token, setToken] = useState(localStorage.getItem("token")); // Auth token

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setPrediction(""); // Clear previous predictions

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass JWT token
        },
        body: JSON.stringify({
          features: [Number(feature)], // Convert feature to a number
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.predicted_price); // Set the prediction result
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Bitcoin Price Predictor
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2 font-medium">
            Enter Feature Value:
          </label>
          <input
            type="number"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter feature value"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-bold"
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div className="mt-6 p-4 bg-green-100 border border-green-500 text-green-800 rounded">
            <p className="font-bold text-center">Prediction: {prediction}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-500 text-red-800 rounded">
            <p className="font-bold text-center">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
