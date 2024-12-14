import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileUpload, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import axios from '../../axios';
import CdcUploadModal from "../../components/Cdcsheets/CdcUploadModal";
import CdcDeleteModal from "../../components/Cdcsheets/CdcDeleteModal"; 

const CdcSheets = () => {
  const [cdcSheets, setCdcSheets] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pdfToDelete, setPdfToDelete] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const navigate = useNavigate();

  // Fetch CDC sheets data from API
  useEffect(() => {
    const fetchCdcSheets = async () => {
      setLoading(true);  // Set loading to true when fetching starts
      try {
        const response = await axios.get("/cdc/");
        if (response.data.success) {
          setCdcSheets(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching CDC sheets:", error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched (success or error)
      }
    };

    fetchCdcSheets();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleOpenDeleteModal = (pdf) => {
    setPdfToDelete(pdf); // Pass the full PDF object to the modal
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPdfToDelete(null);
  };

  // Function to handle PDF deletion
  const handleDeletePdf = async (pdfId) => {
    try {
      const response = await axios.post(`/cdc/${pdfId}`);
      if (response.data.success) {
        // Remove PDF from local state after successful deletion
        const updatedData = cdcSheets.filter((item) => item._id !== pdfId);
        setCdcSheets(updatedData);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
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
            {loading ? (  // Conditionally render based on loading state
              <div className="flex justify-center items-center py-6">
              <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            ) : cdcSheets.length > 0 ? (
              cdcSheets.map((sheet) => (
                <div
                  key={sheet._id}
                  className="relative p-4 bg-white border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <FaFilePdf className="text-5xl text-red-600 mr-4" />
                      <div>
                        <h4 className="text-xl text-black font-semibold">{sheet.name} vaccination</h4>
                        <a
                          href={sheet.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-md"
                        >
                          View PDF
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenDeleteModal(sheet)}
                    className="absolute top-2 right-1 text-red-600 hover:text-red-800 text-xl"
                  >
                    <MdOutlineDelete className="inline mb-1 mr-2" />
                  </button>
                </div>
              ))
            ) : (
              <p>No CDC sheets found.</p>
            )}
          </div>
        </div>

        <CdcUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} />
        <CdcDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeletePdf}
          pdfName={pdfToDelete?.name}
          pdfId={pdfToDelete?._id} // Pass the pdfId to the modal
        />
      </div>
    </>
  );
};

export default CdcSheets;
