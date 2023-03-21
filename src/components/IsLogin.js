import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function IsLogin({ children }) {
  // 모든 페이지에서 토큰 여부 검사를 실시하는 provider 역할을 하는 컴포넌트
  const [token, setToken] = useState(false);

  useEffect(() => {
    const Token = localStorage.getItem("TOKEN") ? true : false;
    console.log(Token);
    if (Token === false) {
      Router.push("/login");
    } else {
      setToken(Token);
    }
  }, [children]);

  return <>{token && children}</>;
}
