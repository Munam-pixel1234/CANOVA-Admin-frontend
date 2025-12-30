// src/api/dashboard.api.js
import axiosInstance from "./axios";

export const getDashboardData = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data;
};
