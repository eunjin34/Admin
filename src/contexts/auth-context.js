import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { socialLogin } from "src/pages/api/auth/googleLogin";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import apiClient from "src/pages/api/auth/apiClient";
import { useRouter } from "next/router";

// import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    // 페이로드(사용자)가 제공되면 인증됨
    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.GOOGLE_LOGIN]: (state, action) => {
    const token = action.payload;
    return {
      ...state,
      ...(token
        ? {
            isAuthenticated: true,
            isLoading: false,
            token: true,
          }
        : {
            isLoading: false,
          }),
    };
  },
};

const reducer = (state, action) => {
  handlers[action.type] ? handlers[action.type](state, action) : state;
};

// 이 컨텍스트의 역할은 앱 트리를 통해 인증 상태를 전파하는 것.
// 인증 상태값 전역으로 공유하는 역할
export const AuthContext = createContext({ undefined });
// 1. 전역상태관리 객체 생성(초기값 : 없음)

export const AuthProvider = (props) => {
  const router = useRouter();
  const [token, setToken] = useState([]);
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: true,
    token: token,
    user: null,
  });
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    let isAuthenticated = false;

    try {
      isAuthenticated = window.localStorage.getItem("TOKEN") ? true : false;
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  // const skip = () => {
  //   try {
  //     window.sessionStorage.setItem("authenticated", "true");
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: "5e86809283e28b96d2d38537",
  //     avatar: "/assets/avatars/avatar-anika-visser.png",
  //     name: "Anika Visser",
  //     email: "anika.visser@devias.io",
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user,
  //   });
  // };

  const signIn = async (email, password) => {
    if (email !== "demo@devias.io" || password !== "Password123!") {
      throw new Error("Please check your email and password");
    }

    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Anika Visser",
      email: "anika.visser@devias.io",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const googleLogin = async () => {
    const googleAuth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(googleAuth, provider)
      .then(async (res) => {
        if (res) {
          const { data, statusCode } = await socialLogin(res.user.uid);
          if (statusCode === 200) {
            localStorage.setItem("TOKEN", data);
            sessionStorage.setItem("authenticated", true);

            dispatch({
              type: HANDLERS.GOOGLE_LOGIN,
              payload: data,
            });
            router.push("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // 2. 하위 컴포넌트에게 전달하는 역할
    <AuthContext.Provider
      value={{
        ...state,
        // skip,
        signIn,
        signUp,
        signOut,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };

// 3. context 변화를 구독하는 컴포넌트(이건 변수로 만듬), app.js파일에 있음
export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
