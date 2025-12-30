import axiosInstance from "./axios";

/* ================= CREATE EMPLOYEE ================= */
export const createEmployee = async (data) => {
  const res = await axiosInstance.post("/employees", data);
  return res.data;
};

/* ================= GET EMPLOYEES (PAGINATED) ================= */
export const getEmployees = async (page = 1) => {
  const res = await axiosInstance.get(`/employees?page=${page}`);
  return res.data;
};

/* ================= UPDATE EMPLOYEE (EDIT) ================= */
export const updateEmployee = async (id, data) => {
  const res = await axiosInstance.put(`/employees/${id}`, data);
  return res.data;
};

/* ================= DELETE EMPLOYEES (SINGLE / BULK) ================= */
export const deleteEmployees = async (ids) => {
  const res = await axiosInstance.delete("/employees", {
    data: { ids }, // backend expects array
  });
  return res.data;
};
