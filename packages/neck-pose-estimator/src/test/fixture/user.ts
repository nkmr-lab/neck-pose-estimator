import { components } from "../../types";

const calibrated: components["schemas"]["User"] = {
  id: 1,
  name: "Test User",
  password: "testpassword",
  token: "testtoken",
  email: null,
  iconUrl: null,
  standardPostureId: 1,
  isAdmin: false,
  createdAt: new Date("2025/07/26").toISOString(),
  updatedAt: new Date("2025/07/26").toISOString(),
};

const notCalibrated: components["schemas"]["User"] = {
  id: 2,
  name: "Uncalibrated User",
  password: "testpassword",
  email: null,
  iconUrl: null,
  token: "testtoken",
  standardPostureId: null,
  isAdmin: false,
  createdAt: new Date("2025/07/26").toISOString(),
  updatedAt: new Date("2025/07/26").toISOString(),
};

export const userFixture = {
  calibrated,
  notCalibrated,
} as const;
