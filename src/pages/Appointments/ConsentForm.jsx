import React, { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack} from "react-icons/io"; 




const ConsentForm = () => {
  const navigate = useNavigate();
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);

  const handleCheckboxChange = (vaccination) => {
    setSelectedVaccinations((prev) =>
      prev.includes(vaccination)
        ? prev.filter((item) => item !== vaccination)
        : [...prev, vaccination]
    );
  };

  const vaccinations = [
    { name: "Hepatitis B Vaccination", pdfLink: "/path/to/hepatitis-b.pdf" },
    { name: "Rabies Vaccination", pdfLink: "/path/to/rabies.pdf" },
    { name: "MMR Vaccination", pdfLink: "/path/to/mmr.pdf" },
    { name: "Varicella Vaccination", pdfLink: "/path/to/varicella.pdf" },
    { name: "TDAP Vaccination", pdfLink: "/path/to/tdap.pdf" },
    { name: "FLU Vaccination", pdfLink: "/path/to/flu.pdf" },
  ];

  return (
    <div className="w-full p-6 bg-gray-100 h-auto overflow-auto mt-2">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-black flex items-center transition-colors"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h3 className="text-3xl font-semibold text-black ml-2">
          Mark Vaccination For Consent
        </h3>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        <h4 className="text-xl font-semibold text-gray-800">
          Vaccination Details:
        </h4>
        <p className="text-gray-700">
          Check the box(es) of the Vaccination(s) you are receiving today:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vaccinations.map((vaccine, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border p-4 rounded-lg bg-gray-50"
            >
              <input
                type="checkbox"
                id={`vaccine-${index}`}
                className="form-checkbox w-4 h-4 text-blue-500 mt-1"
                checked={selectedVaccinations.includes(vaccine.name)}
                onChange={() => handleCheckboxChange(vaccine.name)}
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  {/* <AiOutlineFilePdf className="text-3xl text-blue-500" /> */}
                  <h5 className="text-lg font-semibold text-gray-800">{vaccine.name}</h5>
                </div>
                <a
                  href={vaccine.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          The above PDFs are the vaccination information sheets for each of the
          vaccines. Please view the vaccine information for the vaccines you
          are about to receive.
        </p>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() =>
              alert(
                `Vaccinations selected: ${selectedVaccinations.join(", ")}`
              )
            }
            className="bg-black text-white px-4 py-2 rounded-md text-md font-semibold shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;
