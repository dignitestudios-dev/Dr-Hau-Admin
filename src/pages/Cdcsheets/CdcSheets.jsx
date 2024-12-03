import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileUpload, FaTrashAlt } from "react-icons/fa"; // Importing necessary icons
import { MdOutlineDelete } from "react-icons/md";

import CdcUploadModal from "../../components/Cdcsheets/CdcUploadModal";
import CdcDeleteModal from "../../components/Cdcsheets/CdcDeleteModal"; // Import Delete Modal

const CdcSheets = () => {
  const data = [
    {
      vaccination: "Hepatitis B vaccination",
      pdf: "/path/to/pdf1.pdf",
    },
    {
      vaccination: "Rabies vaccination",
      pdf: "/path/to/pdf2.pdf",
    },
    {
      vaccination: "MMR vaccination",
      pdf: "/path/to/pdf3.pdf",
    },
    {
      vaccination: "Hepatitis B vaccination",
      pdf: "/path/to/pdf4.pdf",
    },
    {
      vaccination: "Flu vaccination",
      pdf: "/path/to/pdf5.pdf",
    },
    {
      vaccination: "Hepatitis B vaccination",
      pdf: "/path/to/pdf6.pdf",
    },
    {
      vaccination: "Flu vaccination",
      pdf: "/path/to/pdf7.pdf",
    },
  ];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State to control modal visibility for upload
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control modal visibility for delete
  const [pdfToDelete, setPdfToDelete] = useState(null); // PDF to be deleted
  const navigate = useNavigate();

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleOpenDeleteModal = (pdf) => {
    setPdfToDelete(pdf);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPdfToDelete(null);
  };

  const handleDeletePdf = (pdfName) => {
    // Remove PDF from data array (simulating deletion)
    const updatedData = data.filter((item) => item.pdf !== pdfName);
    console.log("Deleted PDF:", pdfName);
    // Update the state (ideally should update from a server or database)
    // setData(updatedData); 
    handleCloseDeleteModal();
  };

  return (
    <>
      <div className="w-full p-6 rounded-md overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[24px] font-bold text-black">CDC Sheets</h3>
          <button
            onClick={handleOpenUploadModal}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            <FaFileUpload className="inline mb-1" /> Upload
          </button>
        </div>

        <div className="w-full h-auto bg-white p-6 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((appointment, index) => (
              <div
                key={index}
                className="relative p-4 bg-white border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Content of the card */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <FaFilePdf className="text-5xl text-red-600 mr-4" />
                    <div>
                      <h4 className="text-xl text-black font-semibold">{appointment.vaccination}</h4>
                      <a
                        href={appointment.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-md"
                      >
                        View PDF
                      </a>
                    </div>
                  </div>
                </div>

                {/* Trash Icon positioned at the top-right with increased size and spacing */}
                <button
                  onClick={() => handleOpenDeleteModal(appointment.pdf)}
                  className="absolute top-2 right-1 text-red-600 hover:text-red-800 text-xl"
                >
                  <MdOutlineDelete className="inline mb-1 mr-2" /> {/* Larger trash icon */}
                </button>
              </div>
            ))}
          </div>
        </div>

        <CdcUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} />
        <CdcDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeletePdf}
          pdfName={pdfToDelete?.split("/").pop()}
        />
      </div>
    </>
  );
};

export default CdcSheets;
