import React, { useState } from "react";

const VitalsForm = () => {
  const [systolic, setSystolic] = useState("");   // upper number
  const [diastolic, setDiastolic] = useState(""); // lower number
  const [pulse, setPulse] = useState("");         // single number

  return (
    <div className="w-full h-auto bg-gray-50 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-black">
          Vital Form
        </h2>
      </div>

      <form className="bg-white shadow-md rounded p-6">
        {/* ✅ Blood Pressure */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Blood Pressure (mmHg)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="Systolic (upper)"
              className="w-1/2 p-2 border border-gray-300 rounded text-black"
            />
            <span className="text-gray-600 font-bold">/</span>
            <input
              type="number"
              inputMode="numeric"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="Diastolic (lower)"
              className="w-1/2 p-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        {/* ✅ Pulse */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Pulse (bpm)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="Enter pulse rate"
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default VitalsForm;
