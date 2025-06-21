'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, UserPlus, ChevronRight, Check, AlertCircle, FileArchive } from 'lucide-react';
import { useApi } from '@/context/api-context';
import BulkCertificateGenerator from '@/components/BulkCertificateGenerator';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden pt-10">
        {/* Header */}
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Student Management</h1>
          <p className="mt-1 text-blue-100">Manage student records and certificates</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setActiveTab('form'); clearMessages(); }}
            className={`flex items-center px-4 py-3 font-medium text-sm ${activeTab === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Form Entry
          </button>
          <button
            onClick={() => { setActiveTab('file'); clearMessages(); }}
            className={`flex items-center px-4 py-3 font-medium text-sm ${activeTab === 'file' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Upload className="mr-2 h-4 w-4" />
            File Upload
          </button>
          <button
            onClick={() => { setActiveTab('certificates'); clearMessages(); }}
            className={`flex items-center px-4 py-3 font-medium text-sm ${activeTab === 'certificates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FileArchive className="mr-2 h-4 w-4" />
            Bulk Certificates
          </button>
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
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'form' ? (
                <StudentForm 
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              ) : activeTab === 'file' ? (
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

          {/* Status Messages */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-start"
            >
              <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start"
            >
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
// Form Component
const StudentForm = ({ setSuccessMessage, setErrorMessage }) => {
  const [formData, setFormData] = useState({
    srNo: '',
    name: '',
    panNumber: '',
    licRegdNumber: '',
    branch: '',
    startDate: '',
    endDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createStudent } = useApi();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await createStudent(formData);
      setSuccessMessage('Student created successfully!');
      setFormData({
        srNo: '',
        name: '',
        panNumber: '',
        licRegdNumber: '',
        branch: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
          <input
            type="number"
            name="srNo"
            value={formData.srNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LIC Registration Number</label>
          <input
            type="text"
            name="licRegdNumber"
            value={formData.licRegdNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Create Student'}
          {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
        </button>
      </div>
    </form>
  );
};

// File Upload Component
const FileUpload = ({ setSuccessMessage, setErrorMessage }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadStudents } = useApi();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file first');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await uploadStudents(file);
      setSuccessMessage(`Successfully uploaded ${result.count} students!`);
      setFile(null);
      // Clear file input
      document.getElementById('file-upload').value = '';
    } catch (error) {
      setErrorMessage(error.message || 'Failed to upload students');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-2">
          <Upload className="h-10 w-10 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">
          Upload Excel (.xlsx) or CSV file with student data
        </p>
        <div className="mt-4">
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
            <span>{file ? 'Change File' : 'Select File'}</span>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {file && (
        <div>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Students'}
            {!isUploading && <ChevronRight className="ml-2 h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;