'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, HelpCircle, Phone, FileText } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
    { name: 'FAQs', path: '/faqs', icon: <FileText size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={20} /> },
    { name: 'LIC', path: '/lic', icon: <FileText size={20} /> },
  ];

  const menuVariants = {
    hidden: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  return (
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
            <a href="/" className="text-2xl lg:text-4xl font-bold text-gray-90">
              LIC
            </a>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  className="text-gray-800 hover:text-blue-600 transition-colors text-sm lg:text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-md text-gray-800 focus:outline-none relative z-50"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-xl"
              >
                <div className="flex flex-col h-full">
                  {/* Close Button Container */}
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-md text-gray-800 focus:outline-none"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Menu Links */}
                  <motion.div className="flex flex-col space-y-6 px-6 py-8 overflow-y-auto">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.path}
                        className="flex items-center space-x-3 text-gray-800 text-lg font-medium"
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </motion.a>
                    ))}
                  </motion.div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;