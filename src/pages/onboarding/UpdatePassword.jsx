import React, { useState, useContext, useEffect } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import PasswordUpdateModal from "../../components/onboarding/PasswordUpdateModal";
import { Gradient, Black, Pill, UpdatepasswordImage } from "../../assets/export";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { navigate } = useContext(GlobalContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false); 
  const [resetToken, setResetToken] = useState(null); 

  const email = localStorage.getItem("email"); 
  const storedResetToken = localStorage.getItem("resetToken"); 

  useEffect(() => {
    if (!storedResetToken) {
      setError("No reset token found. Please verify your email or OTP again.");
      // setTimeout(() => navigate("/verify-otp"), 3000);
    } else {
      setResetToken(storedResetToken); 
    }
  }, [storedResetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setError("Reset token is missing.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/auth/updatePassOTP", {
        email,
        password,
        confirmPassword,
        resetToken,
      });

      if (response.data.success) {
        setSuccessMessage("Password updated successfully.");
        setIsUpdated(true); 
        // Clear reset token from localStorage after successful update
        localStorage.removeItem("resetToken");

        setTimeout(() => {
          navigate("/login"); 
        }, 2000);
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Error occurred while updating password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-4 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start -mt-6 items-start flex-col">
          <h1 className="text-[36px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Update Password
          </h1>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"New Password"}
            placeholder={"Enter Password"}
            type={"password"}
            value={password}
            setState={setPassword}
          />
          <AuthInput
            text={"Confirm Password"}
            placeholder={"Confirm Password"}
            type={"password"}
            value={confirmPassword}
            setState={setConfirmPassword}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <AuthSubmitBtn text={isSubmitting ? "Updating..." : "Update Password"} disabled={isSubmitting} />

        {isUpdated && (
          <PasswordUpdateModal
            isOpen={isUpdated}
            onRequestClose={() => setIsUpdated(false)} // Close modal when needed
          />
        )}
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <img
          src={Gradient}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        />

        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />

        <div className="relative flex justify-center items-center h-full">
          <img
            src={UpdatepasswordImage}
            alt="login_mockup"
            className="relative w-[60%] h-full object-contain" // Centered and responsive
          />
        </div>

        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-[20px] font-medium">This is the end!</h3>
          <p className="text-[16px] text-[#E0EAFFBF]">
            After entering the new password you will gain access to your account.
          </p>

          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
