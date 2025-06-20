'use client';
// pages/index.tsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaClock, FaCertificate, FaUserTie, FaLaptop, FaShieldAlt, FaSearch } from 'react-icons/fa';

export default function Home() {
  // Animation controls for each section
  const controls = {
    header: useAnimation(),
    steps: useAnimation(),
    features: useAnimation(),
    cta: useAnimation()
  };

  // Intersection observers for each section
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [stepsRef, stepsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

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
        staggerChildren: 0.3,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.header
        ref={headerRef}
        animate={controls.header}
        initial="hidden"
        variants={containerVariants}
        className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-32 pb-48 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
          >
            IRDAI Approved Online Life Insurance Training
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl font-light mb-10"
          >
            Get certified as a life insurance agent with our comprehensive training program
          </motion.p>
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            href="#register"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            Join Training Now
          </motion.a>
        </div>
      </motion.header>

      {/* Steps Section */}
      <motion.section
        ref={stepsRef}
        animate={controls.steps}
        initial="hidden"
        variants={containerVariants}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-serif font-bold text-center text-gray-900 mb-16"
          >
            Get Certified in 3 Simple Steps
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h3>
              <p className="text-gray-600 text-center">
                Sign up for our IRDAI approved life insurance training program
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-full opacity-20"></div>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Complete Training</h3>
              <p className="text-gray-600 text-center">
                Complete 25 hours of comprehensive online training modules
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Get Certificate</h3>
              <p className="text-gray-600 text-center">
                Receive your official IRDAI approved certificate upon completion
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
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-serif font-bold text-center text-gray-900 mb-16"
          >
            Why Choose Our Training?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="text-blue-600 mb-4">
                <FaShieldAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">IRDAI Approved</h3>
              <p className="text-gray-600">
                Fully compliant with IRDAI guidelines and regulations
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="text-orange-500 mb-4">
                <FaLaptop className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Online Flexibility</h3>
              <p className="text-gray-600">
                Study at your own pace from anywhere
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="text-purple-600 mb-4">
                <FaUserTie className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Content</h3>
              <p className="text-gray-600">
                Comprehensive curriculum designed by industry experts
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="text-green-500 mb-4">
                <FaSearch className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Certificate Verification</h3>
              <p className="text-gray-600">
                Easy online certificate verification system
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
        className="relative py-24 px-4 bg-gradient-to-br from-blue-800 to-blue-600 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-serif font-bold mb-6"
          >
            Ready to Start?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-10 max-w-2xl mx-auto"
          >
            Join thousands of successful insurance agents who have completed our training program.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#register"
              className="inline-block bg-white text-blue-700 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Training Details
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}