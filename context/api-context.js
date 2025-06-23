"use client";
import { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

  // Auth related functions
  const auth = {
    login: async (username, password) => {
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            role: data.role,
          })
        );
        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    getCurrentUser: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
      return !!localStorage.getItem("token");
    },

    isAdmin: () => {
      const user = auth.getCurrentUser();
      return user?.role === "ADMIN";
    },

    register: async (registrationData) => {
      try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        return await response.json();
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
  };

  // Student related functions
  const student = {
    getByPan: async (panNumber) => {
      try {
        const response = await fetch(`${BASE_URL}/student/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ panNumber }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch student");
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching student:", error);
        throw error;
      }
    },

    upload: async (file) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${BASE_URL}/admin/students/upload`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Important for cookies if using them
        });

        if (!response.ok) {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.message || "Upload failed");
          } catch {
            throw new Error(errorText || "Upload failed");
          }
        }

        return await response.json();
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error(
          error.message || "File upload failed. Please try again."
        );
      }
    },

    create: async (studentData) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch(`${BASE_URL}/admin/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.message || "Failed to create student");
          } catch {
            throw new Error(errorText || "Failed to create student");
          }
        }

        return await response.json();
      } catch (error) {
        console.error("Error creating student:", error);
        throw error;
      }
    },

    getAll: async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/students`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
      }
    },
  };

  // Admin related functions
  const admin = {
    promoteToAdmin: async (username) => {
      try {
        const response = await fetch(`${BASE_URL}/admin/promote/${username}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to promote user");
        }

        return await response.json();
      } catch (error) {
        console.error("Error promoting user:", error);
        throw error;
      }
    },
  };

  const value = {
    auth,
    student,
    admin,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
