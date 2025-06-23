'use client'
import { motion } from 'framer-motion';
import { Mail, MessageSquare, BookOpen, Users, Clock } from 'lucide-react';

const HelpPage = () => {
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

  const cardHover = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 pt-28">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Balaji Shikshan Sansthan Samiti Training Help Center</h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to the PRE-licensing course training platform. Here's everything you need to succeed.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Introduction Section */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                This study course is designed to assist individuals interested in the insurance profession in obtaining thorough knowledge of Balaji Shikshan Sansthan Samiti laws and rules, and an accurate understanding of insurance theory and practice in the area of Life and General insurance.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Balaji Shikshan Sansthan Samiti is committed to aiding Balaji Shikshan Sansthan Samiti in achieving these goals by working with individuals seeking training and education on insurance topics to achieve their personal objectives and to build a firm foundation of knowledge.
              </p>
            </div>
          </motion.section>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Instructor Communication */}
            <motion.div 
              variants={{ ...itemVariants, ...cardHover }}
              whileHover="hover"
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Instructor Communication</h3>
              </div>
              <p className="text-gray-600 mb-4">
                This course provides two ways to interact with instructors:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Mail className="text-blue-500 mt-1 mr-2" size={16} />
                  <span>Private email consultation</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="text-blue-500 mt-1 mr-2" size={16} />
                  <span>Live chat room (Weekdays 10am-5pm)</span>
                </li>
              </ul>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-blue-600 hover:underline text-sm font-medium">Email Instructor</a>
                <a href="#" className="text-blue-600 hover:underline text-sm font-medium">Join Chat</a>
              </div>
            </motion.div>

            {/* Study Materials */}
            <motion.div 
              variants={{ ...itemVariants, ...cardHover }}
              whileHover="hover"
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Study Materials</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our comprehensive materials include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Balaji Shikshan Sansthan Samiti syllabus-based content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Interactive case studies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Practical exercises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Q&A sections after each unit</span>
                </li>
              </ul>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:underline text-sm font-medium">View Sample Materials</a>
              </div>
            </motion.div>

            {/* Study Tips */}
            <motion.div 
              variants={{ ...itemVariants, ...cardHover }}
              whileHover="hover"
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Study Suggestions</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Maximize your learning with these tips:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Establish a regular study schedule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Morning study sessions are most effective</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Use a quiet, interruption-free space</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Test yourself with unit questions</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Additional Sections */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="text-blue-600 mr-3" size={28} />
              <h2 className="text-2xl font-semibold text-gray-800">Our Training Team</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our training team asks that you aid us in servicing your educational needs by providing feedback about the content and quality of our courses. Please use the course feedback form and email tools to share your thoughts.
              </p>
              <p className="text-gray-700">
                All our trainers have extensive insurance experience with practical market knowledge. <a href="#" className="text-blue-600 hover:underline">Learn more about our faculty</a>.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex items-center mb-6">
              <BookOpen className="text-blue-600 mr-3" size={28} />
              <h2 className="text-2xl font-semibold text-gray-800">Personal Dictionary Feature</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                You can select key terms and save them to your personal dictionary for future reference during the course. This helps build your insurance terminology knowledge as you progress through the material.
              </p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            variants={itemVariants}
            className="bg-blue-600 text-white p-8 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions about the training platform or course content.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#" 
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="#" 
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                FAQ Section
              </a>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;