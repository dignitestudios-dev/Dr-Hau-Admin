import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardAppointmentsTable = () => {
  const data = [
    { name: "Olivia Mery", dob: "11-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Scheduled" },
    { name: "James Smith", dob: "06-01-1994", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
    { name: "Olivia Mery", dob: "07-19-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
    { name: "Rose Sophia", dob: "08-02-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Not Confirmed" },
    { name: "David Laid", dob: "09-01-1995", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", status: "Not Confirmed" },
    { name: "James Smith", dob: "03-29-1997", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Scheduled" },
    { name: "Olivia Mery", dob: "08-11-1999", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", status: "Scheduled" },
    { name: "Rose Sophia", dob: "12-01-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Scheduled" },
    { name: "David Laid", dob: "10-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Scheduled" },
    { name: "James Smith", dob: "05-10-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Not Confirmed" },
    { name: "Olivia Mery", dob: "01-19-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
  ];

  const navigate = useNavigate(); 

  return (
    <div className="w-full h-auto bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[24px] font-bold text-black">Appointment List</h3>
        <p onClick={() => navigate("/appointments")} className="text-blue-500 text-sm underline cursor-pointer">See all</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appointment, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-[#E5E7EB]">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    onClick={() => navigate("/student-profile")}
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={appointment.name}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <span>{appointment.name}</span>
                </td>
                <td className="py-3 px-4">{appointment.dob}</td>
                <td className="py-3 px-4">{appointment.address}</td>
                <td className="py-3 px-4">{appointment.program}</td>
                <td className={`py-3 px-4 ${appointment.status === 'Scheduled' ? 'text-blue-500' : 'text-red-500'}`}>
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAppointmentsTable;
