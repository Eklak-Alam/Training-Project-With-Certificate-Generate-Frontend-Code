'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, BookOpen, FileText, Download, User, CheckCircle, FileBadge, Loader2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '@/context/api-context';
import Link from 'next/link';

const PDF_DOCUMENTS = [
  {
    id: 1,
    title: 'Hindi IA Life',
    description: 'Comprehensive life insurance agent study material in Hindi',
    filePath: '/documents/Hindi-IA-Life.pdf',
    thumbnail: '/logo2.webp',
    pages: 54,
    category: 'Insurance'
  },
  {
    id: 2,
    title: 'IC38 New 2023',
    description: 'Updated IC38 exam preparation material in Hindi',
    filePath: '/documents/IC38-NEW-2023-HINDI.pdf',
    thumbnail: '/logo2.webp',
    pages: 105,
    category: 'Certification'
  },
  {
    id: 3,
    title: 'Study Material',
    description: 'Complete study guide for insurance professionals',
    filePath: '/documents/STUDYMATERIAL.pdf',
    thumbnail: '/logo2.webp',
    pages: 140,
    category: 'General'
  },
];

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
        >
          <div className="bg-white px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle size={24} />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [panNumber, setPanNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const router = useRouter();
  const { auth, student } = useApi();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
    window.location.reload();
  };

  const fetchStudentDetails = async () => {
    if (!panNumber) {
      setError('Please enter a valid PAN number');
      return;
    }

    try {
      setIsFetching(true);
      setError(null);
      const data = await student.getByPan(panNumber);
      setStudentData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student details');
      setStudentData(null);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDownloadCertificate = () => {
    setShowCertificateModal(true);
  };

  const downloadCertificate = () => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '/certificate.pdf'; // Replace with actual certificate URL
    link.download = `${studentData?.name || 'certificate'}-LIC-training-certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCertificateModal(false);
  };

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">
              Study<span className="text-blue-600">Hub</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              Welcome back, <span className="font-semibold">{userData.username}</span>
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-md"
              aria-label="Logout"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Study Materials</h2>
              <p className="opacity-90 max-w-2xl">
                Access premium study resources. Download what you need to excel in your exams.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FileText size={18} />
              <span>{PDF_DOCUMENTS.length} Resources Available</span>
            </div>
          </div>
        </motion.div>

        {/* Student Lookup Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 text-blue-600" size={20} />
            Student Training Verification
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Enter PAN Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="panNumber"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. ABCDE1234F"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                  maxLength={10}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchStudentDetails}
                  disabled={isFetching}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-medium disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {isFetching ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Checking...
                    </>
                  ) : (
                    'Verify'
                  )}
                </motion.button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <XCircle className="mr-1" size={16} />
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          {/* Student Details Card */}
          <AnimatePresence>
            {studentData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 overflow-hidden"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {studentData.name}'s Training Status
                    </h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">PAN Number:</p>
                        <p className="font-medium">{studentData.panNumber}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Course:</p>
                        <p className="font-medium">{studentData.course || 'Insurance Agent Training'}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Training Hours:</p>
                        <p className="font-medium">
                          <span className="text-green-600">25/25</span> hours completed
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Status:</p>
                        <p className="font-medium text-green-600 flex items-center">
                          <CheckCircle className="mr-1" size={16} />
                          Completed
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md flex items-center justify-center mx-auto"
                    >
                      <FileBadge className="mr-2" size={18} />
                      <Link href='/lic'>Get Your Certificate</Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Documents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PDF_DOCUMENTS.map((pdf, index) => (
            <motion.div
              key={pdf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={pdf.thumbnail}
                  alt={pdf.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 z-20 p-4">
                  <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md mb-2">
                    {pdf.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{pdf.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{pdf.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="mr-1" size={14} />
                    {pdf.pages} pages
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={pdf.filePath}
                    download={`${pdf.title.replace(/\s+/g, '_')}.pdf`}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-colors"
                  >
                    <Download className="mr-2" size={16} />
                    Download
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Resources</h3>
                <p className="text-2xl font-bold text-gray-900">{PDF_DOCUMENTS.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Pages</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {PDF_DOCUMENTS.reduce((sum, pdf) => sum + pdf.pages, 0)}
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <Download size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Downloads Available</h3>
                <p className="text-2xl font-bold text-gray-900">Unlimited</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      {/* <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-t mt-12 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} StudyHub. All rights reserved.</p>
          <p className="mt-2">Premium study materials for insurance professionals</p>
        </div>
      </motion.footer> */}

      {/* Certificate Modal */}
      {/* <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        title="Download Your Certificate"
      >
        <div className="text-center p-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.6 }}
          >
            <FileBadge className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Congratulations, {studentData?.name}!
          </h3>
          <p className="text-gray-600 mb-6">
            Your 25-hour training certificate is ready. This certificate has been
            verified and will also be sent to the LIC portal automatically.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md flex items-center justify-center"
              onClick={downloadCertificate}
            >
              <Download className="mr-2" size={18} />
              Download Certificate (PDF)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium"
              onClick={() => setShowCertificateModal(false)}
            >
              Close
            </motion.button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}