'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    // No dark mode logic anymore
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 pt-28">
        {/* Removed Theme Toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">Balaji Shikshan Sansthan Samiti</span>
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </motion.div>

          {/* Our Journey */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed mb-6"
              variants={fadeIn}
            >
              Icall Soft is a leading solution provider for Internet based applications. The Company has been promoted by some highly experienced Professionals dedicated to provide total IT solutions under one roof. It possesses not only the latest technology gadgets but also the most knowledgeable and experienced hands to offer most user friendly customized solutions.
            </motion.p>
          </motion.div>

          {/* Our Foundation */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Foundation
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed mb-6"
              variants={fadeIn}
            >
              Sansthan Samiti Soft established in year 2000 with its existence in I.T. Training, Software development, I.T. Enabled services with vast experience with the pioneer company and clients in India and abroad. Icall soft became Icall Soft Pvt. Ltd. in the year of 2002. Since its foundation it was engaged in imparting training in I.T for corporate clients.
            </motion.p>
          </motion.div>

          {/* Our Innovation */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our Innovation
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed mb-6"
              variants={fadeIn}
            >
              With the passage of time we identified new opportunities in the field of training, particularly the Pre-license training of insurance agents as per IRDA (Insurance Regulatory & Development Authority) regulations. Understanding the needs of E-learning, our organization entered into e-learning with{' '}
              <a href="https://www.icallinsurance.com" className="text-blue-600 hover:underline">
                https://balajitraining.in/
              </a>{' '}
              for insurance agents.
            </motion.p>
          </motion.div>

          {/* Our Impact */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Our Impact
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Our e-learning platform{' '}
              <a href="https://www.icallinsurance.com" className="text-blue-600 hover:underline">
                https://balajitraining.in/
              </a>{' '}
              enables insurance agents to complete their training without boundaries of time and location. This innovation has allowed us to serve thousands of insurance agents every year for major multinational insurance companies.
            </motion.p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-6 bg-blue-50 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Visit Our Training 
            </h3>
            <a
              href="https://balajitraining.in/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              https://balajitraining.in/
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
