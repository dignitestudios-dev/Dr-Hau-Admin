import React, { useState, useRef } from "react";
import { FaFileUpload } from "react-icons/fa"; 
import { ErrorToast, SuccessToast } from "../Global/Toaster";
import axios from "../../axios";

const UploadPdfModal = ({ isOpen, onClose, id, report, onUpload }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const controllerRef = useRef(null);
  const currentDate = new Date().toISOString();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file || null);
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    setSubmitLoading(false);
    setSelectedPdf(null);
    onClose();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedPdf) {
      ErrorToast("Report cannot be empty. Please select a PDF file.");
      return;
    }

    if (
      selectedPdf.type !== "application/pdf" &&
      !selectedPdf.name.toLowerCase().endsWith(".pdf")
    ) {
      ErrorToast("Please select a valid PDF file.");
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setSubmitLoading(true);

      const data = new FormData();
      data.append("appointment", id);

      const reportId =
        report?._id ||
        report?.id ||
        (typeof report === "string" ? report : null);

      if (reportId) {
        data.append("reportId", reportId);
      }
      data.append("currentDate", currentDate);
      data.append("documents", selectedPdf);

      const url = reportId ? "/admin/updateReport" : "/admin/report";
      const response = await axios.post(url, data, {
        signal: controller.signal,
        timeout: 60000,
      });

      if (response?.status === 200 || response?.status === 201) {
        SuccessToast("Report Submitted successfully");
        if (typeof onUpload === "function") {
          onUpload(selectedPdf);
        }
        setSelectedPdf(null);
        onClose();
      } else {
        ErrorToast(response?.data?.message || "Failed to upload report");
      }
    } catch (error) {
      if (
        axios.isCancel?.(error) ||
        error?.name === "CanceledError" ||
        error?.name === "AbortError" ||
        error?.code === "ERR_CANCELED"
      ) {
        console.log("Upload cancelled");
      } else {
        console.error("Error:", error);
        ErrorToast(error?.response?.data?.message || "Failed to upload report");
      }
    } finally {
      setSubmitLoading(false);
      controllerRef.current = null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 md:w-1/3 max-w-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <FaFileUpload size={40} className="text-black" />
            </div>

            <div className="flex flex-col items-center mb-6">
              <label className="text-gray-700 mb-4 font-medium">Upload a PDF file:</label>
              <div className="relative w-full flex justify-center">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  id="file-upload"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={submitLoading}
                />
                <label
                  htmlFor="file-upload"
                  className={`px-6 py-2 ${
                    submitLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 cursor-pointer"
                  } text-white rounded-md text-center transition duration-300 mt-4 inline-block`}
                >
                  <FaFileUpload className="inline mr-2 mb-1" /> Choose File
                </label>
              </div>
              {selectedPdf && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  Selected file: <span className="font-semibold">{selectedPdf.name}</span>
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-md w-full hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={submitLoading}
                className="px-6 py-2 bg-black text-white rounded-md w-full hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
              >
                {submitLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPdfModal;
