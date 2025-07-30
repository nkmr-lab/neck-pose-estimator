import { ApiError, OpArgType, OpReturnType } from "openapi-typescript-fetch";
import { paths } from "../types";
import { useApiClient } from "./api-client";

// --- Paths and Types ---
const basicLoginPath = "/user/login/basic";
type BasicLoginPath = typeof basicLoginPath;
const basicLoginMethod = "get";
type BasicLoginMethod = typeof basicLoginMethod;
type BasicLoginProps = { name: string; password: string };
type BasicLoginResponse = OpReturnType<paths[BasicLoginPath][BasicLoginMethod]>;

const createPath = "/user/create/basic";
type CreatePath = typeof createPath;
const createMethod = "post";
type CreateMethod = typeof createMethod;
type CreateUserProps = OpArgType<paths[CreatePath][CreateMethod]>;
type CreateUserResponse = OpReturnType<paths[CreatePath][CreateMethod]>;

const googleLoginPath = "/user/login/google";

// --- API Logic ---

async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  context: "Login" | "Create user" | "Logout",
): Promise<T | ApiError | Error> {
  try {
    const res = await apiCall();
    if (res instanceof ApiError) {
      console.error(`${context} failed: ${res.status} ${res.data?.detail}`);
      return res;
    } else if (res instanceof Error) {
      console.error();
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
  props: BasicLoginProps,
): Promise<BasicLoginResponse | ApiError | Error> {
  if (!props.name || !props.password) {
    return new Error("Name and password are required");
  }
  return handleApiCall(
    () =>
      useApiClient(
        baseUrl,
        appId,
        [basicLoginPath, basicLoginMethod],
        () => {},
        {
          Authorization: `Basic ${btoa(`${props.name}:${props.password}`)}`,
        },
      ),
    "Login",
  ) as Promise<BasicLoginResponse | ApiError | Error>;
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

function performGoogleLogin(baseUrl: string, redirect_to: string = "/"): void {
  const basePath = baseUrl.startsWith("http")
    ? baseUrl
    : `${window.location.origin}${baseUrl}`;
  const url = new URL(`${basePath}${googleLoginPath}`);
  url.searchParams.set(
    "redirect_to",
    `${window.location.origin}${redirect_to}`,
  );
  window.location.href = url.toString();
}

// --- UI Part ---

type DialogHandlers = {
  handleLogin: (props: BasicLoginProps) => void;
  handleCreateUser: (props: CreateUserProps) => void;
  handleGoogleLogin: () => void;
  onSkip: () => void;
};

type DialogController = {
  close: () => void;
  showError: (message: string) => void;
  clearError: () => void;
};

function createStyledElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  styles: Partial<CSSStyleDeclaration>,
  properties?: Partial<HTMLElementTagNameMap[K]>,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  Object.assign(element.style, styles);
  if (properties) {
    Object.assign(element, properties);
  }
  return element;
}

function createLoginDialog(
  config: { basic?: boolean; google?: boolean },
  handlers: DialogHandlers,
): DialogController | null {
  if (!config.basic && !config.google) {
    return null;
  }

  const dialog = createStyledElement("dialog", {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
  });

  const form = createStyledElement(
    "form",
    {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    {
      onsubmit: (event: Event) => {
        event.preventDefault();
        return false;
      },
    },
  );

  const title = createStyledElement(
    "h2",
    { margin: "0 0 10px 0", textAlign: "center" },
    { textContent: "Login" },
  );
  form.appendChild(title);

  const errorParagraph = createStyledElement("p", {
    color: "red",
    textAlign: "center",
    margin: "0",
    minHeight: "1.2em",
  });
  form.appendChild(errorParagraph);

  if (config.basic) {
    const nameInput = createStyledElement(
      "input",
      {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      },
      { type: "text", placeholder: "Name", required: true },
    );
    form.appendChild(nameInput);

    const passwordInput = createStyledElement(
      "input",
      {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      },
      { type: "password", placeholder: "Password", required: true },
    );
    form.appendChild(passwordInput);

    const loginButton = createStyledElement(
      "button",
      {
        padding: "10px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
      },
      {
        type: "button",
        textContent: "Login",
        onclick: () =>
          handlers.handleLogin({
            name: nameInput.value,
            password: passwordInput.value,
          }),
      },
    );
    form.appendChild(loginButton);

    const createButton = createStyledElement(
      "button",
      {
        padding: "10px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#28a745",
        color: "white",
        cursor: "pointer",
      },
      {
        type: "button",
        textContent: "Create Account",
        onclick: () =>
          handlers.handleCreateUser({
            name: nameInput.value,
            password: passwordInput.value,
            isAdmin: false,
          }),
      },
    );
    form.appendChild(createButton);
  }

  if (config.google) {
    if (config.basic) {
      form.appendChild(
        createStyledElement("hr", {
          border: "none",
          borderTop: "1px solid #ccc",
          margin: "10px 0",
        }),
      );
    }
    const googleButton = createStyledElement(
      "button",
      {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#db4437",
        color: "white",
        cursor: "pointer",
      },
      {
        type: "button",
        textContent: "Login with Google",
        onclick: handlers.handleGoogleLogin,
      },
    );
    form.appendChild(googleButton);
  }

  form.appendChild(
    createStyledElement("hr", {
      border: "none",
      borderTop: "1px solid #ccc",
      margin: "10px 0",
    }),
  );

  const skipButton = createStyledElement(
    "button",
    {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "transparent",
      color: "#ccc",
      cursor: "pointer",
    },
    {
      type: "button",
      textContent: "Continue without login",
      onclick: handlers.onSkip,
    },
  );
  form.appendChild(skipButton);

  dialog.appendChild(form);
  document.body.appendChild(dialog);
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
  config: {
    basic?: boolean;
    google?: boolean;
  } = { basic: true, google: true },
): Promise<BasicLoginResponse | null> => {
  return new Promise((resolve) => {
    let dialog: DialogController | null = null;

    const handlers: DialogHandlers = {
      handleLogin: async (props) => {
        if (!dialog) return;
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
      handleCreateUser: async (props) => {
        if (!dialog) return;
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
          resolve(result as unknown as BasicLoginResponse);
        }
      },
      handleGoogleLogin: () => {
        if (!dialog) return;
        dialog.clearError();
        performGoogleLogin(baseUrl, "/");
        dialog.close();
        resolve(null);
      },
      onSkip: () => {
        if (!dialog) return;
        dialog.close();
        resolve(null);
      },
    };

    dialog = createLoginDialog(config, handlers);

    if (!dialog) {
      resolve(null);
    }
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

export { login, performLogin, performCreateUser, performGoogleLogin, logout };
