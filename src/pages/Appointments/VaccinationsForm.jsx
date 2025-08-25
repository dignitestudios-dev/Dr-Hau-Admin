import React, { useState } from "react";

const VaccinationsForm = ({ isEditing }) => {
  const [formData, setFormData] = useState({
    noVaccinations: false,
    givenToday_Tdap: false,
    givenToday_Flu: false,
    givenToday_HepatitisB: false,
    givenToday_MMR: false,
    givenToday_Varicella: false,
    givenToday_Rabies: false,
    otherVaccines: [], // ✅ Dynamic array for other vaccines
    otherInput: "",
    ppdPerformed: false,
    ppdReadOn: "",
    ppdInduration: "",
    ppdInterpretation: "",
  });

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

  // ✅ Add new vaccine to array
  const handleAddOther = () => {
    if (formData.otherInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        otherVaccines: [...prev.otherVaccines, prev.otherInput.trim()],
        otherInput: "",
      }));
    }
  };

  // ✅ Remove a tag
  const handleRemoveOther = (index) => {
    setFormData((prev) => {
      const updated = [...prev.otherVaccines];
      updated.splice(index, 1);
      return { ...prev, otherVaccines: updated };
    });
  };

  const vaccines = ["Tdap", "Flu", "HepatitisB", "MMR", "Varicella", "Rabies"];
  const sectionDisabled = formData.noVaccinations || isEditing;

  return (
    <div className="flex w-full mt-4 pb-12 justify-center items-center p-8 bg-gray-100 overflow-auto">
      <div className="w-full mt-60 p-6 bg-white shadow-md rounded-lg mx-auto overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-black">
          Vaccinations / PPD
        </h3>

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
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-black">
              Given Today:
            </label>

            {/* Static Vaccines */}
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

            {/* ✅ Other Vaccines Tags */}
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-black">
                Other Vaccines:
              </label>

              {/* Show added tags */}
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

              {/* Input + Add Button */}
              <div className="flex gap-2">
                <input
                  type="text"
                  name="otherInput"
                  value={formData.otherInput}
                  onChange={handleInputChange}
                  disabled={sectionDisabled}
                  placeholder="Enter vaccine name"
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handleAddOther}
                  disabled={sectionDisabled}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
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

          <div className="mb-4">
            <label className="block text-black font-semibold mb-1">Read on</label>
            <input
              type="date"
              name="ppdReadOn"
              value={formData.ppdReadOn}
              onChange={handleInputChange}
              disabled={sectionDisabled || !formData.ppdPerformed}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
              disabled={sectionDisabled || !formData.ppdPerformed}
              placeholder="Enter induration measurement"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
              disabled={sectionDisabled || !formData.ppdPerformed}
              placeholder="Enter interpretation"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default VaccinationsForm;
