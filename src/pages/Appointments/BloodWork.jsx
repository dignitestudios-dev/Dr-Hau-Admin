import React, { useState } from "react";

const BloodWork = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(true);

  const immuneOptions = ["Immune", "Not Immune", "Equivocal"];

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

  return (
    <div className="w-full p-3 overflow-auto">
    <div className="mb-6  bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-700">Blood Work</h3>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700"
        >
          {isEditing ? "Lock Form" : "Edit Form"}
        </button>
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

      {/* Content wrapper */}
      <div
        className={`space-y-6 p-4 rounded-lg border ${
          formData.noBloodWork ? "bg-gray-100 " : "bg-gray-50"
        }`}
      >
        {/* MMRV Section */}
        <div>
          <label className="flex   items-center space-x-2 font-semibold text-gray-700">
            <input
              type="checkbox"
              name="mmrv"
              checked={formData.mmrv || false}
              onChange={handleCheckboxChange}
              disabled={!isEditing || formData.noBloodWork}
              className="h-4 w-4  rounded border-gray-300"
            />
            <span>MMRV</span>
          </label>

          <div className="ml-6 mt-3 space-y-3">
            {["Mumps", "Rubella", "Rubeola", "Varicella"].map((test) => (
              <div key={test} className="grid grid-cols-2 gap-3 items-center">
                <label className="text-gray-600">{test} Results</label>
                <select
                  name={`mmrv_${test}`}
                  value={formData[`mmrv_${test}`] || "Immune"}
                  onChange={handleSelectChange}
                  disabled={
                    !isEditing || formData.noBloodWork || !formData.mmrv
                  }
                  className="w-full rounded-lg border-gray-300 text-black  p-2 focus:ring-2 focus:ring-blue-500"
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

          {formData.hepb && (
            <div className="ml-6 mt-3 grid grid-cols-2 gap-3 items-center">
              <label className="text-gray-600">Results</label>
              <select
                name="hepb_result"
                value={formData.hepb_result || "Immune"}
                onChange={handleSelectChange}
                disabled={!isEditing || formData.noBloodWork}
                className="w-full rounded-lg text-black border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
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

          {formData.tb && (
            <input
              type="text"
              name="tb_result"
              value={formData.tb_result || ""}
              onChange={handleInputChange}
              disabled={!isEditing || formData.noBloodWork}
              placeholder="Enter T-spot results"
              className="ml-6  text-black mt-3 w-full rounded-lg border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Other Blood Tests */}
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
                className="ml-6 text-black mt-3 w-full rounded-lg border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BloodWork;
