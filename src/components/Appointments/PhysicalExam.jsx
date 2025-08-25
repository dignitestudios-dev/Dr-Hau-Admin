import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../Global/Toaster";
import axios from "../../axios";

const PhysicalExam = () => {
  const { id } = useParams();
  const currentDate = new Date().toISOString();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    dateOfBirth: "",
    ssnLast4: "",
    gender: "",
    schoolCity: "",
    phoneNo: "",
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
    hepatitisBPrior: "",
    TD: false,
    TDPrior: "",
    influenza: false,
    MMR: false,
    MMRPrior: "",
    Varicella: false,
    VaricellaPrior: "",
    ppdDone: false,
    ppdNotDoneReason: "",
    hxPPD: false,
    negativePPD: false,
    isStudentHealthy: false,
    isNormalExam: false,
    studentSign: false,
    studentSignDate: "",
    clinicianSign: false,
    clinicianSignDate: "",
  });
 const fields = [
    "heent",
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

    // Check if it's a radio button
    if (type === "radio") {
      // Convert the value to a boolean if it's "true" or "false"
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "true", // convert the string to boolean
      }));
    } else {
      // For other input types (checkboxes, text, etc.)
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const dataToSend = { appointment: id, currentDate: currentDate };
      for (const field in formData) {
        if (formData[field] !== undefined && formData[field] !== "") {
          dataToSend[field] = formData[field];
        }
      }

      const response = await axios.post("/admin/physicalReport", dataToSend);
      if (response.status === 200 || response.status === 201) {
        setSubmitLoading(false);
        SuccessToast("Report Submitted");
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
        {/* PART A */}
        {/* <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Part A: Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              name="address"
              value={formData?.address}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                name="city"
                value={formData?.city}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                name="state"
                value={formData?.state}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zip Code</label>
              <input
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Zip Code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                School City
              </label>
              <input
                name="schoolCity"
                value={formData?.schoolCity}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="School City"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Phone No</label>
              <input
                name="phoneNo"
                value={formData?.phoneNo}
                onChange={handleChange}
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Phone No"
              />
            </div>
          
          </div>
        </section> */}

        {/* <div className="flex items-center">
              <label className="mr-4">Gender:</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div> */}
        {/* Part B */}
          <section className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Part B: Physical Exam
      </h2>

      {/* No Exam Checkbox */}
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="noExam"
            checked={formData.noExam}
            onChange={handleChange}
            className="mr-2"
          />
          No physical exam performed today
        </label>
      </div>

      {/* Exam Fields */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
          formData.noExam ? "opacity-50 pointer-events-none" : ""
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

            {/* Notes only if abnormal */}
          
          </div>
        ))}
      </div>

      {/* Comments */}
      <div
        className={`mt-6 ${
          formData.noExam ? "opacity-50 pointer-events-none" : ""
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
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Blood Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "P4", name: "p4" },
              { label: "P3", name: "p3" },
              { label: "Help B surface Ab", name: "hepB" },
            ].map(({ label, name }) => (
              <div key={name} className="flex items-center">
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
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 mt-4">Other</label>
            <input
              name="other"
              value={formData?.other}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="other"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "T-spot/QuantiFERON", name: "tspot" },
              { label: "UDS", name: "uds" },
              { label: "No Physical Exam", name: "noPhysicalExam" },
              { label: "No Blood Work", name: "noBloodWork" },
            ].map(({ label, name }) => (
              <div key={name} className="flex items-center">
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
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 mt-8">
              Blood Pressure Down
            </label>
            <input
              name="bloodPressureDown"
              value={formData?.bloodPressureDown}
              onChange={handleChange}
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
              value={formData?.bloodPressureUp}
              onChange={handleChange}
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 mt-4">pulse</label>
            <input
              name="pulse"
              value={formData?.pulse}
              onChange={handleChange}
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXXX"
            />
          </div>
        </section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Vaccine given today
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Hepatitis B ", name: "hepatitisBPrior" },
            { label: "TD", name: "TD" },
            { label: "influenza", name: "influenza" },
          ].map(({ label, name }) => (
            <div key={name} className="flex items-center">
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
          ))}
        </div>

        {/* Additional Fields for MMR, Varicella, PPD */}
        <section>
          <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-2 gap-6">
            {/* MMR */}
            <div className="flex items-center">
              <label className="mr-4">
                {" "}
                <input
                  type="checkbox"
                  name="MMR"
                  value={true}
                  checked={formData?.MMR === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                MMR
              </label>
            </div>
            {/* MMR Prior */}
            <div></div>

            {/* Heparitis */}
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="hepatitisB"
                  value={true}
                  checked={formData?.hepatitisB === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                hepatitisB
              </label>
            </div>
            {/* hepatitisBPrior */}
            <div></div>

            {/* Varicella */}
            <div className="flex items-center">
              <label className="mr-4">
                {" "}
                <input
                  type="checkbox"
                  name="Varicella"
                  value={true}
                  checked={formData?.Varicella === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Varicella
              </label>
            </div>
            {/* Varicella Prior */}
            <div></div>
            <hr className="w-full" />

            {/* PPD Done */}

            <div></div>

            {/* hxPPD Done */}
            <div className=" items-center">
              <div className="flex items-center">
                <label className="mr-4">
                  {" "}
                  <input
                    type="checkbox"
                    name="ppdDone"
                    value={true}
                    checked={formData?.ppdDone === true}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  PPD
                </label>
              </div>
              <h2 className="mt-3"> OR PPD not done because </h2>
              <label className="mr-4">
                {" "}
                <input
                  type="checkbox"
                  name="hxPPD"
                  value={true}
                  checked={formData?.hxPPD === true}
                  onChange={handleChange}
                  className="mr-2 mt-6"
                />
                Hx of positive PPD
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {/* negativePPD  */}
            <div className="flex items-center mt-8">
              <label className="mr-4">
                {" "}
                <input
                  type="checkbox"
                  name="negativePPD"
                  value={true}
                  checked={formData?.negativePPD === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Recent negative PPD Or QuantiFERON
              </label>
            </div>

            {/* isNormalExam  */}
            <div className="flex items-center mt-8"></div>

            {/* clinicianSign  */}
            <div className="flex items-center mt-8">
              <label className="mr-4">
                {" "}
                <input
                  type="checkbox"
                  name="clinicianSign"
                  value={true}
                  checked={formData?.clinicianSign === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                clinicianSign
              </label>
            </div>

            {/* studentSign  */}
          </div>
          <hr className="mt-5 mb-5" />
          <div className="flex gap-3">
            <h2>
              This student is healthy and fit enough to perform all activities
              as required by the selected program and vocation{" "}
              <input type="checkbox" /> Yes
              <input type="checkbox" /> No
            </h2>
          </div>
          <h2 className="text-[18px] font-[600] text-black mt-5 ">Clinician Signature</h2>
          <select className="w-full border border-gray-300 h-[40px] rounded-[10px] mt-4 " name="" id="">
            <option value="">Jhon</option>
            <option value="">Benny</option>
            <option value="">David</option>
            <option value="">Stacy</option>
          </select>
          <div>
            <label className="block text-sm font-medium mb-2 mt-8">
              Date
            </label>
            <input
              name="studentSignDate"
              value={
                formData?.studentSignDate
                  ? formData?.studentSignDate.split("T")[0]
                  : ""
              }
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
          
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md font-semibold"
            // disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalExam;
