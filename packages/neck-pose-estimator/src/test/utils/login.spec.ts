import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  performLogin,
  logout,
  performCreateUser,
  performGoogleLogin,
} from "../../utils/login";
import * as apiClient from "../../utils/api-client";
import { userFixture } from "../fixture/user";
import { ApiError } from "openapi-typescript-fetch";

// Mock the api-client
vi.mock("../../utils/api-client");

describe("auth functions", () => {
  const mockUseApiClient = vi.spyOn(apiClient, "useApiClient");
  const baseUrl = "http://test.com";
  const appId = "test-app";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("performLogin", () => {
    it("should call useApiClient with correct parameters and return user data on successful login", async () => {
      const loginProps = {
        name: "testuser",
        password: "password",
      };
      mockUseApiClient.mockResolvedValue(userFixture.notCalibrated);

      const result = await performLogin(baseUrl, appId, loginProps);

      expect(mockUseApiClient).toHaveBeenCalledWith(
        baseUrl,
        appId,
        ["/user/login/basic", "get"],
        expect.any(Function),
        {
          Authorization: `Basic ${btoa(
            `${loginProps.name}:${loginProps.password}`,
          )}`,
        },
      );

      expect(result).toEqual(userFixture.notCalibrated);
    });

    it("should return an error if name or password is not provided", async () => {
      const result = await performLogin(baseUrl, appId, {
        name: "",
        password: "",
      });
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Name and password are required");
    });

    it("should return an error if api client throws an error", async () => {
      const error = new Error("API Error");
      mockUseApiClient.mockRejectedValue(error);
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
      });

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("API Error");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Login failed: API Error");
    });

    it("should return an ApiError if api client returns an ApiError", async () => {
      const apiError = new ApiError({
        status: 401,
        data: { detail: "Invalid credentials" },
        url: `${baseUrl}/user/login/basic`,
        statusText: "Unauthorized",
        headers: new Headers(),
      });
      mockUseApiClient.mockResolvedValue(apiError);
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
      });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).status).toBe(401);
      expect((result as ApiError).data?.detail).toBe("Invalid credentials");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Login failed: 401 Invalid credentials`,
      );
    });
  });

  describe("performCreateUser", () => {
    const createUserProps = {
      name: "newuser",
      password: "newpassword",
      isAdmin: false,
    };

    it("should call useApiClient with correct parameters and return user data on successful creation", async () => {
      mockUseApiClient.mockResolvedValue(userFixture.notCalibrated);

      const result = await performCreateUser(baseUrl, appId, createUserProps);

      expect(mockUseApiClient).toHaveBeenCalledWith(
        baseUrl,
        appId,
        ["/user/create/basic", "post"],
        expect.any(Function),
      );
      const propsFactory = mockUseApiClient.mock.calls[0][3];
      expect(propsFactory()).toEqual(createUserProps);

      expect(result).toEqual(userFixture.notCalibrated);
    });

    it("should return an error if name or password is not provided", async () => {
      const result = await performCreateUser(baseUrl, appId, {
        name: "",
        password: "",
        isAdmin: false,
      });
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Name and password are required");
    });

    it("should return an error if api client throws an error", async () => {
      const error = new Error("API Error");
      mockUseApiClient.mockRejectedValue(error);
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await performCreateUser(baseUrl, appId, createUserProps);

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("API Error");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Create user failed: API Error",
      );
    });
  });

  describe("performGoogleLogin", () => {
    const originalLocation = window.location;

    beforeEach(() => {
      // Mock window.location.href
      Object.defineProperty(window, "location", {
        value: {
          ...originalLocation,
          href: "",
          origin: "http://localhost:3000",
        },
        writable: true,
      });
    });

    afterEach(() => {
      // Restore original window.location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    });

    it("should redirect to the correct Google login URL", () => {
      performGoogleLogin(baseUrl, "/home");
      const expectedUrl = new URL(`${baseUrl}/user/login/google`);
      expectedUrl.searchParams.set("redirect_to", "http://localhost:3000/home");
      expect(window.location.href).toBe(expectedUrl.toString());
    });

    it("should use window.location.origin if baseUrl is a relative path", () => {
      performGoogleLogin("/api", "/dashboard");
      const expectedUrl = new URL(
        "http://localhost:3000/api/user/login/google",
      );
      expectedUrl.searchParams.set(
        "redirect_to",
        "http://localhost:3000/dashboard",
      );
      expect(window.location.href).toBe(expectedUrl.toString());
    });
  });

  describe("logout", () => {
    it("should call useApiClient for logout", async () => {
      mockUseApiClient.mockResolvedValue(null); // Simulate successful logout

      await logout(baseUrl, appId);

      expect(mockUseApiClient).toHaveBeenCalledWith(
        baseUrl,
        appId,
        ["/user/logout", "get"],
        expect.any(Function),
      );
    });

    it("should log an error if logout fails", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("Logout failed");
      mockUseApiClient.mockRejectedValue(error);

      await logout(baseUrl, appId);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Logout failed: ${error.message}`,
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
