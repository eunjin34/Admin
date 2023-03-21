import apiClient from "./auth/apiClient";

export const getList = async () => {
  try {
    const res = await apiClient.get("/admin/shop");
    console.log(res?.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
// 상세조회
export const detailList = async () => {
  // try {
  //   const res = await apiClient.get("/admin/shop");
  //   return res.data;
  // } catch (err) {
  //   console.log(err);
  // }
};

// 등록
export const addList = async () => {
  // try {
  //   const res = await apiClient.get("/admin/shop");
  //   return res.data;
  // } catch (err) {
  //   console.log(err);
  // }
};

// 삭제
export const deleteList = async () => {
  // try {
  //   const res = await apiClient.get("/admin/shop");
  //   return res.data;
  // } catch (err) {
  //   console.log(err);
  // }
};
