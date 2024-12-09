import React, { useState } from "react";
import ProfileCompleteModal from "../../components/onboarding/ProfileCompleteModal";

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    programDepartment: "",
    adminName: "",
    campus: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-6">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 hidden lg:block">
        <h1 className="text-xl sm:text-3xl font-bold">Logo</h1> 
      </div>
      <div className="bg-white w-full h-auto sm:h-auto max-w-4xl sm:mt-8 mt-6 p-4 lg:p-10 sm:p-6 rounded-lg shadow-lg lg:ml-28 lg:h-[600px]">
        <div className="lg:flex lg:items-center lg:justify-start mb-4 sm:mb-6">
          <h1 className="lg:text-[28px] sm:text-xl font-bold lg:mr-6">Profile Setup</h1> 
        </div>

        <div className="lg:flex lg:items-center lg:justify-start mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <button className="text-black font-bold underline">Upload Photo</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData?.schoolName}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="School Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Administrator Name</label>
              <input
                type="text"
                name="adminName"
                value={formData?.adminName}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Administrator Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Program Department</label>
              <input
                type="text"
                name="programDepartment"
                value={formData?.programDepartment}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Program Department"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Campus</label>
              <input
                type="text"
                name="campus"
                value={formData?.campus}
                onChange={handleInputChange}
                className="border border-black p-3 rounded-md"
                placeholder="Campus"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:justify-start mb-6">
            <button
              type="submit"
              className="bg-black w-full sm:w-[150px] text-white py-2 px-6 rounded-lg"
            >
              Save
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

export default ProfileSetup;
