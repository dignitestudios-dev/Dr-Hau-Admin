import React, { useState } from "react";
import { useContext } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import axios from "../../axios";

const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);

  const [email, setEmail] = useState(""); // State to track email input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); // Error state for invalid email
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state when the user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email) {
      setError("Please enter your email."); // Show error if email is empty
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/auth/sendPassOTP", { email });

      if (response.data.success) {
        // Save email to localStorage
        localStorage.setItem("email", email);

        setSuccessMessage(
          "Password OTP has been sent again, please check your email."
        );
        setTimeout(() => {
          navigate("/verify-otp"); // Redirect to OTP verification page after success
        }, 2000); // Wait 2 seconds before redirecting
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please try again.");
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
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Enter your email to reset your password and swiftly resume your
            experience.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email here"}
            type={"text"}
            state={email} // Pass the state for the email
            setState={setEmail} // Pass the setState function to update the state
            error={error} // Pass the error message if any
          />
        </div>

        {/* Display error or success message */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <AuthSubmitBtn text={isSubmitting ? "Sending..." : "Next"} disabled={isSubmitting} />
      </form>

      {/* Rest of the layout */}
    </div>
  );
};

export default ForgotPassword;
