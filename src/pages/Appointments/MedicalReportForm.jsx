import React, { useState } from "react";
import { CiPen } from "react-icons/ci";


const MedicalReportForm = () => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    dob: "",
    reportDate: "",
    mumpsTiter: "Immune",
    rubellaTiter: "Immune",
    rubeolaTiter: "Nonimmune",
    varicellaTiter: "Nonimmune",
    hepatitisTiter: "Nonimmune",
    physicalExam: "",
    tspotTest1: "Negative for Tuberculosis",
    tspotTest2: "Not Performed",
    hepatitisB1: "Pending",
    hepatitisB2: "Pending",
    hepatitisB3: "Pending",
    mmrVaccination1: "Not Performed",
    mmrVaccination2: "Not Performed",
    varicellaVaccination1: "Not Performed",
    varicellaVaccination2: "Not Performed",
    tdapVaccination: "Not Performed",
    influenzaVaccination: "Not Performed",
    benzodiazepine: "Negative",
    barbiturates: "Negative",
    cocaine: "Negative",
    marijuana: "Negative",
    opiates: "Negative",
    amphetamines: "Negative",
    methamphetamines: "Negative",
    pcp: "Negative",
    methadone: "Negative",
    mdma: "Negative",
    propoxyphene: "Negative",
    oxycodone: "Negative",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add API call or data handling logic here
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
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-black">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full border rounded p-2 text-black"
              required
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
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full border rounded p-2 text-black"
              required
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
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Blood Tests</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {[
            { label: "Mumps IgG Titer", field: "mumpsTiter" },
            { label: "Rubella IgG Titer", field: "rubellaTiter" },
            { label: "Rubeola IgG Titer", field: "rubeolaTiter" },
            { label: "Varicella IgG Titer", field: "varicellaTiter" },
            { label: "Hepatitis B Sab Titer", field: "hepatitisTiter" },
          ].map((test) => (
            <div key={test.field}>
              <label className="block text-sm font-medium text-black">{test.label}</label>
              <select
                value={formData[test.field]}
                onChange={(e) => handleChange(test.field, e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="Immune">Immune</option>
                <option value="Nonimmune">Nonimmune</option>
              </select>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Procedures</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-black">Physical Exam</label>
            <input
              type="text"
              value={formData.physicalExam}
              onChange={(e) => handleChange("physicalExam", e.target.value)}
              className="w-full border rounded p-2 text-black"
              placeholder="Enter details (e.g., Cleared, etc.)"
              disabled={!isEditing}
            />
          </div>
          {[
            { label: "T-spot IGRA TB Test #1", field: "tspotTest1" },
            { label: "T-spot IGRA TB Test #2", field: "tspotTest2" },
          ].map((test) => (
            <div key={test.field}>
              <label className="block text-sm font-medium text-black">{test.label}</label>
              <select
                value={formData[test.field]}
                onChange={(e) => handleChange(test.field, e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="Negative for Tuberculosis">Negative for Tuberculosis</option>
                <option value="Not Performed">Not Performed</option>
              </select>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Vaccinations</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {[
            { label: "Hepatitis B Vaccination #1", field: "hepatitisB1" },
            { label: "Hepatitis B Vaccination #2", field: "hepatitisB2" },
            { label: "Hepatitis B Vaccination #3", field: "hepatitisB3" },
            { label: "MMR Vaccination #1", field: "mmrVaccination1" },
            { label: "MMR Vaccination #2", field: "mmrVaccination2" },
            { label: "Varicella Vaccination #1", field: "varicellaVaccination1" },
            { label: "Varicella Vaccination #2", field: "varicellaVaccination2" },
            { label: "Tdap Vaccination", field: "tdapVaccination" },
            { label: "Influenza Vaccination", field: "influenzaVaccination" },
          ].map((vaccine) => (
            <div key={vaccine.field}>
              <label className="block text-sm font-medium text-black">{vaccine.label}</label>
              <select
                value={formData[vaccine.field]}
                onChange={(e) => handleChange(vaccine.field, e.target.value)}
                className="w-full border rounded p-2 text-black"
                disabled={!isEditing}
              >
                <option value="Not Performed">Not Performed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-lg mb-4 text-black">Drug Test Results</h3>
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
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MedicalReportForm;
