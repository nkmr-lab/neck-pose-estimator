import { OpArgType, OpReturnType } from "openapi-typescript-fetch";
import { paths } from "../types";
import { useApiClient } from "./api-client";

const path = "/user/auth/basic";
type Path = typeof path;
const method = "post";
type Method = typeof method;

// Login logic part
async function performLogin(
  baseUrl: string,
  appId: string,
  props: OpArgType<paths[Path][Method]>,
) {
  if (!props.name || !props.password) {
    console.error("Name and password are required");
    return null;
  }
  try {
    const res = await useApiClient(baseUrl, appId, [path, method], () => props);

    if (res instanceof Error) {
      console.error(`Login failed: ${res.message}`);
      return null;
    } else if (res === null) {
      console.error("Login failed: API returned null");
      return null;
    }
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Login failed: ${error.message}`);
    } else {
      console.error("Login failed with unknown error", error);
    }
    return null;
  }
}

// UI part
function createLoginDialog(
  onSubmit: (props: OpArgType<paths[Path][Method]>) => void,
): () => void {
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
    onSubmit({
      name: nameInput.value,
      password: passwordInput.value,
      isAdmin: false,
    });
    return false;
  };

  // Create title
  const title = document.createElement("h2");
  title.textContent = "Login";
  title.style.margin = "0 0 10px 0";
  title.style.textAlign = "center";
  form.appendChild(title);

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
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.style.padding = "10px";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "4px";
  submitButton.style.backgroundColor = "#007bff";
  submitButton.style.color = "white";
  submitButton.style.cursor = "pointer";
  form.appendChild(submitButton);

  dialog.appendChild(form);
  document.body.appendChild(dialog);

  // Show the dialog
  dialog.showModal();

  return () => {
    dialog.close();
    dialog.remove();
  };
}

const login = async (
  baseUrl: string,
  appId: string,
): Promise<OpReturnType<paths[Path][Method]>> => {
  return new Promise((resolve) => {
    const closeDialog = createLoginDialog(async (props) => {
      const result = await performLogin(baseUrl, appId, props);
      if (result) {
        closeDialog();
        resolve(result);
      }
    });
  });
};

const logout = async (baseUrl: string, appId: string) => {
  const path = "/user/logout";
  const method = "get";

  try {
    await useApiClient(baseUrl, appId, [path, method], () => null);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Logout failed: ${error.message}`);
    } else {
      console.error("Logout failed with unknown error", error);
    }
  }
};

export { login, logout, performLogin, createLoginDialog };
