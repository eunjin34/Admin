import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
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
};

const reducer = (state, action) => {
  handlers[action.type] ? handlers[action.type](state, action) : state;
};

// 이 컨텍스트의 역할은 앱 트리를 통해 인증 상태를 전파하는 것.
export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
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
    console.log(isAuthenticated);
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

  // const signIn = async (email, password) => {
  //   if (email !== "demo@devias.io" || password !== "Password123!") {
  //     throw new Error("Please check your email and password");
  //   }

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

  // const signUp = async (email, name, password) => {
  //   throw new Error("Sign up is not implemented");
  // };

  // const signOut = () => {
  //   dispatch({
  //     type: HANDLERS.SIGN_OUT,
  //   });
  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // skip,
        // signIn,
        // signUp,
        // signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
