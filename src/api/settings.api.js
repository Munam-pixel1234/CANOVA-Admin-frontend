// src/api/settings.api.js
import axiosInstance from "./axios";

export const getAdminProfile = async () => {
  const res = await axiosInstance.get("/settings");
  return res.data;
};

export const updateAdminProfile = async (data) => {
  const res = await axiosInstance.put("/settings", data);
  return res.data;
};
