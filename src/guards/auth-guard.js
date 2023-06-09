import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuthContext } from "src/contexts/auth-context";

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  // const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  // 마운트에서만 인증 확인을 수행
  // 하단 로직 사용시 로그아웃 후 사용자를 수동으로 리다이렉션할 수 있다. 그렇지 않으면 트리거된다. 자동으로 로그인 페이지로
  // 리다이렉션된다.

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }
    ignore.current = true;

    if (!window.localStorage.getItem("TOKEN")) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
