import { api } from "@/api/base";

export const loginUser = async (credentials) => {
  return await api({
    url: "/api/auth/login",
    method: "post",
    payload: credentials,
  });
};

export const registerUser = async (customerData) => {
  return await api({
    url: "/api/auth/register",
    method: "post",
    payload: customerData,
  });
};

export const forgotPassword = async (customerData) => {
  return await api({
    url: "/api/auth/forgot-password",
    method: "post",
    payload: customerData,
  });
};

export const verifyOTP = async (customerData) => {
  return await api({
    url: "/api/auth/verify-otp",
    method: "post",
    payload: customerData,
  });
};

export const confirmPassword = async (customerData) => {
  return await api({
    url: "/api/auth/reset-password",
    method: "post",
    payload: customerData,
  });
};

export const registerExpert = async (expertData) => {
  return await api({
    url: "/api/experts/register",
    // url: "/api/auth/signup/expert",
    method: "post",
    payload: expertData,
  });
};

export const loginExpert = async (credentials) => {
  return await api({
    url: "/api/auth/login/expert",
    method: "post",
    payload: credentials,
  });
};

export const updatePassword = async (credentials) => {
  return await api({
    url: "/api/auth/change-password",
    method: "post",
    payload: credentials,
  });
};

export const updateProfile = async (credentials) => {
  console.log("credentials", credentials);
  return await api({
    url: "/api/auth/update",
    method: "patch",
    payload: credentials,
  });
};
