import { describe, it, expect, vi, beforeEach } from "vitest";
import { performLogin, logout } from "../../utils/basicLogin";
import * as apiClient from "../../utils/api-client";
import { userFixture } from "../fixture/user";
import { performCreateUser } from "../../utils/basicLogin";
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

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
      });

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("API Error");
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

      const result = await performLogin(baseUrl, appId, {
        name: "user",
        password: "pass",
      });

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).status).toBe(401);
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

      const result = await performCreateUser(baseUrl, appId, createUserProps);

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("API Error");
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
