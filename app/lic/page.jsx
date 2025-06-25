'use client';
import CertificateTemplate from '@/components/CertificateTemplate';
import { useApi } from '@/context/api-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, FileText, Loader2, User, CalendarDays, BookOpen, Hash, Mail, Phone, ShieldCheck, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const LICVerificationPage = () => {
  const [panNumber, setPanNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('search'); // 'search' or 'dashboard'
  const { student } = useApi();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setStudentData(null);
    
    if (!panNumber.trim()) {
      setError('Please enter PAN Number');
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      setError('Please enter a valid PAN Number (format: ABCDE1234F)');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await student.getByPan(panNumber);
      if (!data) throw new Error('No student found with this PAN number');
      setStudentData(data);
      setViewMode('dashboard');
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setViewMode('search');
    setPanNumber('');
    setStudentData(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 pt-28">
      <div className="container mx-auto px-4">
        {viewMode === 'search' ? (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-center mb-4">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                >
                  <ShieldCheck className="text-blue-600 mr-2" size={32} />
                </motion.div>
                <motion.h1 
                  className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                  variants={itemVariants}
                >
                  LIC Training Certificate Verification
                </motion.h1>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-6 rounded-full"
              />

              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Verify the authenticity of training certificates issued by Balaji Shikshan Sansthan Samiti.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm"
            >
              <div className="p-8">
                <motion.form 
                  onSubmit={handleVerify} 
                  className="mb-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-6">
                    <label htmlFor="panNumber" className="block text-lg font-medium text-gray-700 mb-2">
                      Enter PAN Number
                    </label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        id="panNumber"
                        value={panNumber}
                        onChange={(e) => {
                          setPanNumber(e.target.value.toUpperCase());
                          setError('');
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-lg ${
                          error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. ABCDE1234F"
                        maxLength="10"
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 flex items-center text-sm text-red-600"
                        >
                          <AlertCircle className="mr-2" size={16} />
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-all ${
                      isLoading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isLoading ? { 
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
                    } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    disabled={isLoading}
                    variants={itemVariants}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Loader2 className="mr-2" size={20} />
                        </motion.div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2" size={20} />
                        Verify Certificate
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <motion.button
              onClick={resetSearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center text-blue-600 mb-6"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Search
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Student Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{studentData?.name}</h2>
                      <p className="text-blue-100">LIC Certified Agent</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                        <Hash className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">PAN Number</p>
                        <p className="font-medium">{studentData?.panNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Course</p>
                        <p className="font-medium">LIC Agent Training Program</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Completion Date</p>
                        <p className="font-medium">{studentData?.endDate || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full cursor-pointer py-2.5 px-4 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"
                      >
                        <Download className="mr-2" size={18} />
                        Download Certificate
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Certificate Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-[52rem]">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                    <div className="flex items-center">
                      <FileText className="mr-3" size={24} />
                      <h3 className="text-xl font-semibold">Certificate Preview</h3>
                    </div>
                  </div>
                  <div className="p-2">
                    <CertificateTemplate studentData={studentData} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>For any verification issues, please contact our support team</p>
          <motion.p 
            className="mt-1"
            whileHover={{ scale: 1.02 }}
          >
            <Mail className="inline mr-1" size={14} /> incharge.balajitraining@gmail.com | 
            <Phone className="inline mx-1" size={14} /> +91 9352793163
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LICVerificationPage;