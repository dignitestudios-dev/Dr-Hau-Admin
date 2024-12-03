import React from "react";

const UserMedicalDetails = () => {
  const formData = {
    medicalProblems: "High blood pressure, Asthma",
    surgeries: "Appendectomy in 2015",
    medications: "None",
    drugAllergies: "Penicillin",
    pregnant: "No",
    positiveTBTest: "No",
    exerciseRegularly: "Yes",
    eatHealthy: "Yes",
    habits: {
      tobacco: "No",
      alcohol: "Yes",
    },
    limitations: {
      bending: "No",
      lifting: "Yes",
      movingHands: "No",
      visionOrHearing: "Yes",
    },
  };

  return (
    <div className="w-full h-auto bg-gray-100 p-10 overflow-auto">
      <h2 className="text-4xl font-semibold text-left mb-8 text-gray-800">Medical Details</h2>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        {/* Medical Problems */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <label className="block text-xl font-medium text-gray-700 mb-2">Significant Medical Problems</label>
          <p className="text-lg text-gray-600">{formData.medicalProblems}</p>
        </div>

        {/* Surgeries */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <label className="block text-xl font-medium text-gray-700 mb-2">Significant Surgeries</label>
          <p className="text-lg text-gray-600">{formData.surgeries}</p>
        </div>

        {/* Medications */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <label className="block text-xl font-medium text-gray-700 mb-2">Medications</label>
          <p className="text-lg text-gray-600">{formData.medications}</p>
        </div>

        {/* Drug Allergies */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <label className="block text-xl font-medium text-gray-700 mb-2">Drug Allergies</label>
          <p className="text-lg text-gray-600">{formData.drugAllergies}</p>
        </div>

        {/* Yes/No Questions */}
        {[
          { label: "Are you possibly pregnant?", field: "pregnant" },
          { label: "Have you ever had a positive TB test?", field: "positiveTBTest" },
          { label: "Do you exercise regularly?", field: "exerciseRegularly" },
          { label: "Do you eat healthy?", field: "eatHealthy" },
        ].map((item) => (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm" key={item.field}>
            <label className="block text-xl font-medium text-gray-700 mb-2">{item.label}</label>
            <p className="text-lg text-gray-600">{formData[item.field]}</p>
          </div>
        ))}

        {/* Habits */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-2xl text-gray-800 mb-4">Habits</h3>
          {[
            { label: "Tobacco?", field: "tobacco" },
            { label: "Extensive Alcohol?", field: "alcohol" },
          ].map((habit) => (
            <div className="mb-4" key={habit.field}>
              <label className="block text-xl font-medium text-gray-700">{habit.label}</label>
              <p className="text-lg text-gray-600">{formData.habits[habit.field]}</p>
            </div>
          ))}
        </div>

        {/* Limitations */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-2xl text-gray-800 mb-4">Limitations to Walking/Standing</h3>
          {[
            { label: "To bending?", field: "bending" },
            { label: "To lifting?", field: "lifting" },
            { label: "To moving hands/fingers?", field: "movingHands" },
            { label: "Vision or hearing difficulties?", field: "visionOrHearing" },
          ].map((limitation) => (
            <div className="mb-4" key={limitation.field}>
              <label className="block text-xl font-medium text-gray-700">{limitation.label}</label>
              <p className="text-lg text-gray-600">{formData.limitations[limitation.field]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMedicalDetails;
