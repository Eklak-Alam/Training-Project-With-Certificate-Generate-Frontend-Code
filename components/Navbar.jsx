'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, HelpCircle, Phone, FileText, LogIn, UserPlus, LogOut, User, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useApi } from '@/context/api-context';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
    setUserData(auth.getCurrentUser());
  }, [auth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
      
      // Clear local state
      setIsLoggedIn(false);
      setUserData(null);
      setIsOpen(false);
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error if needed
    }
  };

  const getDashboardPath = () => {
    if (!isLoggedIn) return '/login';
    return userData?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Courses', path: '/courses', icon: <FileText size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
    { name: 'FAQs', path: '/faqs', icon: <FileText size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={20} /> },
    { name: 'LIC', path: '/lic', icon: <FileText size={20} /> },
    ...(isLoggedIn ? [
      { 
        name: 'Dashboard', 
        path: getDashboardPath(), 
        icon: <BarChart2 size={20} /> 
      }
    ] : [])
  ];

  const menuVariants = {
    hidden: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 25,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 25,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 text-gray-900">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="/" className="text-2xl lg:text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                <img className='h-14' src="/logo2.webp" alt="" />
              </Link>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.path}
                      className="text-gray-800 hover:text-blue-600 transition-colors text-sm lg:text-lg font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{userData?.username}</span>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <LogIn size={18} />
                        Login
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/register"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <UserPlus size={18} />
                        Register
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-md text-gray-800 focus:outline-none relative z-[60]"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X size={24} className="text-gray-800" />
                ) : (
                  <Menu size={24} className="text-gray-800" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Close Button Container */}
                <div className="flex justify-end p-4">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md text-gray-800 focus:outline-none"
                    aria-label="Close menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Menu Links */}
                <motion.div className="flex flex-col space-y-4 px-6 py-8 overflow-y-auto">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.path}
                        className="flex items-center space-x-3 text-gray-800 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-blue-600">{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Auth Buttons - Mobile */}
                  <motion.div
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navLinks.length}
                    className="flex flex-col gap-4 pt-4"
                  >
                    {isLoggedIn ? (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100"
                        >
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{userData?.username}</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={getDashboardPath()}
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <BarChart2 size={20} />
                            Dashboard
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <LogOut size={20} />
                          Logout
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 text-lg font-medium text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <LogIn size={20} />
                            Login
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href="/register"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <UserPlus size={20} />
                            Register
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;