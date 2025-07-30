import { ApiError, OpArgType, OpReturnType } from "openapi-typescript-fetch";
import { paths } from "../types";
import { useApiClient } from "./api-client";

// --- Paths and Types ---
const loginPath = "/user/login/basic";
type LoginPath = typeof loginPath;
const loginMethod = "get";
type LoginMethod = typeof loginMethod;
type LoginProps = { name: string; password: string };
type LoginResponse = OpReturnType<paths[LoginPath][LoginMethod]>;

const createPath = "/user/create/basic";
type CreatePath = typeof createPath;
const createMethod = "post";
type CreateMethod = typeof createMethod;
type CreateUserProps = OpArgType<paths[CreatePath][CreateMethod]>;
type CreateUserResponse = OpReturnType<paths[CreatePath][CreateMethod]>;

// --- API Logic ---

async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  context: "Login" | "Create user",
): Promise<T | ApiError | Error> {
  try {
    const res = await apiCall();
    if (res instanceof ApiError) {
      console.error(`${context} failed: ${res.status} ${res.data?.detail}`);
      return res;
    } else if (res instanceof Error) {
      console.error(`${context} failed: ${res.message}`);
      return res;
    } else if (res === null) {
      const message = `${context} failed: API returned null`;
      console.error(message);
      return new Error(message);
    }
    return res;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`${context} failed: ${error.status} ${error.data?.detail}`);
      return error;
    } else if (error instanceof Error) {
      console.error(`${context} failed: ${error.message}`);
      return error;
    } else {
      const message = `${context} failed with unknown error`;
      console.error(message, error);
      return new Error(message);
    }
  }
}

async function performLogin(
  baseUrl: string,
  appId: string,
  props: LoginProps,
): Promise<LoginResponse | ApiError | Error> {
  if (!props.name || !props.password) {
    return new Error("Name and password are required");
  }
  return handleApiCall(
    () =>
      useApiClient(baseUrl, appId, [loginPath, loginMethod], () => {}, {
        Authorization: `Basic ${btoa(`${props.name}:${props.password}`)}`,
      }),
    "Login",
  ) as Promise<LoginResponse | ApiError | Error>;
}

async function performCreateUser(
  baseUrl: string,
  appId: string,
  props: CreateUserProps,
): Promise<CreateUserResponse | ApiError | Error> {
  if (!props.name || !props.password) {
    return new Error("Name and password are required");
  }
  return handleApiCall(
    () => useApiClient(baseUrl, appId, [createPath, createMethod], () => props),
    "Create user",
  ) as Promise<CreateUserResponse | ApiError | Error>;
}

// UI part
function createLoginDialog(
  handleLogin: (props: LoginProps) => void,
  handleCreateUser: (props: OpArgType<paths[CreatePath][CreateMethod]>) => void,
  onSkip: () => void,
): {
  close: () => void;
  showError: (message: string) => void;
  clearError: () => void;
} {
  // Create dialog element
  const dialog = document.createElement("dialog");
  dialog.style.border = "1px solid #ccc";
  dialog.style.borderRadius = "8px";
  dialog.style.padding = "20px";
  dialog.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  dialog.style.maxWidth = "400px";
  dialog.style.width = "90%";

  // Create form element
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "15px";
  form.onsubmit = (event: Event) => {
    event.preventDefault();
    return false;
  };

  // Create title
  const title = document.createElement("h2");
  title.textContent = "Login";
  title.style.margin = "0 0 10px 0";
  title.style.textAlign = "center";
  form.appendChild(title);

  // Create error message paragraph
  const errorParagraph = document.createElement("p");
  errorParagraph.style.color = "red";
  errorParagraph.style.textAlign = "center";
  errorParagraph.style.margin = "0";
  errorParagraph.style.minHeight = "1.2em";
  form.appendChild(errorParagraph);

  // Create name input
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Name";
  nameInput.style.padding = "10px";
  nameInput.style.border = "1px solid #ccc";
  nameInput.style.borderRadius = "4px";
  nameInput.required = true;
  form.appendChild(nameInput);

  // Create password input
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.style.padding = "10px";
  passwordInput.style.border = "1px solid #ccc";
  passwordInput.style.borderRadius = "4px";
  passwordInput.required = true;
  form.appendChild(passwordInput);

  // Create submit button
  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.textContent = "Login";
  loginButton.style.padding = "10px";
  loginButton.style.border = "none";
  loginButton.style.borderRadius = "4px";
  loginButton.style.backgroundColor = "#007bff";
  loginButton.style.color = "white";
  loginButton.style.cursor = "pointer";
  loginButton.onclick = async (event: MouseEvent) => {
    event.preventDefault();
    const props: LoginProps = {
      name: nameInput.value,
      password: passwordInput.value,
    };
    handleLogin(props);
  };
  form.appendChild(loginButton);

  const createButton = document.createElement("button");
  createButton.type = "submit";
  createButton.textContent = "Create Account";
  createButton.style.padding = "10px";
  createButton.style.border = "none";
  createButton.style.borderRadius = "4px";
  createButton.style.backgroundColor = "#28a745";
  createButton.style.color = "white";
  createButton.style.cursor = "pointer";
  createButton.onclick = async (event: MouseEvent) => {
    event.preventDefault();
    const props: OpArgType<paths[CreatePath][CreateMethod]> = {
      name: nameInput.value,
      password: passwordInput.value,
      isAdmin: false, // Default to false, can be changed if needed
    };
    handleCreateUser(props);
  };
  form.appendChild(createButton);

  const divider = document.createElement("hr");
  divider.style.border = "none";
  divider.style.borderTop = "1px solid #ccc";
  divider.style.margin = "10px 0";
  form.appendChild(divider);

  // Create skip button
  const skipButton = document.createElement("button");
  skipButton.type = "button";
  skipButton.textContent = "Continue without login";
  skipButton.style.padding = "10px";
  skipButton.style.border = "1px solid #ccc";
  skipButton.style.borderRadius = "4px";
  skipButton.style.backgroundColor = "transparent";
  skipButton.style.color = "#ccc";
  skipButton.style.cursor = "pointer";
  skipButton.onclick = onSkip;
  form.appendChild(skipButton);

  dialog.appendChild(form);
  document.body.appendChild(dialog);

  // Show the dialog
  dialog.showModal();

  return {
    close: () => {
      dialog.close();
      dialog.remove();
    },
    showError: (message: string) => {
      errorParagraph.textContent = message;
    },
    clearError: () => {
      errorParagraph.textContent = "";
    },
  };
}

const login = async (
  baseUrl: string,
  appId: string,
): Promise<LoginResponse | null> => {
  return new Promise((resolve) => {
    const dialog = createLoginDialog(
      async (props) => {
        dialog.clearError();
        const result = await performLogin(baseUrl, appId, props);
        if (result instanceof ApiError) {
          dialog.showError(
            result.data?.detail ?? `Login failed: ${result.status}`,
          );
        } else if (result instanceof Error) {
          dialog.showError(result.message);
        } else {
          dialog.close();
          resolve(result);
        }
      },
      async (props) => {
        dialog.clearError();
        const result = await performCreateUser(baseUrl, appId, props);
        if (result instanceof ApiError) {
          dialog.showError(
            result.data?.detail ?? `Create user failed: ${result.status}`,
          );
        } else if (result instanceof Error) {
          dialog.showError(result.message);
        } else {
          dialog.close();
          resolve(result as unknown as LoginResponse);
        }
      },
      () => {
        dialog.close();
        resolve(null);
      },
    );
  });
};

const logout = async (baseUrl: string, appId: string) => {
  const path = "/user/logout";
  const method = "get";

  try {
    await useApiClient(baseUrl, appId, [path, method], () => null);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`Logout failed: ${error.status} ${error.data?.detail}`);
    } else if (error instanceof Error) {
      console.error(`Logout failed: ${error.message}`);
    } else {
      console.error("Logout failed with unknown error", error);
    }
  }
};

export { login, performLogin, performCreateUser, logout };
