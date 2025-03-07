import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { CiPen } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import { useNavigate } from "react-router-dom";

const MedicalReportForm = () => {
  const { id } = useParams();
  const currentDate = new Date().toISOString();
  const [submitLoading, setSubmitLoading] = useState(false);
  const location = useLocation(); // To access the passed state
  const { appointment } = location?.state || {};

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mumpsImmunity: false,
    rubellaImmunity: false,
    rubeolaImmunity: false,
    varicellaImmunity: false,
    hepatitisImmunity: false,
    mumpsDate: "",
    rubellaDate: "",
    rubeolaDate: "",
    varicellaDate: "",
    hepatitisDate: "",
    physicalExam: "",
    physicalExamDate: "",
    physicalExamNote: "",
    tspotTest1: "",
    tspot1Date: "",
    tspot1Note: "",
    tspotTest2: "",
    tspot2Date: "",
    tspot2Note: "",
    hepatitisBVaccination1Date: "",
    hepatitisBVaccination1Note: "",
    hepatitisBVaccination2Date: "",
    hepatitisBVaccination2Note: "",
    hepatitisBVaccination3Date: "",
    hepatitisBVaccination3Note: "",
    mmrVaccination1Date: "",
    mmrVaccination1Note: "",
    mmrVaccination2Date: "",
    mmrVaccination2Note: "",
    varicellaVaccination1Date: "",
    varicellaVaccination1Note: "",
    varicellaVaccination2Date: "",
    varicellaVaccination2Note: "",
    tdapVaccinationDate: "",
    tdapVaccinationNote: "",
    influenzaVaccinationDate: "",
    influenzaVaccinationNote: "",
    benzodiazepine: "",
    barbituates: "",
    cocaine: "",
    marijuana: "",
    opiates: "",
    amphetamines: "",
    methamphetamines: "",
    pcp: "",
    methadone: "",
    mdma: "",
    propoxyphene: "",
    oxycodone: "",
  });

  const handleBackendData = (backendData) => {
    setFormData((prevState) => ({
      ...prevState,
      mumpsImmunity: backendData.mumpsImmunity ?? false, // Fallback to false if null
      rubellaImmunity: backendData.rubellaImmunity ?? false,
      rubeolaImmunity: backendData.rubeolaImmunity ?? false,
      varicellaImmunity: backendData.varicellaImmunity ?? false,
      hepatitisImmunity: backendData.hepatitisImmunity ?? false,

      mumpsDate: backendData.mumpsDate
        ? backendData.mumpsDate.split("T")[0]
        : "", // Handle date
      rubellaDate: backendData.rubellaDate
        ? backendData.rubellaDate.split("T")[0]
        : "",
      rubeolaDate: backendData.rubeolaDate
        ? backendData.rubeolaDate.split("T")[0]
        : "",
      varicellaDate: backendData.varicellaDate
        ? backendData.varicellaDate.split("T")[0]
        : "",
      hepatitisDate: backendData.hepatitisDate
        ? backendData.hepatitisDate.split("T")[0]
        : "",

      physicalExamDate: backendData.physicalExamDate || "", // Handle empty date fields
      physicalExamNote: backendData.physicalExamNote || "",

      tspot1Date: backendData.tspot1Date || "",
      tspot1Note: backendData.tspot1Note || "",
      tspot2Date: backendData.tspot2Date || "",
      tspot2Note: backendData.tspot2Note || "",

      hepatitisBVaccination1Date: backendData.hepatitisBVaccination1Date || "",
      hepatitisBVaccination1Note: backendData.hepatitisBVaccination1Note || "",
      hepatitisBVaccination2Date: backendData.hepatitisBVaccination2Date || "",
      hepatitisBVaccination2Note: backendData.hepatitisBVaccination2Note || "",
      hepatitisBVaccination3Date: backendData.hepatitisBVaccination3Date || "",
      hepatitisBVaccination3Note: backendData.hepatitisBVaccination3Note || "",

      mmrVaccination1Date: backendData.mmrVaccination1Date || "",
      mmrVaccination1Note: backendData.mmrVaccination1Note || "",
      mmrVaccination2Date: backendData.mmrVaccination2Date || "",
      mmrVaccination2Note: backendData.mmrVaccination2Note || "",

      varicellaVaccination1Date: backendData.varicellaVaccination1Date || "",
      varicellaVaccination1Note: backendData.varicellaVaccination1Note || "",
      varicellaVaccination2Date: backendData.varicellaVaccination2Date || "",
      varicellaVaccination2Note: backendData.varicellaVaccination2Note || "",
      tdapVaccinationDate: backendData.tdapVaccinationDate || "",
      tdapVaccinationNote: backendData.tdapVaccinationNote || "",
      influenzaVaccinationDate: backendData.influenzaVaccinationDate || "",
      influenzaVaccinationNote: backendData.influenzaVaccinationNote || "",

      benzodiazepine: backendData.benzodiazepine || "",
      barbituates: backendData.barbituates || "",
      cocaine: backendData.cocaine || "",
      marijuana: backendData.marijuana || "",
      opiates: backendData.opiates || "",
      amphetamines: backendData.amphetamines || "",

      methamphetamines: backendData.methamphetamines || "",

      pcp: backendData.pcp || "",
      methadone: backendData.methadone || "",
      mdma: backendData.mdma || "",
      propoxyphene: backendData.propoxyphene || "",
      oxycodone: backendData.oxycodone || "",
    }));
  };

  useEffect(() => {
    if (appointment) {
      handleBackendData(appointment);
    }
  }, [appointment]);

  const handleChange = (field, value) => {
    if (typeof value === "boolean") {
      setFormData({ ...formData, [field]: value });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const data = new FormData();

      data.append("appointment", id);
      if (appointment?._id) {
        data.append("reportId", appointment._id);
      }
      data.append("currentDate", currentDate);

      for (const field in formData) {
        console.log("==> ", field);

        // Check if the field has a non-empty value
        if (formData[field] !== "") {
          data.append(field, formData[field]);
        }
      }
      let url = "";
      if (appointment) {
        url = "/admin/updateReport";
      } else {
        url = "/admin/report";
      }
      const response = await axios.post(url, data);
      console.log("Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        setSubmitLoading(false);
        SuccessToast("Report Submitted");
        navigate("/events");
      }
    } catch (error) {
      console.log("Error:", error);
      setSubmitLoading(false);
      ErrorToast(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-50 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-black">
          Medical Record Form
        </h2>

        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="bg-black text-white p-2 rounded-md flex items-center space-x-2"
        >
          <CiPen />
          <span>{isEditing ? "Editing.." : "Edit"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
        {/* <div className="grid grid-cols-2 gap-6 mb-4"> */}
        {/* <div>
            <label className="block text-sm font-medium text-black">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full border rounded p-2 text-black"
      
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full border rounded p-2 text-black"
      
              disabled={!isEditing}
            />
          </div> */}
        {/* <div>
            <label className="block text-sm font-medium text-black">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full border rounded p-2 text-black"
      
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Report Date</label>
            <input
              type="date"
              value={formData.reportDate}
              onChange={(e) => handleChange("reportDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
      
              disabled={!isEditing}
            />
          </div>
        </div> */}

        <h3 className="font-semibold text-lg mb-4 text-black">Blood Tests</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-black">
              Mumps IgG Titer
            </label>
            <select
              value={formData.mumpsImmunity}
              onChange={(e) => handleChange("mumpsImmunity", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value={true}>Immune</option>
              <option value={false}>Nonimmune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Mumps Date
            </label>
            <input
              type="date"
              value={formData.mumpsDate ? formData.mumpsDate.split("T")[0] : ""}
              onChange={(e) => handleChange("mumpsDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Rubella IgG Titer
            </label>
            <select
              value={formData.rubellaImmunity}
              onChange={(e) => handleChange("rubellaImmunity", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value={true}>Immune</option>
              <option value={false}>Nonimmune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Rubella Date
            </label>
            <input
              type="date"
              value={
                formData.rubellaDate ? formData.rubellaDate.split("T")[0] : ""
              }
              onChange={(e) => handleChange("rubellaDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Rubeola IgG Titer
            </label>
            <select
              value={formData.rubeolaImmunity}
              onChange={(e) => handleChange("rubeolaImmunity", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value={true}>Immune</option>
              <option value={false}>Nonimmune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Rubeola Date
            </label>
            <input
              type="date"
              value={
                formData.rubeolaDate ? formData.rubeolaDate.split("T")[0] : ""
              }
              onChange={(e) => handleChange("rubeolaDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Varicella IgG Titer
            </label>
            <select
              value={formData.varicellaImmunity}
              onChange={(e) =>
                handleChange("varicellaImmunity", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value={true}>Immune</option>
              <option value={false}>Nonimmune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Varicella Date
            </label>
            <input
              type="date"
              value={
                formData.varicellaDate
                  ? formData.varicellaDate.split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("varicellaDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Sab Titer
            </label>
            <select
              value={formData.hepatitisImmunity}
              onChange={(e) =>
                handleChange("hepatitisImmunity", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value={true}>Immune</option>
              <option value={false}>Nonimmune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis Date
            </label>
            <input
              type="date"
              value={
                formData.hepatitisDate
                  ? formData.hepatitisDate.split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("hepatitisDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Procedures</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Physical Exam Field */}
          {/* <div>
    <label className="block text-sm font-medium text-black">Physical Exam</label>
    <input
      type="text"
      value={formData.physicalExam}
      onChange={(e) => handleChange("physicalExam", e.target.value)}
      className="w-full border rounded p-2 text-black"
      placeholder="Enter details (e.g., Cleared, etc.)"
      disabled={!isEditing}
    />
  </div> */}

          {/* Physical Exam Date Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              Physical Exam Date
            </label>
            <input
              type="date"
              value={
                formData.physicalExamDate
                  ? formData.physicalExamDate.split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("physicalExamDate", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          {/* Physical Exam Note Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              Physical Exam Note
            </label>
            <input
              type="text"
              value={formData.physicalExamNote}
              onChange={(e) => handleChange("physicalExamNote", e.target.value)}
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note (e.g., Patient in good health, no significant issues observed.)"
              disabled={!isEditing}
            />
          </div>

          {/* T-spot IGRA TB Test #1 Field */}
          {/* <div>
            <label className="block text-sm font-medium text-black">
              T-spot IGRA TB Test #1
            </label>
            <select
              value={formData.tspotTest1}
              onChange={(e) => handleChange("tspotTest1", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value="Negative for Tuberculosis">
                Negative for Tuberculosis
              </option>
              <option value="Not Performed">Not Performed</option>
            </select>
          </div> */}

          {/* T-spot Test #1 Date Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              T-spot Test #1 Date
            </label>
            <input
              type="date"
              value={
                formData.tspot1Date ? formData.tspot1Date.split("T")[0] : ""
              }
              onChange={(e) => handleChange("tspot1Date", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          {/* T-spot Test #1 Note Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              T-spot Test #1 Note
            </label>
            <input
              type="text"
              value={formData.tspot1Note}
              onChange={(e) => handleChange("tspot1Note", e.target.value)}
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note (e.g., Negative result for TB test.)"
              disabled={!isEditing}
            />
          </div>

          {/* T-spot IGRA TB Test #2 Field */}
          {/* <div>
            <label className="block text-sm font-medium text-black">
              T-spot IGRA TB Test #2
            </label>
            <select
              value={formData.tspotTest2}
              onChange={(e) => handleChange("tspotTest2", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            >
              <option value="Negative for Tuberculosis">
                Negative for Tuberculosis
              </option>
              <option value="Not Performed">Not Performed</option>
            </select>
          </div> */}

          {/* T-spot Test #2 Date Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              T-spot Test #2 Date
            </label>
            <input
              type="date"
              value={
                formData.tspot2Date ? formData.tspot2Date.split("T")[0] : ""
              }
              onChange={(e) => handleChange("tspot2Date", e.target.value)}
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>

          {/* T-spot Test #2 Note Field */}
          <div>
            <label className="block text-sm font-medium text-black">
              T-spot Test #2 Note
            </label>
            <input
              type="text"
              value={formData.tspot2Note}
              onChange={(e) => handleChange("tspot2Note", e.target.value)}
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note (e.g., Negative result for TB test #2.)"
              disabled={!isEditing}
            />
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Vaccinations</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Hepatitis B Vaccination #1 */}
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #1 Date
            </label>
            <input
              type="date"
              value={formData.hepatitisBVaccination1Date}
              onChange={(e) =>
                handleChange("hepatitisBVaccination1Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #1 Note
            </label>
            <input
              type="text"
              value={formData.hepatitisBVaccination1Note}
              onChange={(e) =>
                handleChange("hepatitisBVaccination1Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for first dose"
              disabled={!isEditing}
            />
          </div>

          {/* Hepatitis B Vaccination #2 */}
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #2 Date
            </label>
            <input
              type="date"
              value={formData.hepatitisBVaccination2Date}
              onChange={(e) =>
                handleChange("hepatitisBVaccination2Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #2 Note
            </label>
            <input
              type="text"
              value={formData.hepatitisBVaccination2Note}
              onChange={(e) =>
                handleChange("hepatitisBVaccination2Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for second dose"
              disabled={!isEditing}
            />
          </div>

          {/* Hepatitis B Vaccination #3 */}
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #3 Date
            </label>
            <input
              type="date"
              value={formData.hepatitisBVaccination3Date}
              onChange={(e) =>
                handleChange("hepatitisBVaccination3Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Hepatitis B Vaccination #3 Note
            </label>
            <input
              type="text"
              value={formData.hepatitisBVaccination3Note}
              onChange={(e) =>
                handleChange("hepatitisBVaccination3Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for final dose"
              disabled={!isEditing}
            />
          </div>

          {/* MMR Vaccination #1 */}
          <div>
            <label className="block text-sm font-medium text-black">
              MMR Vaccination #1 Date
            </label>
            <input
              type="date"
              value={formData.mmrVaccination1Date}
              onChange={(e) =>
                handleChange("mmrVaccination1Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              MMR Vaccination #1 Note
            </label>
            <input
              type="text"
              value={formData.mmrVaccination1Note}
              onChange={(e) =>
                handleChange("mmrVaccination1Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for first dose"
              disabled={!isEditing}
            />
          </div>

          {/* MMR Vaccination #2 */}
          <div>
            <label className="block text-sm font-medium text-black">
              MMR Vaccination #2 Date
            </label>
            <input
              type="date"
              value={formData.mmrVaccination2Date}
              onChange={(e) =>
                handleChange("mmrVaccination2Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              MMR Vaccination #2 Note
            </label>
            <input
              type="text"
              value={formData.mmrVaccination2Note}
              onChange={(e) =>
                handleChange("mmrVaccination2Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for second dose"
              disabled={!isEditing}
            />
          </div>

          {/* Varicella Vaccination #1 */}
          <div>
            <label className="block text-sm font-medium text-black">
              Varicella Vaccination #1 Date
            </label>
            <input
              type="date"
              value={formData.varicellaVaccination1Date}
              onChange={(e) =>
                handleChange("varicellaVaccination1Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Varicella Vaccination #1 Note
            </label>
            <input
              type="text"
              value={formData.varicellaVaccination1Note}
              onChange={(e) =>
                handleChange("varicellaVaccination1Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for first dose"
              disabled={!isEditing}
            />
          </div>

          {/* Varicella Vaccination #2 */}
          <div>
            <label className="block text-sm font-medium text-black">
              Varicella Vaccination #2 Date
            </label>
            <input
              type="date"
              value={formData.varicellaVaccination2Date}
              onChange={(e) =>
                handleChange("varicellaVaccination2Date", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Varicella Vaccination #2 Note
            </label>
            <input
              type="text"
              value={formData.varicellaVaccination2Note}
              onChange={(e) =>
                handleChange("varicellaVaccination2Note", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for second dose"
              disabled={!isEditing}
            />
          </div>

          {/* Tdap Vaccination */}
          <div>
            <label className="block text-sm font-medium text-black">
              Tdap Vaccination Date
            </label>
            <input
              type="date"
              value={formData.tdapVaccinationDate}
              onChange={(e) =>
                handleChange("tdapVaccinationDate", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Tdap Vaccination Note
            </label>
            <input
              type="text"
              value={formData.tdapVaccinationNote}
              onChange={(e) =>
                handleChange("tdapVaccinationNote", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for Tdap vaccination"
              disabled={!isEditing}
            />
          </div>

          {/* Influenza Vaccination */}
          <div>
            <label className="block text-sm font-medium text-black">
              Influenza Vaccination Date
            </label>
            <input
              type="date"
              value={formData.influenzaVaccinationDate}
              onChange={(e) =>
                handleChange("influenzaVaccinationDate", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Influenza Vaccination Note
            </label>
            <input
              type="text"
              value={formData.influenzaVaccinationNote}
              onChange={(e) =>
                handleChange("influenzaVaccinationNote", e.target.value)
              }
              className="w-full border rounded p-2 text-black"
              placeholder="Enter note for influenza vaccination"
              disabled={!isEditing}
            />
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-4 text-black">Drug Report</h3>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                Benzodiazepine
              </label>
              <select
                value={formData.benzodiazepine}
                onChange={(e) => handleChange("benzodiazepine", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                Barbituates
              </label>
              <select
                value={formData.barbituates}
                onChange={(e) => handleChange("barbituates", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                cocaine
              </label>
              <select
                value={formData.cocaine}
                onChange={(e) => handleChange("cocaine", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                marijuana
              </label>
              <select
                value={formData.marijuana}
                onChange={(e) => handleChange("marijuana", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                opiates
              </label>
              <select
                value={formData.opiates}
                onChange={(e) => handleChange("opiates", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                amphetamines
              </label>
              <select
                value={formData.amphetamines}
                onChange={(e) => handleChange("amphetamines", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                pcp
              </label>
              <select
                value={formData.pcp}
                onChange={(e) => handleChange("pcp", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                methadone
              </label>
              <select
                value={formData.methadone}
                onChange={(e) => handleChange("methadone", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                mdma
              </label>
              <select
                value={formData.mdma}
                onChange={(e) => handleChange("mdma", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>

                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                propoxyphene
              </label>
              <select
                value={formData.propoxyphene}
                onChange={(e) => handleChange("propoxyphene", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-black">
                oxycodone
              </label>
              <select
                value={formData.oxycodone}
                onChange={(e) => handleChange("oxycodone", e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
            </div>
          </div>
        </div>

        {/* <h3 className="font-semibold text-lg mb-4 text-black">Drug Test Results</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {[
            { label: "Benzodiazepine", field: "benzodiazepine" },
            { label: "Barbiturates", field: "barbiturates" },
            { label: "Cocaine", field: "cocaine" },
            { label: "Marijuana", field: "marijuana" },
            { label: "Opiates", field: "opiates" },
            { label: "Amphetamines", field: "amphetamines" },
            { label: "Methamphetamines", field: "methamphetamines" },
            { label: "PCP", field: "pcp" },
            { label: "Methadone", field: "methadone" },
            { label: "MDMA", field: "mdma" },
            { label: "Propoxyphene", field: "propoxyphene" },
            { label: "Oxycodone", field: "oxycodone" },
          ].map((drug) => (
            <div key={drug.field}>
              <label className="block text-sm font-medium text-black">{drug.label}</label>
              <select
                value={formData[drug.field]}
                onChange={(e) => handleChange(drug.field, e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          ))}
        </div> */}
        {isEditing && (
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md mt-4"
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
};

export default MedicalReportForm;
