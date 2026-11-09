import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const DrugScreeningForm = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const drugScreenData = location?.state?.reportData;

  // Prefill when reportData exists
  useEffect(() => {
    if (drugScreenData) {
      const prefilled = { noDrugScreen: drugScreenData.noDrugScreen || false };

      drugs.forEach((drug) => {
        if (drug === "Other") {
          prefilled[`drug_${drug}`] = drugScreenData.Other?.status || "Not Performed";
          prefilled["drug_other_text"] = drugScreenData.Other?.drugName || "";
        } else {
          prefilled[`drug_${drug}`] = drugScreenData[drug] || "Not Performed";
        }
      });

      setFormData(prefilled);
    } else {
      const initial = { noDrugScreen: false };
      drugs.forEach((drug) => {
        initial[`drug_${drug}`] = "Not Performed";
      });
      initial["drug_other_text"] = "";
      setFormData(initial);
    }
  }, [drugScreenData]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "drug_Other" && value === "Not Performed") {
      setErrors((prev) => ({ ...prev, drug_other_text: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.noDrugScreen) {
      // If Other is selected as Positive or Negative, require other drug name
      if (
        formData["drug_Other"] &&
        formData["drug_Other"] !== "Not Performed" &&
        (!formData.drug_other_text || !formData.drug_other_text.trim())
      ) {
        newErrors.drug_other_text = "Please enter the drug name for 'Other'.";
      }

      // Check that at least one test is performed or selected
      const hasAnyPerformed = drugs.some((drug) => {
        const val = formData[`drug_${drug}`];
        return val && val !== "Not Performed";
      });

      if (!hasAnyPerformed) {
        newErrors.general =
          "Please record at least one drug screen result, or check 'No drug screen done'.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      ErrorToast(errors.general || "Please fix validation errors before submitting.");
      return;
    }

    let payload = {
      type: "Drug Screen",
      appointment: location?.state?.appointmentId || "APPOINTMENT_ID",
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
            drugName: formData.drug_other_text ? formData.drug_other_text.trim() : "",
          };
        } else {
          drugResults[drug] = value || "Not Performed";
        }
      });

      payload.data = drugResults;
    }

    setLoading(true);
    try {
      const response = await axios.post("/admin/medical-form", payload);
      if (response.status === 200 || response.data?.success) {
        SuccessToast("Drug Screen data saved ✅");
        // BUG-008: Stay in the user appointment details workflow
        navigate(-1);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full overflow-auto">
      <div className="mb-6 bg-white w-full shadow-md rounded-xl p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-black hover:text-gray-800 flex items-center mr-3 text-2xl"
          >
            <IoMdArrowBack />
          </button>
          <h3 className="text-xl font-bold text-gray-800">Drug Screening</h3>
        </div>

        <h2 className="text-lg font-bold mb-6 text-black">
          Student: {location?.state?.appointmentData?.user?.firstName}{" "}
          {location?.state?.appointmentData?.user?.lastName}
        </h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* No drug screen checkbox */}
          <div className="mb-5">
            <label className="inline-flex items-center space-x-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="noDrugScreen"
                checked={formData.noDrugScreen || false}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    noDrugScreen: e.target.checked,
                  }));
                  if (e.target.checked) setErrors({});
                }}
                disabled={!isEditing}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="font-semibold text-black">No drug screen done</span>
            </label>
          </div>

          {/* Drug test fields */}
          <div
            className={`space-y-4 p-4 rounded-lg border ${
              formData.noDrugScreen ? "bg-gray-100 opacity-60" : "bg-gray-50"
            }`}
          >
            {drugs.map((drug) => (
              <div key={drug} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <label className="font-medium text-gray-700">{drug}</label>
                <div>
                  <select
                    name={`drug_${drug}`}
                    value={formData[`drug_${drug}`] || "Not Performed"}
                    onChange={handleSelectChange}
                    disabled={!isEditing || formData.noDrugScreen}
                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Not Performed">Not Performed</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>

                {/* Extra text input for Other */}
                {drug === "Other" && (
                  <div className="col-span-1 md:col-span-2">
                    <input
                      type="text"
                      name="drug_other_text"
                      value={formData.drug_other_text || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing || formData.noDrugScreen}
                      placeholder="Enter other drug name *"
                      className={`w-full mt-1 rounded-lg border ${
                        errors.drug_other_text ? "border-red-500" : "border-gray-300"
                      } p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white`}
                    />
                    {errors.drug_other_text && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.drug_other_text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit and Cancel buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isEditing || loading}
              className="w-[200px] h-[45px] bg-black text-white rounded-lg shadow hover:bg-gray-800 disabled:opacity-50 font-medium transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrugScreeningForm;
