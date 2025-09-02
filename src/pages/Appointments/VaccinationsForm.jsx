import React, { useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";

const VaccinationsForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    noVaccinations: false,
    givenToday_Tdap: false,
    givenToday_Flu: false,
    givenToday_HepatitisB: false,
    givenToday_MMR: false,
    givenToday_Varicella: false,
    givenToday_Rabies: false,
    otherVaccines: [],
    otherInput: "",
    ppdPerformed: false,
    ppdReadOn: "",
    ppdInduration: "",
    ppdInterpretation: "",
  });
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOther = () => {
    if (formData.otherInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        otherVaccines: [...prev.otherVaccines, prev.otherInput.trim()],
        otherInput: "",
      }));
    }
  };

  const handleRemoveOther = (index) => {
    setFormData((prev) => {
      const updated = [...prev.otherVaccines];
      updated.splice(index, 1);
      return { ...prev, otherVaccines: updated };
    });
  };
  console.log(location.state, "location.state==");
  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      type: "Vaccinations",
      appointment: location.state,
      data: {},
    };

    if (formData.noVaccinations) {
      payload.data = { noVaccinations: true };
    } else {
      // given today array
      const givenToday = [];
      const vaccines = [
        "Tdap",
        "Flu",
        "HepatitisB",
        "MMR",
        "Varicella",
        "Rabies",
      ];
      vaccines.forEach((v) => {
        if (formData[`givenToday_${v}`]) givenToday.push(v);
      });
      if (formData.otherVaccines.length > 0) {
        givenToday.push(...formData.otherVaccines);
      }

      payload.data = {
        noVaccinations: false,
        givenToday,
        ppdPerformed: formData.ppdPerformed,
      };

      if (formData.ppdPerformed) {
        payload.data = {
          ...payload.data,
          ppdReadOn: formData.ppdReadOn,
          ppdInduration: formData.ppdInduration,
          ppdInterpretation: formData.ppdInterpretation,
        };
      }
    }

    try {
      setLoading(true);
      const res = await axios.post("/admin/medical-form", payload);
      if (res.status === 200) {
        SuccessToast("Vaccination data saved ✅");
        // navigate("/userappointmentdetails");
        // reset form if needed
        setFormData({
          noVaccinations: false,
          givenToday_Tdap: false,
          givenToday_Flu: false,
          givenToday_HepatitisB: false,
          givenToday_MMR: false,
          givenToday_Varicella: false,
          givenToday_Rabies: false,
          otherVaccines: [],
          otherInput: "",
          ppdPerformed: false,
          ppdReadOn: "",
          ppdInduration: "",
          ppdInterpretation: "",
        });
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Error saving vaccination ❌");
    } finally {
      setLoading(false);
    }
  };

  const vaccines = ["Tdap", "Flu", "HepatitisB", "MMR", "Varicella", "Rabies"];
  const sectionDisabled = formData.noVaccinations || isEditing;

  return (
    <div className="flex w-full mt-4 pb-12 justify-center items-center p-8 bg-gray-100 overflow-auto">
      <div className="w-full mt-60 p-6 bg-white shadow-md rounded-lg mx-auto overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-black">
          Vaccinations / PPD
        </h3>

        <form onSubmit={handleSubmit}>
          {/* ✅ No vaccinations checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center text-black font-semibold">
              <input
                type="checkbox"
                name="noVaccinations"
                checked={formData.noVaccinations}
                onChange={handleCheckboxChange}
                disabled={isEditing}
                className="mr-2"
              />
              Check if no vaccinations or PPD given
            </label>
          </div>

          {/* ✅ Given Today Section */}
          <fieldset
            disabled={sectionDisabled}
            className={`${sectionDisabled ? "opacity-50" : ""}`}
          >
            {vaccines.map((vaccine) => (
              <div key={vaccine} className="mb-2 flex items-center gap-2">
                <label className="inline-flex items-center text-black">
                  <input
                    type="checkbox"
                    name={`givenToday_${vaccine}`}
                    checked={formData[`givenToday_${vaccine}`]}
                    onChange={handleCheckboxChange}
                    disabled={sectionDisabled}
                    className="mr-2"
                  />
                  {vaccine}
                </label>
              </div>
            ))}

            {/* Other vaccines input + tags */}
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-black">
                Other Vaccines:
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.otherVaccines.map((v, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {v}
                    <button
                      type="button"
                      onClick={() => handleRemoveOther(i)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  name="otherInput"
                  value={formData.otherInput}
                  onChange={handleInputChange}
                  disabled={sectionDisabled}
                  placeholder="Enter vaccine name"
                  className="flex-1 p-3 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddOther}
                  disabled={sectionDisabled}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Add
                </button>
              </div>
            </div>

            {/* ✅ PPD Section */}
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
                  <input
                    type="text"
                    name="ppdInduration"
                    value={formData.ppdInduration}
                    onChange={handleInputChange}
                    disabled={sectionDisabled}
                    placeholder="Enter induration measurement"
                    className="w-full p-3 border text-black border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-black font-semibold mb-1">
                    Interpretation
                  </label>
                  <input
                    type="text"
                    name="ppdInterpretation"
                    value={formData.ppdInterpretation}
                    onChange={handleInputChange}
                    disabled={sectionDisabled}
                    placeholder="Enter interpretation"
                    className="w-full p-3 border text-black border-gray-300 rounded-md"
                  />
                </div>
              </>
        
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-black text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VaccinationsForm;
