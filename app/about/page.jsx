'use client';
import { motion } from 'framer-motion';
import { Book, GraduationCap, Users, Shield } from 'lucide-react';

const AboutPage = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 pt-28 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={container}
          className="text-center mb-16"
        >
          <motion.div variants={item} className="flex justify-center mb-4">
            <Book className="w-10 h-10 text-blue-600" />
          </motion.div>
          <motion.h1 variants={item} className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            About Balaji Shikshan Sansthan Samiti
          </motion.h1>
          <motion.div variants={item} className="w-20 h-1 bg-blue-600 mx-auto mb-6"></motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={container}>
          {/* Organization Info */}
          <motion.div variants={item} className="mb-12">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Our Organization
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              BALAJI SIKSHAN SANSTHAN SAMITI is a non-profit voluntary organization established in 2009 and registered under Rajasthan Societies Registration Act, 1958 in Shri Ganganagar (Raj). Now operating in Rajasthan, MP, Gujarat and Punjab with programs in Education, Skill Development, Livelihood and Environment.
            </motion.p>
          </motion.div>

          {/* Focus Area */}
          <motion.div variants={item} className="mb-12">
            <motion.p 
              className="text-gray-600 leading-relaxed mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              We focus on disadvantaged youth, addressing unemployment and education issues in north India through meaningful innovation for sustainable skill development.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Currently working on projects under Skill Development programs like ELSTP, RSTP, DDU-GKY, MMYKY, RPL, CSSM-PMKVY, KALI BAI, I AM SHAKTI, JJM-WSSO, RKCL & TSSC with 47,000+ students trained.
            </motion.p>
          </motion.div>

          {/* Insurance Training */}
          <motion.div variants={item} className="mb-12">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Insurance Training
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              We are a leading training institute providing high-quality education in the insurance industry. Our structured Pre-License (25-hour) and License Renewal (15-hour) Training Programs help professionals gain expertise in Life, General, and Health Insurance. We equip professionals with practical knowledge for success in India's dynamic insurance market.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={item}
            className="mt-16 bg-blue-50 p-6 rounded-lg text-center"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Join Our Training Programs
            </h3>
            <a
              href="https://balajitraining.in/"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Visit balajitraining.in
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;