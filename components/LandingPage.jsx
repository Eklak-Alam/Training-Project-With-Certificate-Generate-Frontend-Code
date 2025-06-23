'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaClock, FaCertificate, FaUserTie, FaLaptop, FaShieldAlt, FaSearch, FaArrowRight } from 'react-icons/fa';
import AboutUs from './AboutUs';
import Link from 'next/link';

export default function Home() {
  // Animation controls for each section
  const controls = {
    header: useAnimation(),
    steps: useAnimation(),
    features: useAnimation(),
    cta: useAnimation()
  };

  // Intersection observers for each section
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [stepsRef, stepsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Animate when in view
  useEffect(() => {
    if (headerInView) controls.header.start("visible");
    if (stepsInView) controls.steps.start("visible");
    if (featuresInView) controls.features.start("visible");
    if (ctaInView) controls.cta.start("visible");
  }, [headerInView, stepsInView, featuresInView, ctaInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header Section */}
      <motion.header
        ref={headerRef}
        animate={controls.header}
        initial="hidden"
        variants={containerVariants}
        className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-24 pb-32 md:pt-32 md:pb-48 px-4 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')] bg-cover bg-center"
        />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block font-serif">Balaji Shikshan Sansthan Samiti</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-200">
              Life Insurance Training
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-3xl mx-auto"
          >
            We will provide Pre-License Training  courses in India, for more information contact with as or submit query.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center justify-center bg-black hover:bg-gray-100 text-white hover:text-gray-900 font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg transition-all duration-300"
            >
              <Link href='/register'>Join Training Now</Link>
              <FaArrowRight className="ml-2" />
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center justify-center bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full border-2 border-white transition-all duration-300"
            >
              <Link href='/about'>Learn More</Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={fadeInVariants}
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"
        />
      </motion.header>


      <AboutUs />

      
      {/* Steps Section */}
      <motion.section
        ref={stepsRef}
        animate={controls.steps}
        initial="hidden"
        variants={containerVariants}
        className="py-16 md:py-20 px-4 sm:px-6 bg-white"
        id="steps"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              How It Works
            </span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Get Certified in 3
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl border-t-4 border-blue-600 relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">Register</h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                Sign up for our Balaji Shikshan Sansthan Samiti life insurance training program
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl border-t-4 border-orange-500 relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-full opacity-20"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">Complete Training</h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                Complete 25 hours of comprehensive online training modules
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl border-t-4 border-green-500 relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">Get Certificate</h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                Receive your official Balaji Shikshan Sansthan Samiti approved certificate upon completion
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        animate={controls.features}
        initial="hidden"
        variants={containerVariants}
        className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100"
        id="features"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Benefits
            </span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Why Choose Our Training?
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Balaji Shikshan Sansthan Samiti Approved</h3>
              <p className="text-gray-600 text-sm sm:text-base flex-grow">
                Fully compliant with Balaji Shikshan Sansthan Samiti guidelines and regulations for agent certification
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="text-orange-500 mb-4 p-3 bg-orange-50 rounded-full w-12 h-12 flex items-center justify-center">
                <FaLaptop className="text-xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Online Flexibility</h3>
              <p className="text-gray-600 text-sm sm:text-base flex-grow">
                Study at your own pace from anywhere with 24/7 access to materials
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="text-purple-600 mb-4 p-3 bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center">
                <FaUserTie className="text-xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Expert Content</h3>
              <p className="text-gray-600 text-sm sm:text-base flex-grow">
                Comprehensive curriculum designed by industry experts with real-world insights
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="text-green-500 mb-4 p-3 bg-green-50 rounded-full w-12 h-12 flex items-center justify-center">
                <FaSearch className="text-xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Verification</h3>
              <p className="text-gray-600 text-sm sm:text-base flex-grow">
                Easy online certificate verification system for employers to validate
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        animate={controls.cta}
        initial="hidden"
        variants={containerVariants}
        className="relative py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-800 to-blue-600 text-white overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Start Your Insurance Career?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          >
            Join thousands of successful insurance agents who launched their careers with our training program.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href='/register'>Know more about us</Link>
              <FaArrowRight className="ml-2" />
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full border-2 border-white transition-all duration-300"
            >
              <Link href='/contact'>Contact Us</Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={fadeInVariants}
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"
        />
      </motion.section>
    </div>
  );
}