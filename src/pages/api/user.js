import apiClient from "./auth/apiClient";

export const getUserList = async (params) => {
  try {
    const res = await apiClient.get("/admin/users", { params: params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
