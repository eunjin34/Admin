import axios from "axios";
import { useEffect } from "react";

const host =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV || "https://dev-apis.soulx.co.kr/x"
    : process.env.NEXT_PUBLIC_API_HOST || "https://api.soulx.co.kr/x";

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("TOKEN") : null;

const apiClient = axios.create({
  baseURL: host,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

apiClient.interceptors.request.use(
  function (config) {
    // config.headers["Content-Type"] = "application/json; charset=utf-8";
    // config.headers["Authorization"] = " 토큰 값";
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.response.status === 401) {
      console.log("401에러 발생 첫 화면으로 이동 필요");
    }
    errorController(err);
  }
);

export default apiClient;
