import { describe, it, expect, vi, beforeEach } from "vitest";
import { performLogin, logout } from "../../utils";
import * as apiClient from "../../utils/api-client";
import { userFixture } from "../fixture/user";

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
        isAdmin: false,
      };
      mockUseApiClient.mockResolvedValue(userFixture.notCalibrated);

      const result = await performLogin(baseUrl, appId, loginProps);

      expect(mockUseApiClient).toHaveBeenCalledWith(
        baseUrl,
        appId,
        ["/user/auth/basic", "post"],
        expect.any(Function),
      );
      // Check if the function passed to useApiClient returns the correct props
      const propsFactory = mockUseApiClient.mock.calls[0][3];
      expect(propsFactory()).toEqual(loginProps);

      expect(result).toEqual(userFixture.notCalibrated);
    });

    it("should return null if name or password is not provided", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const result = await performLogin(baseUrl, appId, {
        name: "",
        password: "",
        isAdmin: false,
      });
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Name and password are required",
      );
      consoleErrorSpy.mockRestore();
    });

    it("should return null and log error if api client throws an error", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("API Error");
      mockUseApiClient.mockRejectedValue(error);

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
        isAdmin: false,
      });

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Login failed: ${error.message}`,
      );
      consoleErrorSpy.mockRestore();
    });

    it("should return null and log error if api client returns an Error instance", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("Invalid credentials");
      mockUseApiClient.mockResolvedValue(error);

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
        isAdmin: false,
      });

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Login failed: ${error.message}`,
      );
      consoleErrorSpy.mockRestore();
    });

    it("should return null and log error if api client returns null", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockUseApiClient.mockResolvedValue(null);

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
        isAdmin: false,
      });

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Login failed: API returned null",
      );
      consoleErrorSpy.mockRestore();
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
