'use client'
import { motion } from 'framer-motion';
import { ChevronDown, Smartphone, Clock, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the maximum training hours per day?",
      answer: "Maximum Training for a day is 8 Hrs.",
      icon: <Clock size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "What happens to the extra time which I would have spent during the day?",
      answer: "You will be logged out of the training session once you spend the maximum hours per day.",
      icon: <Clock size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "How do I know that I have completed the training hours?",
      answer: 'You can check through "Know your Time Spent" link after you are logged in.',
      icon: <Clock size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "What is the maximum duration of training?",
      answer: (
        <>
          <p className="mb-2"><strong>For Renewal Life and Renewal General:</strong></p>
          <p>Min 4 days</p>
          <p>Max 7 days</p>
          <p className="mt-2"><strong>For Life 25 Hrs and General 25 Hrs:</strong></p>
          <p>Min 4 days</p>
          <p>Max 7 days</p>
        </>
      ),
      icon: <Clock size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "Does the web site works on all type of browsers?",
      answer: "Yes. The application works on all Browsers including SMARTPHONES and TABLETS.",
      icon: <Smartphone size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "How do I get the user ID and Passwords?",
      answer: "Once your ID is registered, you will receive your Login Credentials to your registered Email address and also an SMS to your registered mobile number.",
      icon: <Mail size={18} className="mr-2 text-blue-600" />
    },
    {
      question: "How do I get the new password once my login page expired?",
      answer: "You will receive new password on to your registered mobile Number given at the time of registration.",
      icon: <Lock size={18} className="mr-2 text-blue-600" />
    }
  ];

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

  const answerVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      marginTop: "0.5rem",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our online training platform
          </p>
        </motion.div>

        {/* Technical FAQs Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
              Technical FAQs
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  whileHover={{ y: -2 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center">
                      {faq.icon}
                      <span className="font-medium text-gray-800">{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-gray-500" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial="closed"
                    animate={activeIndex === index ? "open" : "closed"}
                    variants={answerVariants}
                    className="px-6 pb-6 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support CTA */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-600 text-white p-8 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our support team is ready to help you with any additional questions you may have.
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
                Live Chat
              </a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default FAQPage;