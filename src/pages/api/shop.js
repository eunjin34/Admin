import apiClient from "./auth/apiClient";

export const getList = async (params) => {
  try {
    const res = await apiClient.get("/admin/shop");
    console.log(params);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
// 상세조회
export const detailList = async (params) => {
  try {
    const res = await apiClient.get(`/admin/shop/${params}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 등록
export const addList = async (params) => {
  try {
    const res = await apiClient.post(`/admin/shop`, params);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 삭제
export const deleteList = async (params) => {
  try {
    const res = await apiClient.delete(`/admin/shop/${params}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 수정
export const editList = async (id, params) => {
  try {
    const res = await apiClient.put(`/admin/shop/${id}`, params);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
