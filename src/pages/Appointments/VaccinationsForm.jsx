import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { IoMdArrowBack } from "react-icons/io";

const VaccinationsForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // BUG-010: Display user-selected vaccines from appointmentData
  const rawAppointmentVaccines =
    location?.state?.appointmentData?.vaccinations || [];

  const defaultVaccines = [
    "Tdap",
    "Flu",
    "HepatitisB",
    "MMR",
    "Varicella",
    "Rabies",
  ];

  // If appointment has specific user-selected vaccines, use them; otherwise default
  const activeVaccines =
    rawAppointmentVaccines.length > 0
      ? rawAppointmentVaccines
      : defaultVaccines;

  const [formData, setFormData] = useState({
    noVaccinations: false,
    selectedVaccines: {},
    otherVaccines: [],
    otherInput: "",
    ppdPerformed: false,
    ppdReadOn: "",
    ppdInduration: "",
    ppdInterpretation: "",
  });

  const sectionDisabled = formData.noVaccinations || isEditing;

  // Prefill data if reportData exists
  useEffect(() => {
    if (location?.state?.reportData) {
      const data = location.state.reportData;
      const initialSelected = {};

      activeVaccines.forEach((v) => {
        initialSelected[v] =
          data.givenToday?.some(
            (gt) => gt.toLowerCase() === v.toLowerCase()
          ) || false;
      });

      setFormData({
        noVaccinations: data.noVaccinations || false,
        selectedVaccines: initialSelected,
        otherVaccines:
          data.givenToday?.filter(
            (v) =>
              !activeVaccines.some(
                (av) => av.toLowerCase() === v.toLowerCase()
              )
          ) || [],
        otherInput: "",
        ppdPerformed: data.ppdPerformed || false,
        ppdReadOn: data.ppdReadOn ? data.ppdReadOn.split("T")[0] : "",
        ppdInduration: data.ppdInduration || "",
        ppdInterpretation: data.ppdInterpretation || "",
      });
    } else {
      const initialSelected = {};
      activeVaccines.forEach((v) => {
        initialSelected[v] = false;
      });
      setFormData((prev) => ({
        ...prev,
        selectedVaccines: initialSelected,
      }));
    }
  }, [location?.state?.reportData]);

  // Checkbox change
  const handleVaccineCheckbox = (vaccineName, checked) => {
    setFormData((prev) => ({
      ...prev,
      selectedVaccines: {
        ...prev.selectedVaccines,
        [vaccineName]: checked,
      },
    }));
    if (errors.vaccinations) {
      setErrors((prev) => ({ ...prev, vaccinations: null }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (name === "noVaccinations" && checked) {
      setErrors({});
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

  const handleIndurationChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        ppdInduration: value,
      }));
      if (errors.ppdInduration) {
        setErrors((prev) => ({ ...prev, ppdInduration: null }));
      }
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.noVaccinations) {
      const hasAnyVaccineChecked =
        Object.values(formData.selectedVaccines).some(Boolean) ||
        formData.otherVaccines.length > 0;

      if (!hasAnyVaccineChecked && !formData.ppdPerformed) {
        newErrors.vaccinations =
          "Please select at least one vaccination or check 'No vaccinations given'.";
      }

      if (formData.ppdPerformed) {
        if (!formData.ppdReadOn) {
          newErrors.ppdReadOn = "PPD Read On date is required.";
        }
        if (!formData.ppdInduration) {
          newErrors.ppdInduration = "PPD Induration is required.";
        }
        if (!formData.ppdInterpretation) {
          newErrors.ppdInterpretation = "PPD Interpretation is required.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      ErrorToast("Please fix the validation errors before submitting.");
      return;
    }

    let payload = {
      type: "Vaccinations",
      appointment: location?.state?.appointmentId,
      data: {},
    };

    if (formData.noVaccinations) {
      payload.data = { noVaccinations: true };
    } else {
      const givenToday = [];
      activeVaccines.forEach((v) => {
        if (formData.selectedVaccines[v]) givenToday.push(v);
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
      if (res.status === 200 || res.data?.success) {
        SuccessToast("Vaccination data saved ✅");
        // BUG-008: Stay inside user appointment details workflow
        navigate(-1);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Error saving vaccination ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full mt-4 pb-12 justify-center items-center p-8 bg-gray-100 overflow-auto">
      <div className="w-full p-6 bg-white shadow-md rounded-lg mx-auto overflow-auto max-w-3xl">
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-black hover:text-gray-800 flex items-center mr-3 text-2xl"
          >
            <IoMdArrowBack />
          </button>
          <h3 className="text-xl font-semibold text-black">
            Vaccinations / PPD
          </h3>
        </div>

        <h2 className="text-lg font-bold mb-6 text-black">
          Student: {location?.state?.appointmentData?.user?.firstName}{" "}
          {location?.state?.appointmentData?.user?.lastName}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* No vaccinations checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center text-black font-semibold cursor-pointer">
              <input
                type="checkbox"
                name="noVaccinations"
                checked={formData.noVaccinations}
                onChange={handleCheckboxChange}
                disabled={isEditing}
                className="mr-2 h-4 w-4"
              />
              Check if no vaccinations or PPD given
            </label>
          </div>

          {/* Given Today Section */}
          <fieldset
            disabled={sectionDisabled}
            className={`${sectionDisabled ? "opacity-50" : ""} space-y-4`}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vaccines Selected for this Appointment:
              </label>

              {errors.vaccinations && (
                <p className="text-red-500 text-xs mb-2">
                  {errors.vaccinations}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeVaccines.map((vaccine) => {
                  const lotNum =
                    location?.state?.event?.lotNumber?.[vaccine] ||
                    Object.entries(location?.state?.event?.lotNumber || {}).find(
                      ([k]) => k.toLowerCase() === vaccine.toLowerCase()
                    )?.[1];

                  return (
                    <div
                      key={vaccine}
                      className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between"
                    >
                      <label className="inline-flex items-center text-black cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(formData.selectedVaccines[vaccine])}
                          onChange={(e) =>
                            handleVaccineCheckbox(vaccine, e.target.checked)
                          }
                          disabled={sectionDisabled}
                          className="mr-2 h-4 w-4"
                        />
                        <span className="font-medium">{vaccine}</span>
                      </label>
                      {lotNum && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                          Lot: {typeof lotNum === "object" ? JSON.stringify(lotNum) : lotNum}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PPD Section */}
            <div className="border-t pt-4 mt-6">
              <label className="inline-flex items-center text-black font-semibold cursor-pointer mb-3">
                <input
                  type="checkbox"
                  name="ppdPerformed"
                  checked={formData.ppdPerformed}
                  onChange={handleCheckboxChange}
                  disabled={sectionDisabled}
                  className="mr-2 h-4 w-4"
                />
                PPD Performed
              </label>

              {formData.ppdPerformed && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Read On Date *
                    </label>
                    <input
                      type="date"
                      name="ppdReadOn"
                      value={formData.ppdReadOn}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        errors.ppdReadOn ? "border-red-500" : "border-gray-300"
                      } rounded text-black`}
                    />
                    {errors.ppdReadOn && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ppdReadOn}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Induration (mm) *
                    </label>
                    <input
                      type="text"
                      name="ppdInduration"
                      value={formData.ppdInduration}
                      onChange={handleIndurationChange}
                      placeholder="e.g. 0 or 10"
                      className={`w-full p-2 border ${
                        errors.ppdInduration ? "border-red-500" : "border-gray-300"
                      } rounded text-black`}
                    />
                    {errors.ppdInduration && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ppdInduration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Interpretation *
                    </label>
                    <select
                      name="ppdInterpretation"
                      value={formData.ppdInterpretation}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        errors.ppdInterpretation ? "border-red-500" : "border-gray-300"
                      } rounded text-black`}
                    >
                      <option value="">Select...</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                    {errors.ppdInterpretation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ppdInterpretation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </fieldset>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-md disabled:opacity-50 font-medium hover:bg-gray-800 transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccinationsForm;
