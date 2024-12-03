import React, { useContext } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Gradient,Black, Pill,ForgotpasswordImage } from "../../assets/export";


const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-screen h-screen flex items-start justify-start bg-black">
      <form
        onSubmit={() => navigate("/verify-otp")}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full  flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
          Enter your email to reset your password and swiftly resume your experience.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email here"}
            type={"text"}
          />
        </div>

        <AuthSubmitBtn text={"Next"} />
      </form>
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* Gradient Image */}
        <img
          src={Gradient}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        />

        {/* Black Image (Overlaying the gradient) */}
        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />

        {/* Login Image (Centered) */}
        <div className="relative flex justify-center items-center h-full">
          <img
            src={ForgotpasswordImage}
            alt="login_mockup"
            className="relative w-[60%] h-full object-contain" // Centered and responsive
          />
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-[20px] font-medium">Forgot your password?</h3>
          <p className="text-[16px] text-[#E0EAFFBF]">
          You can get them back easily.
          </p>

          {/* Pill Image centered below the text */}
          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ForgotPassword;