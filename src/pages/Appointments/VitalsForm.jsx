import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const VitalsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from reportData if available
  const [systolic, setSystolic] = useState(
    location.state?.reportData?.systolic ?? ""
  );
  const [diastolic, setDiastolic] = useState(
    location.state?.reportData?.diastolic ?? ""
  );
  const [pulse, setPulse] = useState(
    location.state?.reportData?.pulse ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Systolic validation
    if (systolic === "" || systolic === null || systolic === undefined) {
      newErrors.systolic = "Systolic blood pressure is required.";
    } else {
      const sysNum = Number(systolic);
      if (isNaN(sysNum) || sysNum <= 0) {
        newErrors.systolic = "Systolic must be a positive number.";
      } else if (sysNum < 50 || sysNum > 300) {
        newErrors.systolic = "Systolic must be between 50 and 300 mmHg.";
      }
    }

    // Diastolic validation
    if (diastolic === "" || diastolic === null || diastolic === undefined) {
      newErrors.diastolic = "Diastolic blood pressure is required.";
    } else {
      const diaNum = Number(diastolic);
      if (isNaN(diaNum) || diaNum <= 0) {
        newErrors.diastolic = "Diastolic must be a positive number.";
      } else if (diaNum < 30 || diaNum > 200) {
        newErrors.diastolic = "Diastolic must be between 30 and 200 mmHg.";
      }
    }

    // Compare systolic and diastolic
    if (!newErrors.systolic && !newErrors.diastolic) {
      if (Number(systolic) <= Number(diastolic)) {
        newErrors.systolic = "Systolic pressure must be greater than diastolic pressure.";
      }
    }

    // Pulse validation
    if (pulse === "" || pulse === null || pulse === undefined) {
      newErrors.pulse = "Pulse rate is required.";
    } else {
      const pulseNum = Number(pulse);
      if (isNaN(pulseNum) || pulseNum <= 0) {
        newErrors.pulse = "Pulse must be a positive number.";
      } else if (pulseNum < 30 || pulseNum > 250) {
        newErrors.pulse = "Pulse must be between 30 and 250 bpm.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      ErrorToast("Please correct the errors before submitting.");
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

      if (response.status === 200 || response.data?.success) {
        SuccessToast("Vitals added successfully ✅");
        // BUG-008: Keep admin inside same appointment details workflow
        navigate(-1);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-50 p-8 overflow-auto">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-black hover:text-gray-800 flex items-center mr-3 text-2xl"
        >
          <IoMdArrowBack />
        </button>
        <h2 className="text-2xl font-bold text-black">Vital Form</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 space-y-6 max-w-2xl"
      >
        <h2 className="text-lg font-bold text-black">
          Name: {location?.state?.appointmentData?.user?.firstName}{" "}
          {location?.state?.appointmentData?.user?.lastName}
        </h2>

        {/* Blood Pressure */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blood Pressure (mmHg) *
          </label>
          <div className="flex gap-2 items-center">
            <div className="w-1/2">
              <input
                type="number"
                min="1"
                step="1"
                value={systolic}
                onChange={(e) => {
                  setSystolic(e.target.value);
                  if (errors.systolic) setErrors((prev) => ({ ...prev, systolic: null }));
                }}
                placeholder="Systolic (upper)"
                className={`w-full p-2 border ${
                  errors.systolic ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                } rounded text-black`}
              />
            </div>
            <span className="text-gray-600 font-bold">/</span>
            <div className="w-1/2">
              <input
                type="number"
                min="1"
                step="1"
                value={diastolic}
                onChange={(e) => {
                  setDiastolic(e.target.value);
                  if (errors.diastolic) setErrors((prev) => ({ ...prev, diastolic: null }));
                }}
                placeholder="Diastolic (lower)"
                className={`w-full p-2 border ${
                  errors.diastolic ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                } rounded text-black`}
              />
            </div>
          </div>
          {errors.systolic && (
            <p className="text-red-500 text-xs mt-1.5">{errors.systolic}</p>
          )}
          {errors.diastolic && (
            <p className="text-red-500 text-xs mt-1.5">{errors.diastolic}</p>
          )}
        </div>

        {/* Pulse */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pulse (bpm) *
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={pulse}
            onChange={(e) => {
              setPulse(e.target.value);
              if (errors.pulse) setErrors((prev) => ({ ...prev, pulse: null }));
            }}
            placeholder="Enter pulse rate (e.g. 72)"
            className={`w-full p-2 border ${
              errors.pulse ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
            } rounded text-black`}
          />
          {errors.pulse && (
            <p className="text-red-500 text-xs mt-1.5">{errors.pulse}</p>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-[10px] font-medium hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-[200px] rounded-[10px] h-[49px] disabled:opacity-50 font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Saving..." : "Add / Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VitalsForm;
