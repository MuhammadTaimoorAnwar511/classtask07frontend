import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";

const Chart = () => {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Bitcoin Price Chart</h1>
        <div className="h-[600px]">
          <TradingViewWidget />
        </div>
      </div>
    </div>
  );
};

export default Chart;
