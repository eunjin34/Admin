// 구글 로그인
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const googleAuth = getAuth();

export const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(googleAuth, provider)
    .then((data) => {
      console.log("00000");
      // setUserData(data.user.uid);
      if (data) {
        console.log(data, "123123");
        // const { data, statusCode } = adminLogin(data.user.uid);
        // if (statusCode === 200) {
        //   // localStorage.setItem("TOKEN", data);
        //   console.log(data);
        // }
      }
    })
    .catch((err) => {
      console.log(err);
      // toast({
      //   title: '구글 로그인 실패',
      //   status: 'error', //success:성공
      //   // description: "We've created your account for you.",
      //   duration: 3000,//시간
      //   isClosable: true, //닫기
      // });
    });
};
