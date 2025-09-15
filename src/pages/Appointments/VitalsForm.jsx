import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { useLocation, useNavigate } from "react-router-dom";

const VitalsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from reportData if available
  const [systolic, setSystolic] = useState(
    location.state?.reportData?.systolic || ""
  );
  const [diastolic, setDiastolic] = useState(
    location.state?.reportData?.diastolic || ""
  );
  const [pulse, setPulse] = useState(location.state?.reportData?.pulse || "");
  const [loading, setLoading] = useState(false);
  
 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!systolic || !diastolic || !pulse) {
      ErrorToast("Please fill all fields before submitting.");
      return;
    }

    const payload = {
      type: "Vitals",
      appointment: location.state?.appointmentId,
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
        navigate("/appointments"); // Or wherever you want
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-auto bg-gray-50 p-8 overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-black">Vital Form</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 space-y-4"
      >
        <h2 className="text-1xl font-bold mb-6 text-black">
          Name: {location?.state?.appointmentData?.user?.firstName}{" "}
          {location?.state?.appointmentData?.user?.lastName}
        </h2>
        {/* Blood Pressure */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blood Pressure (mmHg)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="Systolic (upper)"
              className="w-1/2 p-2 border border-gray-300 rounded text-black"
            />
            <span className="text-gray-600 font-bold">/</span>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="Diastolic (lower)"
              className="w-1/2 p-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        {/* Pulse */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pulse (bpm)
          </label>
          <input
            type="number"
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
          {loading ? "Saving..." : "Add / Update"}
        </button>
      </form>
    </div>
  );
};

export default VitalsForm;
