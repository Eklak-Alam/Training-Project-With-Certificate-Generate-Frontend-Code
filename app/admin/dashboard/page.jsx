"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  UserPlus,
  ChevronRight,
  Check,
  AlertCircle,
  FileArchive,
  Loader2,
  LogOut,
  User,
  FileText,
  FileInput,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BulkCertificateGenerator from "@/components/BulkCertificateGenerator";
import { useApi } from "@/context/api-context";

const Page = () => {
  const { auth } = useApi();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("students"); // Default to students tab
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!auth.getCurrentUser() || !auth.isAdmin()) {
      router.push("/login");
    } else {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [auth, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuth = () => {
        setIsLoading(true);
        const user = auth.getCurrentUser();
        if (!user || !auth.isAdmin()) {
          router.push("/login");
        } else {
          setUserData(user);
        }
        setIsLoading(false);
      };
      checkAuth();
    }
  }, [auth, router]);

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  if (!auth.getCurrentUser() || !auth.isAdmin() || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-blue-600"
        >
          <Loader2 className="h-12 w-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden pt-14"
      >
        {/* Enhanced Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <User className="h-8 w-8 text-blue-200" />
                Admin Dashboard
              </h1>
              <p className="mt-1 text-blue-100 flex items-center gap-1">
                Welcome back,{" "}
                <span className="font-medium">
                  {auth.getCurrentUser().username}
                </span>
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  await auth.logout();
                  router.push("/login");
                  window.location.reload(); // Reloads the new /login page
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
              className="flex items-center text-black gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all border border-white border-opacity-30"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          {[
            { id: "students", icon: User, label: "Students" },
            { id: "form", icon: UserPlus, label: "Form Entry" },
            { id: "file", icon: Upload, label: "File Upload" },
            { id: "certificates", icon: FileText, label: "Certificates" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(tab.id);
                clearMessages();
              }}
              className={`flex-1 min-w-fit flex items-center justify-center px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {activeTab === "students" ? (
                <StudentsList
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              ) : activeTab === "form" ? (
                <StudentForm
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              ) : activeTab === "file" ? (
                <FileUpload
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              ) : (
                <BulkCertificateGenerator
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Status Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="bg-green-100 p-1 rounded-full"
                >
                  <Check className="h-5 w-5 text-green-600" />
                </motion.div>
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm">{successMessage}</p>
                </div>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="bg-red-100 p-1 rounded-full"
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </motion.div>
                <div>
                  <p className="font-medium">Error occurred</p>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// New Students List Component
const StudentsList = ({ setSuccessMessage, setErrorMessage }) => {
  const { student } = useApi();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    srNo: "",
    name: "",
    panNumber: "",
    licRegdNumber: "",
    branch: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await student.getAll();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch students");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (panNumber) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await student.delete(panNumber);
        setStudents(students.filter((s) => s.panNumber !== panNumber));
        setSuccessMessage("Student deleted successfully");
      } catch (error) {
        setErrorMessage("Failed to delete student");
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.panNumber);
    setEditFormData({
      srNo: student.srNo,
      name: student.name,
      panNumber: student.panNumber,
      licRegdNumber: student.licRegdNumber,
      branch: student.branch,
      startDate: student.startDate.split("T")[0],
      endDate: student.endDate.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login again");
      }

      const updatedStudent = await student.update(editingStudent, editFormData);

      setStudents(
        students.map((s) =>
          s.panNumber === editingStudent ? updatedStudent : s
        )
      );
      setEditingStudent(null);
      setSuccessMessage("Student updated successfully");
    } catch (error) {
      console.error("Update failed:", error);

      // Handle specific error cases
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("token")
      ) {
        setErrorMessage("Session expired. Please login again.");
        // Optional: redirect to login
        // window.location.href = "/login";
      } else {
        setErrorMessage(error.message || "Failed to update student");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.srNo.toString().includes(searchTerm) ||
      student.panNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.licRegdNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {currentStudents.length} of {filteredStudents.length} students
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Sr No",
                "Name",
                "PAN",
                "LIC Regd No",
                "Branch",
                "Start Date",
                "End Date",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <React.Fragment key={student.panNumber}>
                  {/* Normal View Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.srNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.panNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.licRegdNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(student.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(student.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        disabled={editingStudent !== null}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.panNumber)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        disabled={editingStudent !== null}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Edit Form Row - appears below when editing */}
                  {editingStudent === student.panNumber && (
                    <tr className="bg-blue-50">
                      <td colSpan="8" className="px-6 py-4">
                        <form
                          onSubmit={handleEditSubmit}
                          className="bg-white p-4 rounded-lg shadow border border-gray-200"
                        >
                          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <Edit className="h-5 w-5 text-blue-600" />
                            Edit Student
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Sr No
                              </label>
                              <input
                                type="number"
                                name="srNo"
                                value={editFormData.srNo}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                PAN Number
                              </label>
                              <input
                                type="text"
                                name="panNumber"
                                value={editFormData.panNumber}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                LIC Regd No
                              </label>
                              <input
                                type="text"
                                name="licRegdNumber"
                                value={editFormData.licRegdNumber}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Branch
                              </label>
                              <input
                                type="text"
                                name="branch"
                                value={editFormData.branch}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Start Date
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                value={editFormData.startDate}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                End Date
                              </label>
                              <input
                                type="date"
                                name="endDate"
                                value={editFormData.endDate}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={isSubmitting}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                "Save Changes"
                              )}
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Form Component
const StudentForm = ({ setSuccessMessage, setErrorMessage }) => {
  const [formData, setFormData] = useState({
    srNo: "",
    name: "",
    panNumber: "",
    licRegdNumber: "",
    branch: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { student } = useApi();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await student.create(formData);
      setSuccessMessage("Student created successfully!");
      setFormData({
        srNo: "",
        name: "",
        panNumber: "",
        licRegdNumber: "",
        branch: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Failed to create student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * Object.keys(formData).indexOf(key),
            }}
            className="space-y-1"
          >
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type={
                key.includes("Date")
                  ? "date"
                  : key === "srNo"
                  ? "number"
                  : "text"
              }
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={
            !isSubmitting
              ? { scale: 1.02, boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)" }
              : {}
          }
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Create Student
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
};

// Enhanced File Upload Component
const FileUpload = ({ setSuccessMessage, setErrorMessage }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { student } = useApi();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file first");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await student.upload(file);
      setSuccessMessage(`Successfully uploaded ${result.count} students!`);
      setFile(null);
      document.getElementById("file-upload").value = "";
    } catch (error) {
      setErrorMessage(error.message || "Failed to upload students");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50 shadow-inner"
            : "border-gray-300 hover:border-blue-400 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.div
          animate={{
            y: isDragging ? [0, -5, 0] : [0, -3, 0],
            scale: isDragging ? [1, 1.05, 1] : [1, 1.02, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: isDragging ? 1.5 : 3,
            ease: "easeInOut",
          }}
          className="flex justify-center mb-4"
        >
          <FileInput
            className={`h-12 w-12 ${
              isDragging ? "text-blue-600" : "text-gray-400"
            }`}
          />
        </motion.div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          {isDragging ? "Drop your file here" : "Drag & drop your file here"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Supported formats: .xlsx, .csv (Max 10MB)
        </p>
        <label className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-all shadow-md">
          <span>{file ? "Change File" : "Select File"}</span>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
          />
        </label>
      </motion.div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileArchive className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 truncate max-w-[180px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleUpload}
              disabled={isUploading}
              whileHover={
                !isUploading
                  ? {
                      scale: 1.05,
                      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.2)",
                    }
                  : {}
              }
              whileTap={!isUploading ? { scale: 0.95 } : {}}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-md"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Upload Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
