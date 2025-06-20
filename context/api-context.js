'use client';
// lib/api-context.js
import { createContext, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

  // Fetch student by PAN (POST request with body)
  const getStudentByPan = async (panNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/student/details`, {
        method: 'POST',  // Changed to POST
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ panNumber }),  // PAN in request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch student');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  // Upload students via Excel/CSV file
  const uploadStudents = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BASE_URL}/admin/students/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload students');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading students:', error);
      throw error;
    }
  };

  // Create single student
  const createStudent = async (studentData) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create student');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  };

  // Get all students
  const getAllStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/students`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };

  const value = {
    getStudentByPan,
    uploadStudents,
    createStudent,
    getAllStudents,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
