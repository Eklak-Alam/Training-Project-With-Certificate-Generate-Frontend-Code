'use client'
import { motion } from 'framer-motion'
import { FaUserTie, FaClock, FaCertificate, FaArrowRight } from 'react-icons/fa'


const CoursesPage = () => {
  const courses = [
    {
      title: "Pre-License Training - General Insurance (25 hrs)",
      description: "25 Hrs Training Programme is a mandatory Pre-Licensing training programme for those seeking license for the first time. Covers different aspects of General Insurance & the business as a whole.",
      icon: <FaUserTie className="text-blue-600 text-2xl" />,
      type: "pre-license",
      category: "general"
    },
    {
      title: "Pre-License Training - Life Insurance (25 hrs)",
      description: "Mandatory training for first-time license seekers. Provides full exposure to Life Insurance concepts and business practices.",
      icon: <FaUserTie className="text-blue-600 text-2xl" />,
      type: "pre-license",
      category: "life"
    },
    {
      title: "License Renewal - Life Insurance (25 hrs)",
      description: "Required every 3 years to continue working as an agent. Completion makes you eligible for license renewal for another 3 years.",
      icon: <FaCertificate className="text-green-600 text-2xl" />,
      type: "renewal",
      category: "life"
    },
    {
      title: "Pre-License Training - Health Insurance (25 hrs)",
      description: "Mandatory training covering all aspects of Health Insurance for first-time license seekers.",
      icon: <FaUserTie className="text-blue-600 text-2xl" />,
      type: "pre-license",
      category: "health"
    },
    {
      title: "POSP Training 25 hrs)",
      description: "Provides basic knowledge of Life, General and Health insurance to work as an insurance sales person.",
      icon: <FaClock className="text-purple-600 text-2xl" />,
      type: "posp",
      category: "all"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-36">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Insurance Training Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive training programs for insurance professionals at all career stages
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gray-100 mr-4">
                    {course.icon}
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    course.type === 'pre-license' 
                      ? 'bg-blue-100 text-blue-800' 
                      : course.type === 'renewal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                  }`}>
                    {course.type === 'pre-license' ? 'New License' : 
                     course.type === 'renewal' ? 'Renewal' : 'POSP'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1" />
                    {course.title.includes('15') ? '15 hours' : '25 hours'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to start your insurance career?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our expert-led training programs will prepare you for success in the insurance industry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Contact Advisor <FaArrowRight className="ml-2" />
              </button>
              <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CoursesPage
