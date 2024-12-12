import Home from "../pages/Dashboard/Home";
import GlobalLayout from "../layouts/GlobalLayout";
import Appointments from "../pages/Appointments/Appointments";
import Events from "../pages/Events/Events";
import StudentProfile from "../pages/Student/StudentProfile";
import EventDetails from "../pages/Events/EventDetails";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notifications/Notifications";
import PrivacyPolicy from "../pages/Privacypolicy/PrivacyPolicy";
import TermsOfService from "../pages/Termsandconditions/TermsOfService";
import EditProfile from "../pages/Profile/EditProfile";
import Splash from "../pages/onboarding/Splash";
import ProfileSetup from "../pages/onboarding/ProfileSetup";
import Users from "../pages/Users/Users";
import Students from "../pages/Student/Students";
import Admins from "../pages/Admins/Admins";
import CreateEvent from "../pages/Events/CreateEvent";
import CreateProfile from "../pages/Profile/CreateProfile";
import EditEvent from "../pages/Events/EditEvent";
import UserAppointmentDetails from "../pages/Appointments/UserAppointmentDetails";
import CdcSheets from "../pages/Cdcsheets/CdcSheets";
import EventCompleted from "../pages/Events/EventCompleted";
import AppointmentCompleted from "../pages/Appointments/AppointmentCompleted";
import MedicalReportForm from "../pages/Appointments/MedicalReportForm";
import UserMedicalDetails from "../pages/Users/UserMedicalDetail";
import ConsentForm from "../pages/Appointments/ConsentForm";
import AdminProfile from "../pages/Admins/AdminProfile";
import CompletedEventDetails from "../pages/Events/CompletedEventDetails";
import PhysicalExam from "../components/Appointments/PhysicalExam";

export const normalRoutes = [
    {
      title: "Dashboard",
      url: "/dashboard",
      page: <GlobalLayout page={<Home />} />,
    },
    {
      title: "Appointments",
      url: "/appointments",
      page: <GlobalLayout page={<Appointments />} />,
    },
    {
      title: "Events",
      url: "/events",
      page: <GlobalLayout page={<Events />} />,
    },
    {
      title: "Student Profile",
      url: "/student-profile/:userId",
      page: <GlobalLayout page={<StudentProfile />} />,
    },
    {
      title: "Events Details",
      url: "/event-details/:eventId",
      page: <GlobalLayout page={<EventDetails />} />,
    },
    {
      title: "Profile",
      url: "/profile",
      page: <GlobalLayout page={<Profile />} />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      page: <GlobalLayout page={<Notifications />} />,
    },
    {
      title: "Privacy Policy",
      url: "/privacy-policy",
      page: <GlobalLayout page={<PrivacyPolicy />} />,
    },
    {
      title: "Terms Of Service",
      url: "/termsofservice",
      page: <GlobalLayout page={<TermsOfService />} />,
    },
    {
      title: "Edit Profile",
      url: "/edit-profile",
      page: <GlobalLayout page={<EditProfile />} />,
    },
    {
      title: "Splash",
      url: "/",
      page: <Splash />
    },
    {
      title: "Profile Setup",
      url: "/profile-setup",
      page: <ProfileSetup />,
    },
    {
      title: "Users",
      url: "/users",
      page: <GlobalLayout page={<Users />} />,

    },
    {
      title: "Users",
      url: "/students",
      page: <GlobalLayout page={<Students />} />,

    },
    {
      title: "Admin",
      url: "/admins",
      page: <GlobalLayout page={<Admins />} />,

    },
    {
      title: "Admin",
      url: "/create-event",
      page: <GlobalLayout page={<CreateEvent />} />,

    },
    {
      title: "Create Profile",
      url: "/create-profile",
      page: <GlobalLayout page={<CreateProfile />} />,

    },
    {
      title: "Edit Event",
      url: "/edit-event",
      page: <GlobalLayout page={<EditEvent />} />,

    },
    
    {
      title: "User Appointment Details",
      url: "/userappointmentdetails",
      page: <GlobalLayout page={<UserAppointmentDetails />} />,

    },
    {
      title: "CDC Sheets",
      url: "/cdc-sheets",
      page: <GlobalLayout page={<CdcSheets />} />,

    },
    {
      title: "Event Completed",
      url: "/event-completed",
      page: <GlobalLayout page={<EventCompleted />} />,

    },
    {
      title: "Appointment Completed",
      url: "/appointment-completed/:id",
      page: <GlobalLayout page={<AppointmentCompleted />} />,

    },
    {
      title: "Medical Report Form",
      url: "/medicalreportform",
      page: <GlobalLayout page={<MedicalReportForm />} />,

    },
    {
      title: "usermedicaldetails",
      url: "/usermedicaldetails",
      page: <GlobalLayout page={<UserMedicalDetails />} />,

    },
    {
      title: "Consent Form",
      url: "/consent-form",
      page: <GlobalLayout page={<ConsentForm />} />,

    },
    {
      title: "Admin Profile",
      url: "/admin-profile/:adminId",
      page: <GlobalLayout page={<AdminProfile />} />,

    },
    {
      title: "Admin Profile",
      url: "/completed-event-details",
      page: <GlobalLayout page={<CompletedEventDetails />} />,

    },
    {
      title: "physical Exam",
      url: "/physical-exam",
      page: <GlobalLayout page={<PhysicalExam />} />,

    },

    

]    
