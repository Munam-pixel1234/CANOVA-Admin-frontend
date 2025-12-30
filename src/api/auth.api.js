import axiosInstance from "./axios";

// Admin login
export const adminLogin = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Admin logout
export const adminLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
