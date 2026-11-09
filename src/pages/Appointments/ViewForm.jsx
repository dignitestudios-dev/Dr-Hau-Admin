import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Global/Loader";
import { IoMdArrowBack } from "react-icons/io";

const ViewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract appointmentId safely whether passed as an object or raw string
  const appointmentId =
    typeof location?.state === "string"
      ? location.state
      : location?.state?.appointmentId || location?.state?.id;

  useEffect(() => {
    const getReportData = async () => {
      if (!appointmentId) {
        setError("No appointment specified.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/admin/medical-form/${appointmentId}`);
        if (response?.data?.success && response?.data?.data) {
          setReportData(response.data.data);
        } else if (response?.data?.data) {
          setReportData(response.data.data);
        } else {
          setError("No medical report data found for this appointment.");
        }
      } catch (err) {
        console.error("Error fetching medical report:", err);
        setError(
          err?.response?.data?.message ||
            "Error loading medical report. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getReportData();
  }, [appointmentId]);

  if (loading) {
    return <Spinner text="Loading medical report..." />;
  }

  if (error || !reportData) {
    return (
      <div className="bg-white text-black w-full min-h-screen p-8">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-black hover:text-gray-800 flex items-center mr-3 text-2xl"
          >
            <IoMdArrowBack />
          </button>
          <h1 className="text-2xl font-bold">Medical Report</h1>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center max-w-xl mx-auto mt-12">
          <p className="text-gray-600 mb-4 text-base">
            {error || "No medical report data available for this appointment."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    Vitals,
    Vaccinations,
    ["Drug Screen"]: DrugScreen,
    ["Physical Exam"]: PhysicalExam,
  } = reportData;

  // Helper for row
  const Row = ({ label, value }) => (
    <div className="flex justify-between border-b py-2 text-sm">
      <span className="font-medium text-gray-700 capitalize">{label}</span>
      <span className="text-gray-900 font-semibold">{value?.toString() || "-"}</span>
    </div>
  );

  return (
    <div className="bg-white text-black w-full min-h-screen p-8 overflow-y-auto">
      <div className="flex items-center mb-6 border-b pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-black hover:text-gray-800 flex items-center mr-3 text-2xl"
        >
          <IoMdArrowBack />
        </button>
        <h1 className="text-2xl font-bold">Medical Report Details</h1>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Vitals */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Vitals</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <Row
              label="Blood Pressure"
              value={
                Vitals?.systolic && Vitals?.diastolic
                  ? `${Vitals.systolic}/${Vitals.diastolic} mmHg`
                  : "--"
              }
            />
            <Row
              label="Pulse"
              value={Vitals?.pulse ? `${Vitals.pulse} bpm` : "--"}
            />
          </div>
        </section>

        {/* Vaccinations */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Vaccinations</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 space-y-1">
            {Vaccinations?.noVaccinations ? (
              <Row label="No Vaccinations Given" value="Yes" />
            ) : (
              <>
                <Row
                  label="Vaccinations Administered"
                  value={
                    Vaccinations?.givenToday && Vaccinations.givenToday.length > 0
                      ? Vaccinations.givenToday.join(", ")
                      : "None"
                  }
                />
                {Vaccinations?.ppdPerformed && (
                  <>
                    <Row label="PPD Performed" value="Yes" />
                    <Row label="PPD Read On" value={Vaccinations?.ppdReadOn ? new Date(Vaccinations.ppdReadOn).toLocaleDateString() : "-"} />
                    <Row label="PPD Induration" value={Vaccinations?.ppdInduration ? `${Vaccinations.ppdInduration} mm` : "-"} />
                    <Row label="PPD Interpretation" value={Vaccinations?.ppdInterpretation || "-"} />
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* Drug Screen */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Drug Screen</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 space-y-1">
            {DrugScreen?.noDrugScreen ? (
              <p className="text-gray-500 text-sm">Drug screen not performed.</p>
            ) : DrugScreen && typeof DrugScreen === "object" ? (
              Object.entries(DrugScreen).map(([key, value]) => {
                if (key === "noDrugScreen") return null;
                if (typeof value === "object" && value !== null) {
                  return (
                    <Row
                      key={key}
                      label={key}
                      value={`${value.status || "Not Performed"} ${value.drugName ? `(${value.drugName})` : ""}`}
                    />
                  );
                }
                return <Row key={key} label={key} value={value} />;
              })
            ) : (
              <p className="text-gray-500 text-sm">No drug screen records available.</p>
            )}
          </div>
        </section>

        {/* Physical Exam */}
        {PhysicalExam && (
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Physical Exam</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 space-y-1">
              {PhysicalExam.noPhysicalExam ? (
                <p className="text-gray-500 text-sm">Physical exam not performed.</p>
              ) : (
                Object.entries(PhysicalExam).map(([key, value]) => {
                  if (key === "noPhysicalExam" || key === "_id") return null;
                  if (typeof value === "boolean") {
                    return <Row key={key} label={key} value={value ? "Yes" : "No"} />;
                  }
                  if (typeof value === "string" && value.trim()) {
                    return <Row key={key} label={key} value={value} />;
                  }
                  return null;
                })
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ViewForm;
