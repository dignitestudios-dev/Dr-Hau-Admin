import React, { useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";

const BloodWork = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const immuneOptions = ["Immune", "Not Immune", "Equivocal"];
const sectionDisabled = !isEditing || formData.noBloodWork;

  // Handle inputs
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

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
 const handleIndurationChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        ppdInduration: value,
      }));
    }
  };
  // ✅ Submit Handler
 // ✅ Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault();

  // --- Validation Start ---
  if (!formData.noBloodWork) {
    if (formData.hepb && !formData.hepb_result) {
      ErrorToast("Hepatitis B Surface AB result is required ❌");
      return;
    }

    if (formData.tb && !formData.tb_result) {
      ErrorToast("Tuberculosis IGRA (T-spot) result is required ❌");
      return;
    }

    for (let i = 1; i <= 3; i++) {
      if (formData[`other_${i}`] && !formData[`other_${i}_text`]) {
        ErrorToast(`Other ${i} field is required ❌`);
        return;
      }
    }

    // ✅ PPD Validation
    if (formData.ppdPerformed) {
      if (!formData.ppdReadOn) {
        ErrorToast("PPD Read On date is required ❌");
        return;
      }
      if (!formData.ppdInduration) {
        ErrorToast("PPD Induration is required ❌");
        return;
      }
      if (!formData.ppdInterpretation) {
        ErrorToast("PPD Interpretation is required ❌");
        return;
      }
    }
  }
  // --- Validation End ---

  let dataPayload = {};

  if (formData.noBloodWork) {
    dataPayload = { noBloodWork: true };
  } else {
    dataPayload = {
      noBloodWork: false,
      mmrv: formData.mmrv || false,
      ...(formData.mmrv && {
        Mumps: formData.mmrv_Mumps,
        Rubella: formData.mmrv_Rubella,
        Rubeola: formData.mmrv_Rubeola,
        Varicella: formData.mmrv_Varicella,
      }),
      hepb: formData.hepb || false,
      ...(formData.hepb && { hepb_result: formData.hepb_result }),
      tb: formData.tb || false,
      ...(formData.tb && { tb_result: formData.tb_result }),
      other_1: formData.other_1 || false,
      ...(formData.other_1 && { other_1_text: formData.other_1_text }),
      other_2: formData.other_2 || false,
      ...(formData.other_2 && { other_2_text: formData.other_2_text }),
      other_3: formData.other_3 || false,
      ...(formData.other_3 && { other_3_text: formData.other_3_text }),

      // ✅ PPD fields
      ppdPerformed: formData.ppdPerformed || false,
      ...(formData.ppdPerformed && {
        ppdReadOn: formData.ppdReadOn,
        ppdInduration: formData.ppdInduration,
        ppdInterpretation: formData.ppdInterpretation,
      }),
    };
  }

  const payload = {
    type: "Blood Work",
    appointment: location.state,
    data: dataPayload,
  };

  try {
    setLoading(true);
    const response = await axios.post("/admin/medical-form", payload);

    if (response.status === 200) {
      SuccessToast("Blood Work Saved ✅");
      navigate("/events");
      setFormData({});
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message || "Something went wrong ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 overflow-auto bg-white rounded-xl shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-700">Blood Work</h3>
        {/* <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700"
        >
          {isEditing ? "Lock Form" : "Edit Form"}
        </button> */}
      </div>

      {/* No blood work done */}
      <div className="mb-5">
        <label className="inline-flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            name="noBloodWork"
            checked={formData.noBloodWork || false}
            onChange={handleCheckboxChange}
            disabled={!isEditing}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="font-medium">No blood work done</span>
        </label>
      </div>

      {/* Main Content */}
      <div
        className={`space-y-6 p-4 rounded-lg border ${
          formData.noBloodWork ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        {/* MMRV */}
        <div>
          <label className="flex items-center space-x-2 font-semibold text-gray-700">
            <input
              type="checkbox"
              name="mmrv"
              checked={formData.mmrv || false}
              onChange={handleCheckboxChange}
              disabled={!isEditing || formData.noBloodWork}
              className="h-4 w-4 border-gray-300"
            />
            <span>MMRV</span>
          </label>

          {true && (
            <div className="ml-6 mt-3 space-y-3">
              {["Mumps", "Rubella", "Rubeola", "Varicella"].map((test) => (
                <div key={test} className="grid grid-cols-2 gap-3 items-center">
                  <label className="text-gray-600">{test} Results</label>
                  <select
                    name={`mmrv_${test}`}
                    value={formData[`mmrv_${test}`] || "Immune"}
                    onChange={handleSelectChange}
                    disabled={!isEditing || formData.noBloodWork}
                    className="w-full rounded-lg border-gray-300 text-black p-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {immuneOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hepatitis B */}
        <div>
          <label className="flex items-center space-x-2 font-semibold text-gray-700">
            <input
              type="checkbox"
              name="hepb"
              checked={formData.hepb || false}
              onChange={handleCheckboxChange}
              disabled={!isEditing || formData.noBloodWork}
            />
            <span>Hepatitis B Surface AB</span>
          </label>

          {true && (
            <div className="ml-6 mt-3 grid grid-cols-2 gap-3 items-center">
              <label className="text-gray-600">Results</label>
              <select
                name="hepb_result"
                value={formData.hepb_result || "Immune"}
                onChange={handleSelectChange}
                disabled={!isEditing || formData.noBloodWork}
                className="w-full rounded-lg border-gray-300 text-black p-2 focus:ring-2 focus:ring-blue-500"
              >
                {immuneOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Tuberculosis IGRA */}
        <div>
          <label className="flex items-center space-x-2 font-semibold text-gray-700">
            <input
              type="checkbox"
              name="tb"
              checked={formData.tb || false}
              onChange={handleCheckboxChange}
              disabled={!isEditing || formData.noBloodWork}
            />
            <span>Tuberculosis IGRA (T-spot)</span>
          </label>

          {true && (
            <input
              type="text"
              name="tb_result"
              value={formData.tb_result || ""}
              onChange={handleInputChange}
              disabled={!isEditing || formData.noBloodWork}
              placeholder="Enter T-spot results"
              className="ml-6 mt-3 w-full rounded-lg border-gray-300 text-black p-2 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Other Tests */}
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <label className="flex items-center space-x-2 font-semibold text-gray-700">
              <input
                type="checkbox"
                name={`other_${i}`}
                checked={formData[`other_${i}`] || false}
                onChange={handleCheckboxChange}
                disabled={!isEditing || formData.noBloodWork}
              />
              <span>Other {i}</span>
            </label>

            {formData[`other_${i}`] && (
              <input
                type="text"
                name={`other_${i}_text`}
                value={formData[`other_${i}_text`] || ""}
                onChange={handleInputChange}
                disabled={!isEditing || formData.noBloodWork}
                placeholder="Enter other test name"
                className="ml-6 mt-3 w-full rounded-lg border-gray-300 text-black p-2 focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
 <div className="mb-4 mt-6">
              <label className="inline-flex items-center text-black">
                <input
                  type="checkbox"
                  name="ppdPerformed"
                  checked={formData.ppdPerformed}
                  onChange={handleCheckboxChange}
                  disabled={sectionDisabled}
                  className="mr-2"
                />
                PPD performed
              </label>
            </div>

            {/* PPD Details - Show when PPD is performed */}
            {formData.ppdPerformed && (
              <>
                <div className="mb-4">
                  <label className="block text-black font-semibold mb-1">
                    Read on
                  </label>
                  <input
                    type="date"
                    name="ppdReadOn"
                    value={formData.ppdReadOn}
                    onChange={handleInputChange}
                    disabled={sectionDisabled}
                    className="w-full p-3 border text-black border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-black font-semibold mb-1">
                    Induration
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="ppdInduration"
                      value={formData.ppdInduration}
                      onChange={handleIndurationChange}
                      disabled={sectionDisabled}
                      placeholder="Enter number"
                      className="flex-1 p-3 border text-black border-gray-300 rounded-md"
                    />
                    <span className="text-black font-semibold px-2">cm</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-black font-semibold mb-1">
                    Interpretation
                  </label>
                  <select
                    name="ppdInterpretation"
                    value={formData.ppdInterpretation}
                    onChange={handleInputChange}
                    disabled={sectionDisabled}
                    className="w-full p-3 border text-black border-gray-300 rounded-md bg-white"
                  >
                    <option value="">Select interpretation</option>
                    <option value="Positive (reactive)">
                      Positive (reactive)
                    </option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>
              </>
            )}
      </div>
      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Blood Work"}
        </button>
      </div>
    </form>
  );
};

export default BloodWork;
