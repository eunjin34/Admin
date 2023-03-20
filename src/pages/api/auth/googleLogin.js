// 구글 로그인
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import apiClient from "./apiClient";

const googleAuth = getAuth();

export const socialLogin = async (params) => {
  const res = await apiClient.post("/auth/adminlogin", { firebaseUid: params });
  return res.data;
};

export const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(googleAuth, provider)
    .then(async (res) => {
      if (res) {
        const { data, statusCode } = await socialLogin(res.user.uid);
        if (statusCode === 200) {
          localStorage.setItem("TOKEN", data);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
