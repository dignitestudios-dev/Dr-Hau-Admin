import React, { useState } from "react";
import axios from "../../axios"; // uncomment jab api hit karni ho
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DrugScreeningForm = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const drugs = [
    "Benzodiazepine",
    "Barbituates",
    "Cocaine",
    "Marijuana",
    "Opiates",
    "Amphetamines",
    "PCP",
    "Methadone",
    "MDMA",
    "Propoxyphene",
    "Oxycodone",
    "Other",
  ];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      type: "Drug Screen",
      appointment: location?.state || "APPOINTMENT_ID",
      data: {},
    };

    if (formData.noDrugScreen) {
      payload.data = { noDrugScreen: true };
    } else {
      let drugResults = { noDrugScreen: false };

      drugs.forEach((drug) => {
        const value = formData[`drug_${drug}`];
        if (drug === "Other") {
          drugResults.Other = {
            status: value || "Not Performed",
            drugName: formData.drug_other_text || "",
          };
        } else {
          drugResults[drug] = value || "Negative";
        }
      });

      payload.data = drugResults;
    }



    setLoading(true);
    try {
      const response = await axios.post("/admin/medical-form", payload);
      if (response.status === 200) {
        SuccessToast("Vitals added successfully ✅");
        // navigate("/userappointmentdetails");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 w-full overflow-auto">
      <div className="mb-6 bg-white w-full shadow-md rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-700">Drug Screening</h3>
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700"
          >
            {isEditing ? "Lock Form" : "Edit Form"}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* No drug screen checkbox */}
          <div className="mb-5">
            <label className="inline-flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="noDrugScreen"
                checked={formData.noDrugScreen || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    noDrugScreen: e.target.checked,
                  }))
                }
                disabled={!isEditing}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="font-medium">No drug screen done</span>
            </label>
          </div>

          {/* Drug test fields */}
          <div
            className={`space-y-4 p-4 rounded-lg border ${
              formData.noDrugScreen ? "bg-gray-100 opacity-60" : "bg-gray-50"
            }`}
          >
            {drugs.map((drug) => (
              <div key={drug} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="font-medium text-gray-700">{drug}</label>
                <select
                  name={`drug_${drug}`}
                  value={
                    formData[`drug_${drug}`] ||
                    (drug === "Other" ? "Not Performed" : "Negative")
                  }
                  onChange={handleSelectChange}
                  disabled={!isEditing || formData.noDrugScreen}
                  className="w-full rounded-lg border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                  <option value="Not Performed">Not Performed</option>
                </select>

                {/* Extra text input for Other */}
                {drug === "Other" && (
                  <input
                    type="text"
                    name="drug_other_text"
                    value={formData.drug_other_text || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing || formData.noDrugScreen}
                    placeholder="Enter other drug name"
                    className="col-span-2 w-full mt-2 rounded-lg border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!isEditing}
              className="w-[200px] h-[45px] bg-black text-white rounded-lg shadow hover:bg-gray-800"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrugScreeningForm;
