import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";

const VaccinationsForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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

  const vaccines = ["Tdap", "Flu", "HepatitisB", "MMR", "Varicella", "Rabies"];
  const sectionDisabled = formData.noVaccinations || isEditing;

  // ✅ Prefill data if reportData exists
  useEffect(() => {
    if (location?.state?.reportData) {
      const data = location.state.reportData;

      let prefilled = {
        noVaccinations: data.noVaccinations || false,
        givenToday_Tdap: data.givenToday?.includes("Tdap") || false,
        givenToday_Flu: data.givenToday?.includes("Flu") || false,
        givenToday_HepatitisB: data.givenToday?.includes("HepatitisB") || false,
        givenToday_MMR: data.givenToday?.includes("MMR") || false,
        givenToday_Varicella: data.givenToday?.includes("Varicella") || false,
        givenToday_Rabies: data.givenToday?.includes("Rabies") || false,
        otherVaccines:
          data.givenToday?.filter(
            (v) => !vaccines.includes(v) // extra vaccines ko otherVaccines me daal do
          ) || [],
        otherInput: "",
        ppdPerformed: data.ppdPerformed || false,
        ppdReadOn: data.ppdReadOn || "",
        ppdInduration: data.ppdInduration || "",
        ppdInterpretation: data.ppdInterpretation || "",
      };

      setFormData(prefilled);
    }
  }, [location?.state?.reportData]);

  // ✅ Checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // ✅ Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Only allow numbers in induration
  const handleIndurationChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        ppdInduration: value,
      }));
    }
  };

  // ✅ Add/remove other vaccines
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

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      type: "Vaccinations",
      appointment: location?.state?.appointmentId,
      data: {},
    };

    if (formData.noVaccinations) {
      payload.data = { noVaccinations: true };
    } else {
      const givenToday = [];
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
        ppdReadOn: formData.ppdReadOn,
        ppdInduration: formData.ppdInduration,
        ppdInterpretation: formData.ppdInterpretation,
      };
    }

    try {
      setLoading(true);
      const res = await axios.post("/admin/medical-form", payload);
      if (res.status === 200) {
        SuccessToast("Vaccination data saved ✅");
        navigate("/appointments");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Error saving vaccination ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full mt-4 pb-12 justify-center items-center p-8 bg-gray-100 overflow-auto">
      <div className="w-full p-6 bg-white shadow-md rounded-lg mx-auto overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-black">
          Vaccinations / PPD
        </h3>
  <h2 className="text-1xl font-bold mb-6 text-black">
          Name: {location?.state?.appointmentData?.user?.firstName}{" "}
          {location?.state?.appointmentData?.user?.lastName}
        </h2>
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
            <div className="flex gap-3 ">
              <div>
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
              </div>
                 <div>
                <ul className="space-y-1 text-black">
                  {location?.state?.event?.lotNumber &&
                    typeof location?.state?.event?.lotNumber === "object" &&
                    Object.entries(location?.state?.event?.lotNumber).map(
                      ([vaccine, lotNum]) => (
                        <li key={vaccine} className="flex justify-between">
                          <span>
                            {typeof lotNum === "object"
                              ? Object.values(lotNum)[0] // Get first value from object
                              : lotNum}
                          </span>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>

            {/* Other vaccines input + tags */}
            {/* <div className="mt-4">
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
                  className="flex-1 p-3 text-black border border-gray-300 rounded-md"
                />
              </div>
            </div> */}
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
