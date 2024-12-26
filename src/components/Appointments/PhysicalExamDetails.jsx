import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const PhysicalExamDetails = () => {
  const { id } = useParams(); // Get the ID from the URL (Physical Exam ID)
  const [physicalExam, setPhysicalExam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the physical exam details based on the ID
  useEffect(() => {
    const fetchPhysicalExamDetails = async () => {
      try {
        const response = await axios.get(`/admin/physicalReports/${id}`); // Use the ID directly in the URL
        const data = response?.data;

        if (data?.success && data.data) {
          setPhysicalExam(data.data);
        } else {
          setPhysicalExam(null); // No physical exam data
        }
      } catch (error) {
        console.error("Error fetching physical exam details:", error);
        setPhysicalExam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhysicalExamDetails();
  }, [id]); // Re-run the effect if the ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!physicalExam) {
    return <div>No physical exam details available.</div>;
  }

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <h4 className="text-[22px] font-bold text-black mb-4">
        Physical Exam Report for {physicalExam.firstName}{" "}
        {physicalExam.lastName}
      </h4>

      <div className="bg-white shadow-md rounded-md p-6">
        {/* <h4 className="text-[22px] font-bold text-black mb-4">
          Physical Exam Report for {physicalExam.firstName} {physicalExam.lastName}
        </h4> */}

        {/* Personal and Medical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <strong className="text-black text-lg">Personal Information</strong>
            <ul className="text-black mt-2">
              <li>
                <strong>Full Name:</strong> {physicalExam.firstName}{" "}
                {physicalExam.lastName}
              </li>
              <li>
                <strong>Gender:</strong> {physicalExam.gender}
              </li>
              <li>
                <strong>DOB:</strong>{" "}
                {new Date(physicalExam.dob).toLocaleDateString()}
              </li>
              <li>
                <strong>Address:</strong> {physicalExam.address}
              </li>
              <li>
                <strong>City:</strong> {physicalExam.city}
              </li>
              <li>
                <strong>State:</strong> {physicalExam.state}
              </li>
              <li>
                <strong>Email:</strong> {physicalExam.email}
              </li>
              <li>
                <strong>Zip Code:</strong> {physicalExam.zipcode}
              </li>
              <li>
                <strong>Phone No:</strong> {physicalExam.phoneNo}
              </li>
              <li>
                <strong>School Program:</strong> {physicalExam.schoolProgram}
              </li>
              <li>
                <strong>School City:</strong> {physicalExam.schoolCity}
              </li>
            </ul>
          </div>

          <div>
            <strong className="text-black text-lg">Medical Information</strong>
            <ul className="text-black mt-2">
              <li>
                <strong>Medical Problems:</strong>{" "}
                {physicalExam.medicalProblems}
              </li>
              <li>
                <strong>Surgeries:</strong> {physicalExam.surgeries}
              </li>
              <li>
                <strong>Medications:</strong> {physicalExam.medications}
              </li>
              <li>
                <strong>Allergies:</strong> {physicalExam.allergies}
              </li>
              <li>
                <strong>is Pregnant:</strong>{" "}
                {physicalExam.isPregnant ? "Yes" : "No"}
              </li>
              <li>
                <strong>is TB:</strong> {physicalExam.isTB ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Exercise:</strong>{" "}
                {physicalExam.isExercise ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Healthy:</strong>{" "}
                {physicalExam.isHealthy ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Tobacco:</strong>{" "}
                {physicalExam.isTobacco ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Alcoholic:</strong>{" "}
                {physicalExam.isAlcoholic ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Bending:</strong>{" "}
                {physicalExam.isBending ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Lifting:</strong>{" "}
                {physicalExam.isLifting ? "Yes" : "No"}
              </li>
              <li>
                <strong>is MovingHands:</strong>{" "}
                {physicalExam.isMovingHands ? "Yes" : "No"}
              </li>
              <li>
                <strong>is VisionOrHearing:</strong>{" "}
                {physicalExam.isVisionOrHearing ? "Yes" : "No"}
              </li>
              <li>
                <strong>is Walking:</strong>{" "}
                {physicalExam.isWalking ? "Yes" : "No"}
              </li>
            </ul>
          </div>
          <div>
            <strong className="text-black text-lg">Blood Work</strong>
            <ul className="text-black mt-2">
              <li>
                <strong>HEENT:</strong> {physicalExam.heent}
              </li>
              <li>
                <strong>Neck:</strong> {physicalExam.neck}
              </li>
              <li>
                <strong>Lungs:</strong> {physicalExam.lungs}
              </li>
              <li>
                <strong>Heart:</strong> {physicalExam.heart}
              </li>
              <li>
                <strong>Abdomen:</strong> {physicalExam.abdomen}
              </li>
              <li>
                <strong>Orthopedic:</strong> {physicalExam.orthopedic}
              </li>
              <li>
                <strong>Neurologic:</strong> {physicalExam.neurologic}
              </li>
              <li>
                <strong>Skin:</strong> {physicalExam.skin}
              </li>
              <li>
                <strong>Comments:</strong> {physicalExam.comments}
              </li>

              <li>
                <strong>P4:</strong> {physicalExam.p4 ? "Yes" : "No"}
              </li>
              <li>
                <strong>P3:</strong> {physicalExam.p3 ? "Yes" : "No"}
              </li>
              <li>
                <strong>Hep B:</strong> {physicalExam.hepB ? "Yes" : "No"}
              </li>
              <li>
                <strong>Other:</strong> {physicalExam.other}
              </li>
              <li>
                <strong>Tspot:</strong> {physicalExam.tspot ? "Yes" : "No"}
              </li>
              <li>
                <strong>UDS:</strong> {physicalExam.uds ? "Yes" : "No"}
              </li>
              <li>
                <strong>No Physical Exam:</strong>{" "}
                {physicalExam.noPhysicalExam ? "Yes" : "No"}
              </li>
              <li>
                <strong>No Blood Work:</strong>{" "}
                {physicalExam.noBloodWork ? "Yes" : "No"}
              </li>

              <li>
                <strong>Blood Pressure Down:</strong>{" "}
                {physicalExam.bloodPressureDown}
              </li>
              <li>
                <strong>Blood Pressure Up:</strong>{" "}
                {physicalExam.bloodPressureUp}
              </li>
              <li>
                <strong>Pulse:</strong> {physicalExam.pulse}
              </li>
              <li>
                <strong>Hepatitis B:</strong>{" "}
                {physicalExam.hepatitisB ? "Yes" : "No"}
              </li>
              <li>
                <strong>Hepatitis B Prior:</strong>{" "}
                {physicalExam.hepatitisBPrior}
              </li>
              <li>
                <strong>TD:</strong> {physicalExam.TD ? "Yes" : "No"}
              </li>
              <li>
                <strong>TD Prior:</strong> {physicalExam.TDPrior}
              </li>
              <li>
                <strong>Influenza:</strong>{" "}
                {physicalExam.influenza ? "Yes" : "No"}
              </li>
              <li>
                <strong>MMR:</strong> {physicalExam.MMR ? "Yes" : "No"}
              </li>
              <li>
                <strong>MMR Prior:</strong> {physicalExam.MMRPrior}
              </li>
              <li>
                <strong>Varicella:</strong>{" "}
                {physicalExam.Varicella ? "Yes" : "No"}
              </li>
              <li>
                <strong>Varicella Prior:</strong> {physicalExam.VaricellaPrior}
              </li>
              <li>
                <strong>PPD Done:</strong> {physicalExam.ppdDone ? "Yes" : "No"}
              </li>
              <li>
                <strong>PPD Not Done Reason:</strong>{" "}
                {physicalExam.ppdNotDoneReason}
              </li>
              <li>
                <strong>Hx PPD:</strong> {physicalExam.hxPPD ? "Yes" : "No"}
              </li>
              <li>
                <strong>Negative PPD:</strong>{" "}
                {physicalExam.negativePPD ? "Yes" : "No"}
              </li>
              <li>
                <strong>Is Student Healthy:</strong>{" "}
                {physicalExam.isStudentHealthy ? "Yes" : "No"}
              </li>
              <li>
                <strong>Is Normal Exam:</strong>{" "}
                {physicalExam.isNormalExam ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          {/* <div>
            <strong className="text-black text-lg">Additional Findings</strong>
            <ul className="text-black mt-2">
             
            </ul>
          </div>     */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <strong className="text-black text-lg">Vital Signs</strong>
            <ul className="text-black mt-2">
              <li>
                <strong>Student Sign:</strong>{" "}
                {physicalExam.studentSign ? "Yes" : "No"}
              </li>
              <li>
                <strong>Student Sign Date: </strong>
                {physicalExam.studentSignDate
                  ? new Date(physicalExam.studentSignDate).toLocaleDateString()
                  : "N/A"}
              </li>
              <li>
                <strong>Clinician Sign:</strong>{" "}
                {physicalExam.clinicianSign ? "Yes" : "No"}
              </li>
              <li>
                <strong>Clinician Sign Date: </strong>
                {physicalExam.clinicianSignDate
                  ? new Date(
                      physicalExam.clinicianSignDate
                    ).toLocaleDateString()
                  : "N/A"}
              </li>
            </ul>
          </div>
        </div>
        </div>

        {/* Additional Findings */}
        
      </div>
    </div>
  );
};

export default PhysicalExamDetails;
