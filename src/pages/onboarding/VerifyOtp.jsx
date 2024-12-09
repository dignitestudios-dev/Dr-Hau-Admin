import React, { useState, useContext } from "react";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import axios from "../../axios";

const VerifyOtp = () => {
  const { navigate } = useContext(GlobalContext);

  // Initialize OTP as an array of 4 empty strings
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const email = localStorage.getItem("email"); // Retrieve the email from localStorage

  // Handle OTP input change for each field
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp]; // Copy the current OTP array
    newOtp[index] = e.target.value; // Update the value at the specific index
    setOtp(newOtp); // Update the OTP state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all OTP fields are filled
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter the full OTP.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/auth/validatePassOTP", { email, code: otpCode });

      // Log the response data to inspect it
      console.log("API Response:", response.data);

      if (response.data.success) {
        // Extract the resetToken from response.data.data
        const resetToken = response.data.data?.resetToken;

        if (resetToken) {
          // If resetToken exists, store it in localStorage
          localStorage.setItem("resetToken", resetToken);
          console.log("Reset Token stored:", localStorage.getItem("resetToken")); // Verify it's stored
          setSuccessMessage("OTP has been verified successfully.");
          
          // Redirect to the password update page after a successful OTP verification
          setTimeout(() => {
            navigate("/update-password");
          }, 2000);
        } else {
          setError("Reset token is missing from the response.");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className="font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Please enter the code that we sent to your email {email}, to reset your password.
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {/* OTP Input Fields */}
          {otp.map((digit, index) => (
            <input
              key={index}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#c2c6cb] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#55C9FA]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, index)} // Handle change for the specific index
            />
          ))}
        </div>

        {/* Display error or success message */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <AuthSubmitBtn text={isSubmitting ? "Verifying..." : "Next"} disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default VerifyOtp;
