import type {
    LoginRequest,
    LoginResponse
} from "../types/auth.ts";

import {
    apiAuthLogin

} from "../config.ts";
import { apiFetch } from "../apiClient.ts";


/**
 * Handles authentication: login, refresh, logout.
 */
export const authService = {
  /**
   * Perform login and store tokens.
   */
  async login({ user, password }: LoginRequest): Promise<LoginResponse> {
    const response = await apiFetch<LoginResponse>(apiAuthLogin, {
      method: "POST",
      auth: false,
      body: JSON.stringify({ user, password }),
    });

    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    return response;
  },

  /**
   * Try to refresh access token using stored refresh_token.
   */
  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
      const response = await apiFetch<LoginResponse>(apiAuthLogin, {
        method: "POST",
        auth: false,
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }

      return response.access_token;
    } catch (err) {
      console.warn("[Auth Refresh Failed]", err);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};