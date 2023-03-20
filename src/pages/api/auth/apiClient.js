import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV || "https://dev-apis.soulx.co.kr/x"
    : process.env.NEXT_PUBLIC_API_HOST || "https://api.soulx.co.kr/x";

// const token = localStorage.getItem("TOKEN");

const apiClient = axios.create({
  baseURL: host,
  // withCredentials: true,
  // headers:{
  //   Authorization:`Bearer ${JSON.parse(token)}`
  // }
});

export default apiClient;
