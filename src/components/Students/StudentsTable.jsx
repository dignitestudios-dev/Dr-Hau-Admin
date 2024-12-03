import React, { useState } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const StudentsTable = () => {
  // Sample data with campus field for filtering and rendering
  const initialData = [
    { name: "Olivia Mery", dob: "11-25-1996", program: "Bachelor of Arts", school: "Harvard", campus: "Harvard Yard" },
    { name: "James Smith", dob: "06-01-1994", program: "Bachelor of Science", school: "MIT", campus: "Main Campus" },
    { name: "Olivia Mery", dob: "07-19-1996", program: "Bachelor of Science", school: "Harvard", campus: "Harvard Yard" },
    { name: "Rose Sophia", dob: "08-02-1993", program: "Bachelor of Arts", school: "Stanford", campus: "Main Quad" },
    { name: "David Laid", dob: "09-01-1995", program: "Bachelor of Business", school: "MIT", campus: "Main Campus" },
    { name: "James Smith", dob: "03-29-1997", program: "Bachelor of Fine Arts", school: "Harvard", campus: "Harvard Yard" },
    { name: "Olivia Mery", dob: "08-11-1999", program: "Bachelor of Business", school: "Stanford", campus: "Main Quad" },
    { name: "Rose Sophia", dob: "12-01-1993", program: "Bachelor of Fine Arts", school: "MIT", campus: "Main Campus" },
    { name: "David Laid", dob: "10-25-1996", program: "Bachelor of Arts", school: "Stanford", campus: "Main Quad" },
    { name: "James Smith", dob: "05-10-1998", program: "Bachelor of Fine Arts", school: "Harvard", campus: "Harvard Yard" },
    { name: "Olivia Mery", dob: "01-19-1998", program: "Bachelor of Science", school: "MIT", campus: "Main Campus" },
  ];

  const [Students, setStudents] = useState(initialData); // Student data state
  const [selectedSchool, setSelectedSchool] = useState(""); // Selected school for filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state
  const [studentToDelete, setStudentToDelete] = useState(null); // Student to delete
  const navigate = useNavigate();

  // Handle filter change
  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle delete action
  const handleDelete = () => {
    if (studentToDelete !== null) {
      const updatedStudents = Students.filter((_, i) => i !== studentToDelete);
      setStudents(updatedStudents);
    }
    setShowDeleteModal(false); // Close modal after deletion
  };

  // Handle show delete modal
  const openDeleteModal = (index) => {
    setStudentToDelete(index);
    setShowDeleteModal(true);
  };

  // Handle cancel delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  // Handle view student profile
  const handleViewProfile = (student) => {
    navigate(`/student-profile`, { state: { student } });
  };

  // Filter Students by selected school and search query
  const filteredStudents = Students.filter((student) => {
    const matchesSchool = selectedSchool ? student.school === selectedSchool : true;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesSearch;
  });

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Students</h3>
        </div>
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md bg-white text-gray-700"
          />
          {/* Dropdown to filter by school */}
          <select
            value={selectedSchool}
            onChange={handleSchoolFilter}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">Select School</option>
            <option value="Harvard">Harvard</option>
            <option value="MIT">MIT</option>
            <option value="Stanford">Stanford</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">SCHOOL</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={student.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{student.name}</span>
                </td>
                <td className="py-3 px-4">{student.dob}</td>
                <td className="py-3 px-4">{student.school}</td>
                <td className="py-3 px-4">{student.campus}</td>
                <td className="py-3 px-4">{student.program}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(student)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                    <IoMdEye size={20} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Student"
                  >
                    <IoMdTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this student?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
