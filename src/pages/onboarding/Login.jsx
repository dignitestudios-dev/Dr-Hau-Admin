import React, { useContext, useEffect, useState } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Gradient, LoginImage, Black, Pill } from "../../assets/export";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";

const Login = () => {
  const { navigate } = useContext(GlobalContext);
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
    } 
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");  
    setPasswordError("");
  
    try {
      const response = await axios.post(`/auth/adminSignIn`, { email, password });
      
      if (response?.data?.success) {
        
        const token = response?.data?.data?.token; 
        console.log("token`` ", token)
        const data = response?.data?.data;
        localStorage.setItem('token', token); 
        signIn(data);
        SuccessToast("Logged in successfully.");
        navigate("/dashboard")
      } else {
        if (response.data.message.includes("email")) {
          setEmailError(response?.data?.message);
        } else if (response?.data?.message.includes("password")) {
          setPasswordError(response?.data?.message);
        } else {
          ErrorToast(response?.data?.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed due to a network error.";
      ErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black">
      <form
        onSubmit={handleLogin}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        <h1 className="text-left text-4xl font-bold text-black leading-[64.8px] tracking-[-1.2px]">
          Log In
        </h1>
        <div className="flex flex-col w-full lg:w-[432px] h-auto justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Enter your email here"}
            type={"text"}
            setState={setEmail}
            state={email}
            error={emailError} 
          />
          <div className="flex flex-col w-full lg:w-[432px] justify-start items-end gap-1">
            <AuthInput
              text={"Password"}
              placeholder={"Enter your password here"}
              type={"password"}
              setState={setPassword}
              state={password}
              error={passwordError} 
            />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-[#109BFF]"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <AuthSubmitBtn text={loading ? "Logging In..." : "Log In"} disabled={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <img
          src={Gradient}
          alt="gradient"
          className="absolute inset-25 w-full h-full"
        />
        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />
        <div className="relative flex justify-center items-center h-full">
          <img
            src={LoginImage}
            alt="login_mockup"
            className="relative w-[60%] h-auto object-contain"
          />
        </div>
        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-lg font-medium">Connect with any device.</h3>
          <p className="text-sm">Everything you need is an internet connection.</p>
          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;