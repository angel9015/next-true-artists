// External
import * as React from "react";
import { useRouter } from "next/router";

// APIs
import { clearAuthHeader, setAuthHeader, registerUser, loginUser, verifyUser } from "../api";

import { FullPageLoader } from "../components/FullPageLoader";

// @ts-ignore
const context = React.createContext<Context>({});

enum AuthState {
  "pending",
  "unAuthenticated",
  "authenticated",
}

enum Roles {
  USERS = "users",
  ARTISTS = "artist",
  STUDIOS = "studios",
}

const unauthRoutes = ["/login", "/register", "/forgot-password", "/register-selection"];

/*
 Auth Flow: (TODO)

 - on app start ( when this component is mounted ):
   - call api /me to find if the localstorage token is still valid, if it is ( mark user as logged in & do nothing )
  - if token is missing or invalid: mark user as not logged in & redirect to '/login', while saving the page he was on ( or trying to access )
  - once he's logged in ( save token , mark as logged in & redirect to the page he was trying to access )
*/
export function AuthContext({ children: route }: Props) {
  const router = useRouter();

  const user = React.useRef<User | undefined>(undefined);
  const [status, setStatus] = React.useState<AuthState>(AuthState.pending);
  const [previousPath, setPreviousPath] = React.useState("");

  async function login(email: string, password: string): Promise<RestApi.Response> {
    try {
      const response = await loginUser(email, password);
      const { error, data } = response;
      // No error happens
      if (!error) {
        user.current = data.user;

        localStorage.setItem(TOKEN_KEY, data.auth_token);
        setAuthHeader(data.auth_token);

        // Update status
        setStatus(AuthState.authenticated);

        // If user went to specific before
        if (previousPath !== "") {
          router.push(previousPath);
        } else {
          router.push("/");
        }
      }

      return response;
    } catch (error) {
      // Unknown issue or code issues
      return { error: true, data: null, errors: "Internal server. Please try again" };
    }
  }

  async function register(email: string, password: string) {
    try {
      const data = await registerUser(email, password);
      localStorage.setItem(TOKEN_KEY, data.auth_token);
      setAuthHeader(data.auth_token);

      // Update status
      setStatus(AuthState.authenticated);

      user.current = data.user;

      router.push("/");
    } catch (error) {}
  }

  function logOut() {
    setAuthHeader("");
    localStorage.removeItem(TOKEN_KEY);
    user.current = undefined;

    // Update status
    setStatus(AuthState.unAuthenticated);

    // Back to login
    router.replace("/login");
  }

  React.useEffect(() => {
    // Only save auth router
    if (unauthRoutes.indexOf(router.pathname) === -1) {
      // Store this url to get back later
      setPreviousPath(router.pathname);
    }
  }, [router.pathname]);

  React.useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log(`Token: ${token}`);

    // No token available
    if (!token) {
      setStatus(AuthState.unAuthenticated);

      // Any route is not defined as unauth route will be redirected to login page
      if (unauthRoutes.indexOf(router.pathname) === -1) {
        // Store this url to get back later
        setPreviousPath(router.pathname);

        // Redirect to login page
        router.replace("/login");
      }

      // Redirect to login page
      router.replace("/login");

      return;
    }
    setAuthHeader(token);
    verifyUser()
      .then(({ data }) => {
        user.current = data;

        setStatus(AuthState.authenticated);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        clearAuthHeader();
        setStatus(AuthState.unAuthenticated);

        // Redirect to login page
        router.replace("/login");
      });
  }, []);

  return (
    <context.Provider value={{ user: user.current, status, register, login, logOut, previousPath }}>
      {status === AuthState.pending ? <FullPageLoader /> : null}
      {status === AuthState.authenticated ? route : null}
      {status === AuthState.unAuthenticated ? route : null}
    </context.Provider>
  );
}

export function useAuth() {
  return React.useContext(context);
}

interface Props {
  children: JSX.Element;
}

export type User = {
  email: string;
  id: number;
  role: Roles;
};

interface Context {
  user?: User;
  login: (email: string, password: string) => Promise<RestApi.Response>;
  register: (email: string, password: string, role?: Roles) => void;
  logOut: () => void;
  status: AuthState;
  previousPath: string;
}

const TOKEN_KEY = "AUTH_TOKEN";
