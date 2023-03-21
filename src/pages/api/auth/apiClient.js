import axios from "axios";

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
    console.log(accessToken);
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
  function (error) {
    errorController(error);
  }
);

export default apiClient;
