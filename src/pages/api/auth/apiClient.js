import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV || "https://dev-apis.soulx.co.kr/x"
    : process.env.NEXT_PUBLIC_API_HOST || "https://api.soulx.co.kr/x";

const apiClient = axios.create({
  baseURL: host,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("TOKEN");
    // config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${token}`;
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
      localStorage.clear();
      window.location.reload();
    }
    errorController(err);
  }
);

export default apiClient;
