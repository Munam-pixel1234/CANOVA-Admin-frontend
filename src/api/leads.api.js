import axiosInstance from "./axios";

/**
 * ===============================
 * LEADS API (ADMIN + SALES)
 * ===============================
 */

/**
 * Get all leads (Admin / Sales)
 */
export const getLeads = async () => {
  const response = await axiosInstance.get("/leads");
  return response.data;
};

/**
 * Create a single lead (Admin)
 */
export const createLead = async (data) => {
  const response = await axiosInstance.post("/leads", data);
  return response.data;
};

/**
 * Upload CSV leads (Admin)
 */
export const uploadLeadsCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/leads/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
