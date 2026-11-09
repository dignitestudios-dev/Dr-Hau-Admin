import axios from "axios";

export const baseUrl = 'https://backend.drhauclinic.com';
// export const baseUrl = "http://192.168.9.15:5000";

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use((request) => {
  let token = localStorage.getItem("token");
  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    const url = error.config?.url || "";
    const isPasswordOrAuthCheck =
      url.includes("/auth/updatePassAdmin") ||
      url.includes("/admin/password") ||
      url.includes("/auth/adminSignIn") ||
      url.includes("/auth/validatePassOTP") ||
      url.includes("/auth/forgotPassword");

    if (error?.response?.status === 401 && !isPasswordOrAuthCheck) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
