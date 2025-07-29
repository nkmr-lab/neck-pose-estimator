import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import config from "../firebase.config";
import { useApiClient } from "./api-client";
import { ApiError } from "openapi-typescript-fetch";
const app = initializeApp(config);

const login = async (baseUrl: string, appId: string) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  if (user) {
    try {
      const res = await useApiClient(
        baseUrl,
        appId,
        ["/user/auth/email", "post"],
        () => ({
          email: user.email!,
          name: user.displayName ?? "anonymous",
          isAdmin: false,
        }),
      );
      if (res === null || res instanceof Error) {
        console.error("User login failed: API returned null");
        return null;
      }
      return res;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API request failed: ${error.message}`);
      }
      console.error("API request failed with unknown error", error);
      return null;
    }
  } else {
    console.error("User login failed");
    return null;
  }
};

const logout = async (baseUrl: string, appId: string) => {
  const auth = getAuth(app);
  try {
    await auth.signOut();
    await useApiClient(baseUrl, appId, ["/user/logout", "get"], () => null);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("User logout failed", error);
  }
};

export { login, logout };
