import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../Global/Toaster";
import axios from "../../axios";

const PhysicalExam = () => {
  const { id } = useParams();
  const currentDate = new Date().toISOString();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    // lastName: '',
    // firstName: '',
    address: '',
    city: '',
    state: '',
    zipcode: "",
    dateOfBirth: '',
    ssnLast4: '',
    gender: '',
    schoolCity: '',
    phoneNo: '',
    heent: '',
    neck: '',
    lungs: '',
    heart: '',
    abdomen: '',
    orthopedic: '',
    neurologic: '',
    skin: '',
    comments: '',
    p4: true,
    p3: false,
    hepB: true,
    other: '',
    tspot: false,
    uds: true,
    noPhysicalExam: false,
    noBloodWork: false,
    bloodPressureDown: 80,
    bloodPressureUp: 120,
    pulse: 72,
    hepatitisB: true,
    hepatitisBPrior: 'Yes',
    TD: true,
    TDPrior: '84',
    influenza: true,
    MMR: true,
    MMRPrior: '49xp',
    Varicella: true,
    VaricellaPrior: '50',
    ppdDone: true,
    ppdNotDoneReason: '',
    hxPPD: true,
    negativePPD: 'Yes',
    isStudentHealthy: true,
    isNormalExam: true,
    studentSign: true,
    studentSignDate: '2024-11-19T00:00:00.000Z',
    clinicianSign: true,
    clinicianSignDate: '2024-11-19T00:00:00.000Z',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Check if it's a radio button
    if (type === 'radio') {
      // Convert the value to a boolean if it's "true" or "false"
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === 'true', // convert the string to boolean
      }));
    } else {
      // For other input types (checkboxes, text, etc.)
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
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
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Physical Exam Sheet</h1>
      <form onSubmit={handleSubmit} className="space-y-8 text-gray-700">
        {/* PART A */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Part A: Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="First Name"
              />
            </div> */}
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
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Zip Code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">School City</label>
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
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Phone No"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : ""}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
            
            
          </div>
        </section>

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
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Part B: Physical Exam</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              "heent", "neck", "lungs", "heart", "abdomen", "orthopedic", "neurologic", "skin"
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter details"
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 mt-4">Comments</label>
            <input
              name="comments"
              value={formData?.comments}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="comments"
            />
          </div>
        </section>

        {/* Blood Work */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Blood Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "P4", name: "p4" },
              { label: "P3", name: "p3" },
              { label: "Help B surface Ab", name: "hepB" },
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
                <label htmlFor={name} className="text-sm font-medium">{label}</label>
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

          <div>
              <label className="block text-sm font-medium mb-2 mt-8">Blood Pressure Down</label>
              <input
                name="bloodPressureDown"
                value={formData?.bloodPressureDown}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 mt-4">Blood Pressure Up</label>
              <input
                name="bloodPressureUp"
                value={formData?.bloodPressureUp}
                onChange={handleChange}
                type="text"
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
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="XXXX"
              />
            </div>
        </section>




          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "hepatitisBPrior", name: "hepatitisBPrior" },
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
                <label htmlFor={name} className="text-sm font-medium">{label}</label>
              </div>
            ))}
          </div>



               {/* Additional Fields for MMR, Varicella, PPD */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Immunization & PPD</h2>

          <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-2 gap-6">
            {/* MMR */}
          <div className="flex items-center">
              <label className="mr-4">MMR</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="MMR"
                  value={true}
                  checked={formData?.MMR === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="MMR"
                  value={false}
                  checked={formData?.MMR === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {/* MMR Prior */}
            <div>
              <label className="block text-sm font-medium mb-2">MMR Prior</label>
              <input
                name="MMRPrior"
                value={formData?.MMRPrior}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter MMR Prior info"
              />
            </div>



{/* Heparitis */}
<div className="flex items-center">
              <label className="mr-4">hepatitisB</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="hepatitisB"
                  value={true}
                  checked={formData?.hepatitisB === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="hepatitisB"
                  value={false}
                  checked={formData?.hepatitisB === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {/* hepatitisBPrior */}
            <div>
              <label className="block text-sm font-medium mb-2">hepatitisBPrior</label>
              <input
                name="hepatitisBPrior"
                value={formData?.hepatitisBPrior}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter hepatitisB Prior info"
              />
            </div>



            {/* Varicella */}
            <div className="flex items-center">
              <label className="mr-4">Varicella</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="Varicella"
                  value={true}
                  checked={formData?.Varicella === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="Varicella"
                  value={false}
                  checked={formData?.Varicella === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {/* Varicella Prior */}
            <div>
              <label className="block text-sm font-medium mb-2">Varicella Prior</label>
              <input
                name="VaricellaPrior"
                value={formData?.VaricellaPrior}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Varicella Prior info"
              />
            </div>

            {/* PPD Done */}
            <div className="flex items-center">
              <label className="mr-4">PPD Done</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="ppdDone"
                  value={true}
                  checked={formData?.ppdDone === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="ppdDone"
                  value={false}
                  checked={formData?.ppdDone === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>


            <div>
              <label className="block text-sm font-medium mb-2">PPD not done reason</label>
              <input
                name="ppdNotDoneReason"
                value={formData?.ppdNotDoneReason}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter ppd Not Done Reason"
              />
            </div>

            {/* hxPPD Done */}
            <div className="flex items-center">
              <label className="mr-4">hxPPD</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="hxPPD"
                  value={true}
                  checked={formData?.hxPPD === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="hxPPD"
                  value={false}
                  checked={formData?.hxPPD === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>

          </div>

        
<div className="grid grid-cols-2">
{/* negativePPD  */}
<div className="flex items-center mt-8">
              <label className="mr-4">negativePPD</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="negativePPD"
                  value={true}
                  checked={formData?.negativePPD === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="negativePPD"
                  value={false}
                  checked={formData?.negativePPD === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>


        {/* isNormalExam  */}
<div className="flex items-center mt-8">
              <label className="mr-4">isNormalExam</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="isNormalExam"
                  value={true}
                  checked={formData?.isNormalExam === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="isNormalExam"
                  value={false}
                  checked={formData?.isNormalExam === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>



            {/* clinicianSign  */}
<div className="flex items-center mt-8">
              <label className="mr-4">clinicianSign</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="clinicianSign"
                  value={true}
                  checked={formData?.clinicianSign === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="clinicianSign"
                  value={false}
                  checked={formData?.clinicianSign === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>     

            {/* studentSign  */}
<div className="flex items-center mt-8">
              <label className="mr-4">studentSign</label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="studentSign"
                  value={true}
                  checked={formData?.studentSign === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="mr-6">
                <input
                  type="radio"
                  name="studentSign"
                  value={false}
                  checked={formData?.studentSign === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>  
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 mt-8">studentSignDate</label>
              <input
                name="studentSignDate"
                value={formData?.studentSignDate ? formData?.studentSignDate.split("T")[0] : ""}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> 


            <div>
              <label className="block text-sm font-medium mb-2 mt-4">clinicianSignDate</label>
              <input
                name="clinicianSignDate"
                value={formData?.studentSignDate ? formData?.clinicianSignDate?.split("T")[0] : ""}
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
