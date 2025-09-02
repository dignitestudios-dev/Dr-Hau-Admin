import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation } from "react-router-dom";

const ViewForm = () => {
  const location = useLocation();
  const [reportData, setReportData] = useState(null);

  const getReportData = async () => {
    try {
      const response = await axios.get(`/admin/medical-form/${location?.state}`);
      if (response.status === 200) {
        setReportData(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  if (!reportData) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  const {
    Vitals,
    Vaccinations,
    ["Drug Screen"]: DrugScreen,
    ["Physical Exam"]: PhysicalExam,
  } = reportData;

  // Helper for row
  const Row = ({ label, value }) => (
    <div className="flex justify-between border-b py-1">
      <span className="font-medium">{label}</span>
      <span>{value?.toString() || "-"}</span>
    </div>
  );

  return (
    <div className="bg-white text-black w-full min-h-screen p-8 overflow-scroll">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">Medical Report</h1>

      {/* Vitals */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Vitals</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <Row label="Systolic" value={Vitals?.systolic} />
          <Row label="Diastolic" value={Vitals?.diastolic} />
          <Row label="Pulse" value={Vitals?.pulse} />
        </div>
      </section>

      {/* Vaccinations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Vaccinations</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
          <Row label="No Vaccinations" value={Vaccinations?.noVaccinations ? "Yes" : "No"} />
          <Row label="Given Today" value={Vaccinations?.givenToday?.join(", ")} />
          <Row label="PPD Performed" value={Vaccinations?.ppdPerformed ? "Yes" : "No"} />
          <Row label="PPD Read On" value={Vaccinations?.ppdReadOn} />
          <Row label="PPD Induration" value={Vaccinations?.ppdInduration} />
          <Row label="PPD Interpretation" value={Vaccinations?.ppdInterpretation} />
        </div>
      </section>

      {/* Drug Screen */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Drug Screen</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
          {Object.entries(DrugScreen || {}).map(([key, value]) =>
            typeof value === "object" ? (
              <Row key={key} label={key} value={`${value.status} (${value.drugName})`} />
            ) : (
              <Row key={key} label={key} value={value} />
            )
          )}
        </div>
      </section>

      {/* Physical Exam */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Physical Exam</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
          {Object.entries(PhysicalExam || {}).map(([key, value]) => {
            if (typeof value === "object") return null; // nested objects skip
            return <Row key={key} label={key} value={value} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default ViewForm;
