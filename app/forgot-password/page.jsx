'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/context/api-context';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, User as UserIcon, Mail, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function PasswordResetPage() {
  const [step, setStep] = useState(1); // 1: verify, 2: reset
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { student } = useApi();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await student.verifyUserCredentials(formData.username, formData.email);
      setMessage('Verification successful! Please set your new password.');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Verification failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await student.updateUserPassword(formData.username, formData.newPassword);
      setMessage('Password updated successfully! Redirecting to login...');
      
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Head>
        <title>Reset Password | Your Application</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm relative"
          >
            <button 
              onClick={() => step === 1 ? router.push('/login') : setStep(1)}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <motion.div 
              variants={itemVariants}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  <Lock size={28} />
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {step === 1 ? 'Reset Password' : 'Set New Password'}
              </h1>
              <p className="text-gray-500">
                {step === 1 ? 'Enter your credentials to verify' : 'Create a new password'}
              </p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center"
                >
                  <AlertCircle className="mr-2" size={18} />
                  {error}
                </motion.div>
              )}
              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center"
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {step === 1 ? (
              <form onSubmit={handleVerify} className="space-y-5">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                      loading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Verifying...
                      </span>
                    ) : (
                      'Verify Account'
                    )}
                  </motion.button>
                </motion.div>
              </form>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter new password"
                      required
                      minLength={8}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                      loading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Updating...
                      </span>
                    ) : (
                      'Update Password'
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}