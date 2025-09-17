import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../Global/Toaster";
import axios from "../../axios";

const PhysicalExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentDate = new Date().toISOString();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reportData, setReportData] = useState("");
  const location = useLocation();
  const [formData, setFormData] = useState({
    heent: "",
    neck: "",
    lungs: "",
    heart: "",
    abdomen: "",
    orthopedic: "",
    neurologic: "",
    skin: "",
    comments: "",
    p4: false,
    p3: false,
    hepB: false,
    other: "",
    tspot: false,
    uds: false,
    noPhysicalExam: false,
    noBloodWork: false,
    bloodPressureDown: "",
    bloodPressureUp: "",
    pulse: "",
    hepatitisB: false,
    TD: false,
    influenza: false,
    MMR: false,
    Varicella: false,
    ppdDone: false,
    hxPPD: false,
    negativePPD: false,
    isStudentHealthy: null, // Yes/No radio
    clinicianSign: "",
    clinicianSignDate: "",
  });

  const PhysicalData = location?.state?.reportData;
useEffect(() => {
  if (PhysicalData) {
    // Prefill agar data available hai (edit mode)
    setFormData((prev) => ({
      ...prev,
      ...PhysicalData,
      clinicianSignDate: PhysicalData?.clinicianSignDate
        ? PhysicalData.clinicianSignDate.split("T")[0]
        : "",
    }));

    // agar vitals chahiye toh reportData me daldo
    setReportData(PhysicalData);
  } else {
    // agar PhysicalData nahi hai toh create mode
    setReportData("");
    setFormData((prev) => ({
      ...prev,
      heent: "",
      neck: "",
      lungs: "",
      heart: "",
      abdomen: "",
      orthopedic: "",
      neurologic: "",
      skin: "",
      comments: "",

      hepB: false,
      other: "",
      tspot: false,
      uds: false,
      noPhysicalExam: false,
      noBloodWork: false,
      bloodPressureDown: "",
      bloodPressureUp: "",
      pulse: "",
      hepatitisB: false,
      TD: false,
      influenza: false,
      MMR: false,
      Varicella: false,
      ppdDone: false,
      hxPPD: false,
      negativePPD: false,
      isStudentHealthy: null,
      clinicianSign: "",
      clinicianSignDate: "",
    }));
  }
}, [PhysicalData]);

  const fields = [
    "HEENT",
    "neck",
    "lungs",
    "heart",
    "abdomen",
    "orthopedic",
    "neurologic",
    "skin",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const getReportData = async () => {
    try {
      const response = await axios.get(
        `/admin/medical-form/${location?.state?.appointmentId}`
      );
      if (response.status === 200) {
        setReportData(response?.data?.data);
        if (response?.data?.data) {
          setFormData((prev) => ({
            ...prev,
            ...response.data.data,
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);
console.log(location,"location")
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setSubmitLoading(true);

    let payload = {
      type: "Physical Exam",
      appointment: location?.state?.appointmentId || "APPOINTMENT_ID",
      data: {},
      iscleared: formData.isStudentHealthy || false,
    };

    // sab fields copy karo except Part B (agar noPhysicalExam true ho to skip)
    let dataToSend = {};

    for (const field in formData) {
      if (
        formData[field] !== undefined &&
        formData[field] !== "" &&
        field !== "isStudentHealthy" // isko alag bhejna hai
      ) {
        // Part B skip condition
        if (
          formData.noPhysicalExam &&
          [
            "HEENT",
            "neck",
            "lungs",
            "heart",
            "abdomen",
            "orthopedic",
            "neurologic",
            "skin",
            "comments",
          ].includes(field)
        ) {
          continue; // skip Part B fields
        }

// +       // ✅ PPD fields allow karo (agar ppdDone checked hai to bhejna hi hai)
// +       if (formData.ppdDone) {
// +         [
// +           "ppdPerformedDate",
// +           "ppdReadDate",
// +           "ppdInduration",
// +           "ppdInterpretation",
// +         ].forEach((ppdField) => {
// +           if (formData[ppdField] !== undefined && formData[ppdField] !== "") {
// +             dataToSend[ppdField] = formData[ppdField];
// +           }
// +         });
// +       }

        dataToSend[field] = formData[field];
      }
    }

    payload.data = dataToSend;

    const response = await axios.post("/admin/medical-form", payload);

    if (response.status === 200 || response.status === 201) {
      setSubmitLoading(false);
      SuccessToast("Report Submitted");
      navigate("/appointments");
    }
  } catch (err) {
    console.log(err);
    ErrorToast("Error");
  }
};


  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 shadow-lg rounded-lg overflow-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Physical Exam Sheet
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 text-gray-700">
        {/* Part B */}
        <section className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Part B: Physical Exam
          </h2>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="noPhysicalExam"
                checked={formData.noPhysicalExam}
                onChange={handleChange}
                className="mr-2"
              />
              No physical exam performed today
            </label>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
              formData.noPhysicalExam ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {fields.map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Normal">Normal</option>
                  <option value="Abnormal">Abnormal</option>
                </select>
              </div>
            ))}
          </div>

          <div
            className={`mt-6 ${
              formData.noPhysicalExam ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <label className="block text-sm font-medium mb-2">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Additional comments"
            />
          </div>
        </section>

        {/* Blood Work */}
        <section className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Blood Work
          </h2>
          {/* Blood Work / Immunity Titers */}

  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      { label: "Mumps", name: "mumps" },
      { label: "Rubella", name: "rubella" },
      { label: "Rubeola", name: "rubeola" },
      { label: "Varicella", name: "varicella" },
      { label: "Hepatitis B", name: "hepatitisB" },
    ].map(({ label, name }) => (
      <div key={name} className="flex flex-col space-y-2">
        <label className="block text-sm font-medium">{label}</label>
        <select
          name={name}
          value={formData[name] || "Not Immune"}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Immune">Immune</option>
          <option value="Not Immune">Not Immune</option>
        </select>
      </div>
    ))}
  </div>



          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 mt-4">Other</label>
            <input
              name="other"
              value={formData.other}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="other"
            />
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {[
    { label: "T-spot/QuantiFERON", name: "tspot" },
    { label: "No Physical Exam", name: "noPhysicalExam" },
    { label: "No Blood Work", name: "noBloodWork" },
  ].map(({ label, name }) => (
    <div key={name} className="flex flex-col mt-2">
      {name === "tspot" ? (
        <>
          <label className="text-sm font-medium mb-1">{label}</label>
          <select
            name="tspot"
            value={formData.tspot || "Not Performed"}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Not Performed">Not Performed</option>
            <option value="Performed">Performed</option>
          </select>

          {/* Show Normal/Abnormal only if Performed */}
          {formData.tspot === "Performed" && (
            <select
              name="tspotResult"
              value={formData.tspotResult || "Normal"}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Normal">Normal</option>
              <option value="Abnormal">Abnormal</option>
            </select>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={formData[name]}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor={name} className="text-sm font-medium">
            {label}
          </label>
        </div>
      )}
    </div>
  ))}
</div>


          <div>
            <label className="block text-sm font-medium mb-2 mt-8">
              Blood Pressure Down
            </label>
            <input
              name="bloodPressureDown"
              value={reportData?.Vitals?.diastolic || ""}
              disabled
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 mt-4">
              Blood Pressure Up
            </label>
            <input
              name="bloodPressureUp"
              value={reportData?.Vitals?.systolic || ""}
              disabled
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 mt-4">Pulse</label>
            <input
              name="pulse"
              value={reportData?.Vitals?.pulse || ""}
              disabled
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXXX"
            />
          </div>
        </section>

        {/* Vaccines */}
        <section className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Vaccine given today
          </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {[
    { label: "PPD", name: "ppdDone" },
    {
      label: "Recent negative PPD Or QuantiFERON",
      name: "negativePPD",
    },
  ].map(({ label, name }) => (
    <div key={name} className="flex flex-col mt-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={formData[name]}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      </div>

      {/* Extra fields for PPD */}
      {name === "ppdDone" && formData.ppdDone && (
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              PPD Performed (Date)
            </label>
            <input
              type="date"
              name="ppdPerformedDate"
              value={formData.ppdPerformedDate || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              PPD Read (Date)
            </label>
            <input
              type="date"
              name="ppdReadDate"
              value={formData.ppdReadDate || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Induration (mm)
            </label>
            <input
              type="number"
              name="ppdInduration"
              value={formData.ppdInduration || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter mm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Interpretation
            </label>
            <select
              name="ppdInterpretation"
              value={formData.ppdInterpretation || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
            </select>
          </div>
        </div>
      )}
    </div>
  ))}
</div>

        </section>

        {/* Healthy Student */}
        <section className="p-6 bg-white rounded-xl shadow-md">
          <label className="text-sm font-medium mb-2 block">
            This student is healthy and fit enough to perform all activities as
            required by the selected program and vocation
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="isStudentHealthy"
                value="true"
                checked={formData.isStudentHealthy === true}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isStudentHealthy"
                value="false"
                checked={formData.isStudentHealthy === false}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>

          <h2 className="text-[18px] font-[600] text-black mt-5">
            Clinician Signature
          </h2>
          <select
            className="w-full border border-gray-300 h-[40px] rounded-[10px] mt-4"
            name="clinicianSign"
            value={formData.clinicianSign}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Jhon">Jhon</option>
            <option value="Benny">Benny</option>
            <option value="David">David</option>
            <option value="Stacy">Stacy</option>
          </select>

          <div>
            <label className="block text-black text-[18px] font-[600] mb-2 mt-8">Clinician Signature Date</label>
            <input
              name="clinicianSignDate"
              value={
                formData?.clinicianSignDate
                  ? formData?.clinicianSignDate.split("T")[0]
                  : ""
              }
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md font-semibold"
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalExam;
