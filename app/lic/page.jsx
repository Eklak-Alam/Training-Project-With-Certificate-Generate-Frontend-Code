'use client';
import CertificateTemplate from '@/components/CertificateTemplate';
import { useApi } from '@/context/api-context';
import { motion } from 'framer-motion';
import { Search, Download, FileText, Loader2, User, CalendarDays, BookOpen, Hash, Mail, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const LICVerificationPage = () => {
  const [panNumber, setPanNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const { getStudentByPan } = useApi();

  const handleVerify = async (e) => {
    e.preventDefault();
    
    // Clear previous states
    setError('');
    setStudentData(null);
    
    // Validation
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
      const data = await getStudentByPan(panNumber);
      
      if (!data) {
        throw new Error('No student found with this PAN number');
      }
      
      setStudentData(data);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 pt-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="text-blue-600 mr-2" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              LIC Training Certificate Verification
            </h1>
          </div>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of training certificates issued by iCall Soft Pvt. Ltd.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleVerify} className="mb-8">
              <div className="mb-6">
                <label htmlFor="panNumber" className="block text-lg font-medium text-gray-700 mb-2">
                  Enter PAN Number
                </label>
                <div className="relative">
                  <input
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
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center text-sm text-red-600"
                  >
                    <AlertCircle className="mr-2" size={16} />
                    {error}
                  </motion.div>
                )}
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2" size={20} />
                    Verify Certificate
                  </>
                )}
              </motion.button>
            </form>

            {studentData && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 rounded-xl overflow-hidden mb-8"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                    <div className="flex items-center">
                      <FileText className="mr-3" size={24} />
                      <h3 className="text-xl font-semibold">Certificate Details</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* ... (keep your existing student details display) ... */}
                  </div>
                </motion.div>

                {/* This is where the CertificateTemplate will appear */}
                <CertificateTemplate studentData={studentData} />
              </>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>For any verification issues, please contact our support team</p>
          <p className="mt-1">
            <Mail className="inline mr-1" size={14} /> support@icallinsurance.com | 
            <Phone className="inline mx-1" size={14} /> 9989650553
          </p>
        </div>
      </div>
    </div>
  );
};

export default LICVerificationPage;
