import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { useLocation, useNavigate } from "react-router-dom";

const VitalsForm = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // ["Vitals", "Vaccinations", "Drug Screen", "Physical Exam"]
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation check
    if (!systolic || !diastolic || !pulse) {
      ErrorToast("Please fill all fields before submitting.");
      return;
    }

    const payload = {
      type: "Vitals",
      appointment: location.state,
      data: {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        pulse: Number(pulse),
      },
    };

    try {
      setLoading(true);
      const response = await axios.post("/admin/medical-form", payload);

      if (response.status === 200) {
        SuccessToast("Vitals added successfully ✅");
        // Clear form
        setSystolic("");
        setDiastolic("");
        setPulse("");
        // navigate("/userappointmentdetails");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-50 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-black">Vital Form</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
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

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-[200px] rounded-[10px] h-[49px] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default VitalsForm;
