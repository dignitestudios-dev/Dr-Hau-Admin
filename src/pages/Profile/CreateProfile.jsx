import React, { useState } from "react";
import ProfileCompleteModal from "../../components/onboarding/ProfileCompleteModal";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    programDepartment: "",
    adminName: "",
    username: "",
    password: "",
    campus: "",
    campusEmail: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sending credentials to campus email:", formData.campusEmail);

    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center">
        <h3 className="text-[24px] font-bold text-black mb-4">Create Profile</h3>
      </div>

      <div className="bg-white w-full h-auto sm:h-auto mb-8 p-4 lg:p-10 sm:p-6 rounded-lg shadow-lg  lg:h-[550px] text-black">
        <form onSubmit={handleSubmit}>
        <h3 className="text-[24px]  text-black">Fill the details below to create admin profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:mt-8 md:mt-4">
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Username"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="School Name"
                required
              />
            </div>

            {/* Program Department */}
            {/* <div className="flex flex-col">
              <label className="mb-2 font-medium">Program Department</label>
              <input
                type="text"
                name="programDepartment"
                value={formData.programDepartment}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Program Department"
                required
              />
            </div> */}

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Campus</label>
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Campus"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Campus Email</label>
              <input
                type="email"
                name="campusEmail"
                value={formData.campusEmail}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Campus Email"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:justify-start mb-6">
            <button
              type="submit"
              className="bg-black w-full sm:w-[150px] text-white py-2 px-6 rounded-lg"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      <ProfileCompleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default CreateProfile;
