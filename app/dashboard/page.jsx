'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, BookOpen, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '@/context/api-context';

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

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { auth } = useApi();

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
    window.location.reload(); // Reloads the new /login page
  };

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
      </header>

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

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PDF_DOCUMENTS.map((pdf, index) => (
            <motion.div
              key={pdf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
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
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} StudyHub. All rights reserved.</p>
          <p className="mt-2">Premium study materials for insurance professionals</p>
        </div>
      </footer>
    </div>
  );
}