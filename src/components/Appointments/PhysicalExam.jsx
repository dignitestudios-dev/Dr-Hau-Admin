import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../Global/Toaster";
import axios from "../../axios";

const PhysicalExam = () => {
  const {id} = useParams()

  const currentDate = new Date().toISOString();
  const [submitLoading, setSubmitLoading] = useState(false)

  const [formData, setFormData] = useState({
        lastName: '',  // Initially empty
        firstName: '',
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'California',
        zipcode: "63635",
        dateOfBirth: '',  // You'll need to parse and format date properly if needed
        ssnLast4: '',  // Handle SSN last 4 digits
        gender: '',  // Can be 'Male' or 'Female'
        schoolCity: 'ACC',
        phoneNo: '+11234567890',
        heent: 'Normal',
        neck: 'Normal',
        lungs: 'Clear',
        heart: 'Normal',
        abdomen: 'Normal',
        orthopedic: 'Normal',
        neurologic: 'Normal',
        skin: 'Healthy',
        comments: '',
        p4: true,
        p3: false,
        hepB: true,
        other: 'No additional notes',
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
        hxPPD: 'No history of PPD',
        negativePPD: 'Yes',
        isStudentHealthy: true,
        isNormalExam: true,
        studentSign: true,
        studentSignDate: '2024-11-19T00:00:00.000Z',
        clinicianSign: true,
        clinicianSignDate: '2024-11-19T00:00:00.000Z',
      });
    
    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          setSubmitLoading(true)
      
          const dataToSend = {
            appointment: id,         
            currentDate: currentDate 
          };
      
            for (const field in formData) {
              if (formData[field] !== undefined && formData[field] !== "") {
                dataToSend[field] = formData[field];
              }
            }
      
            const response = await axios.post("/admin/physicalReport", dataToSend);
            if(response.status === 200 || response.status === 201){
                    setSubmitLoading(false)
                    SuccessToast("Report Submitted")
                  }
    }
    catch(err){
      console.log(err)
      ErrorToast("Error")
    }}
  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 shadow-lg rounded-lg overflow-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Physical Exam Sheet</h1>

      <form onSubmit={handleSubmit} className="space-y-8 text-gray-700">
        {/* PART A */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Part A: Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
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
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
            name="address"
            value={formData.address}
            onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
              name="city"
              value={formData.city}
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
               value={formData.state}
               onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zip Code</label>
              <input
               name="zipCode"
               value={formData.zipCode}
               onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Zip Code"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input
              name="dateOfBirth"
              value={ formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : ""}
              onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last 4 of SSN</label>
              <input
              name="ssnLast4"
              value={formData.ssnLast4}
              onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="XXXX"
              />
            </div>
            <div className="flex items-center">
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
            </div>
          </div>
        </section>

        {/* Medical Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical Information</h2>

          {["Significant Medical Problems", "Significant Surgeries", "Current Medications", "Drug Allergies"].map(
            (label) => (
              <div key={label} className="mb-6">
                <label className="block text-sm font-medium mb-2">{label}</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder={`List ${label.toLowerCase()} or none`}
                ></textarea>
              </div>
            )
          )}
        </section>
        <div className="grid grid-cols-2 justify-between">
        <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Part B */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Part B: Physical Exam</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["HEENT", "Neck", "Lungs", "Heart", "Abdomen", "Orthopedic", "Neurologic", "Skin"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">{field}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write Details Here"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Blood Work */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Blood Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "P4",
              "P3",
              "Help B surface Ab",
              "Other",
              "T-spot/QuantiFERON",
              "UDS",
              "No Physical Exam",
              "No blood work",
            ].map((field) => (
              <div key={field} className="flex items-center">
                <input type="checkbox" id={field} className="mr-2" />
                <label htmlFor={field} className="text-sm font-medium">{field}</label>
              </div>
            ))}
          </div>
        </section>

        {/* Final Notes */}
        <section>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Comments</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Clinician's comments"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Is the student healthy and fit for the program?</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="fit" value="Yes" className="mr-2" />
                Yes
              </label>
              <label>
                <input type="radio" name="fit" value="No" className="mr-2" />
                No
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Blood Pressure</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., 120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pulse</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., 72"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Vaccination History</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="List vaccinations and dates"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">PPD Information</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Details about PPD results, if applicable"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Clinician Signature</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Signature"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="mt-8 text-left">
          <button
            type="submit"
            className="bg-black text-white py-3 px-8 rounded-md text-lg  transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalExam;
