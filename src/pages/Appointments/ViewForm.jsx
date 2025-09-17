import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation } from "react-router-dom";

const ViewForm = () => {
  const location = useLocation();
  const [reportData, setReportData] = useState(null);

  const getReportData = async () => {
    try {
      const response = await axios.get(
        `/admin/medical-form/${location?.state}`
      );
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
      <span className="font-medium capitalize">{label}</span>
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
  <Row
    label="Blood Pressure"
    value={`${Vitals?.systolic || "--"}/${Vitals?.diastolic || "--"}`}
  />
  <Row label="Pulse" value={Vitals?.pulse} />
</div>

      </section>

      {/* Vaccinations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Vaccinations</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
          {Vaccinations?.noVaccinations ? (
            <Row
              label="No Vaccinations"
              value={Vaccinations?.noVaccinations ? "Yes" : "Not Given"}
            />
          ) : (
            <Row
              label="Vaccination Given"
              value={Vaccinations?.givenToday?.join(", ")}
            />
          )}
        </div>
      </section>

      {/* Drug Screen */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Drug Screen</h2>

        {/* Agar NO Drug Screen true hai → message show karo */}
        {DrugScreen?.noDrugScreen ? (
          <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
            <p className="text-gray-500">Drug Screen not performed.</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
            {Object.entries(DrugScreen || {}).map(([key, value]) => {
              if (key === "noDrugScreen") return null; // skip flag

              if (typeof value === "object") {
                return (
                  <Row
                    key={key}
                    label={key}
                    value={`${value.status} (${value.drugName})`}
                  />
                );
              }

              return <Row key={key} label={key} value={value} />;
            })}
          </div>
        )}
      </section>

      {/* Physical Exam */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Physical Exam</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow space-y-1">
          {Object.entries(PhysicalExam || {})
            // skip nested objects, uds field & vaccine fields
            .filter(
              ([key, value]) =>
                typeof value !== "object" &&
                key !== "uds" &&
                ![
                  "hepatitisB",
                  "hepB",
                  "hxPPD",
                  "TD",
                  "influenza",
                  "MMR",
                  "Varicella",
                  "p3",
                  "p4",
                ].includes(key)
            )
            // move HEENT to top
            .sort(([aKey], [bKey]) =>
              aKey === "HEENT" ? -1 : bKey === "HEENT" ? 1 : 0
            )
            .map(([key, value]) => {
              let displayKey = key;
              if (key === "noBloodWork") displayKey = "Blood Work";
              if (key === "noPhysicalExam") displayKey = "Physical Exam";
              if (key === "ppdDone") displayKey = "PPD";
              if (key === "clinicianSign") displayKey = "clinician Signature";
              if (key === "ppdReadDate") displayKey = "PPD Read Date";
              if (key === "ppdPerformedDate") displayKey = "PPD PerformedDate";
              if (key === "ppdInduration") displayKey = "PPD Induration";
              if (key === "ppdInterpretation") displayKey = "PPD Interpretation";
              if (key === "clinicianSignDate")
                displayKey = "clinician Signature Date";

              let displayValue = value;
              if (typeof value === "boolean") {
                displayValue = value ? "Performed" : "Not Performed";
              }
              return <Row key={key} label={displayKey} value={displayValue} />;
            })}
        </div>
      </section>
    </div>
  );
};

export default ViewForm;
