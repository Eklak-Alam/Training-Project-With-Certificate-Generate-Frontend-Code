'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaChalkboardTeacher, FaCertificate, FaSearch, FaArrowRight } from 'react-icons/fa';
import { ChevronDown, ChevronUp, Download, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    // const [showImageModal, setShowImageModal] = useState(false);


    const toggleAccordion = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };  

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
            >
              <span className="block">Balaji Shikshan</span>
              <span className="block text-yellow-300">Sansthan Samiti</span>
              <span className="block text-lg sm:text-xl font-normal mt-4 text-blue-100">
                Online Institute of India
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl mb-8 max-w-lg"
            >
              Balaji Shikshan Sansthan Samiti - Providing Pre-License Training courses in India
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/register" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center">
                Join Training <FaArrowRight className="ml-2" />
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white transition-colors">
                Submit Query
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex items-center"
            >
              {/* <div className="flex -space-x-2 mr-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
                ))}
              </div> */}
              <div>
                <div className="flex items-center text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-blue-100">4.8/5 rating on Google</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-80 md:h-96 lg:h-[500px]"
          >
            <img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_400/https://balajitraining.in/wp-content/uploads/2025/03/Untitled-design.png" // Replace with your actual hero image path
              alt="Insurance Training"
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empowering Insurance Professionals
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600">
                We strive to be a top training institute, dedicated to providing high-quality education and skill development in the insurance industry.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Expert-Led Insurance Training
              </h3>
              <p className="text-gray-600 mb-6">
                Join expert-led insurance training at Balaji Training. Get 25-hour and 15-hour pre-license and renewal training for Life, General, and Health Insurance to build a successful career.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Structured Pre-License and License Renewal Training Programs
                  </p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Mandatory 25-hour training programs
                  </p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Practical knowledge for success in the insurance market
                  </p>
                </div>
              </div>
              
              <Link href="/about" className="inline-flex items-center mt-8 text-blue-600 font-semibold hover:text-blue-800">
                Know more about us <FaArrowRight className="ml-2" />
              </Link>
            </div>
            
            <div className="relative h-80 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600/https://balajitraining.in/wp-content/uploads/2025/03/Untitled-design-4.png" // Replace with your about image
                alt="About Balaji Training"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Training Courses We Offer
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-blue-600 mb-4">
                <FaChalkboardTeacher className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pre-License Training</h3>
              <p className="text-gray-600 mb-4">
                25-hour comprehensive training program for new insurance agents
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Life Insurance</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">General Insurance</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Health Insurance</span>
                </li>
              </ul>
              <Link href="/courses" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Program 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-orange-500 mb-4">
                <FaCertificate className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Renewal Training</h3>
              <p className="text-gray-600 mb-4">
                25-hour renewal program for existing insurance professionals
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">License Renewal</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">CE Credits</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Regulatory Updates</span>
                </li>
              </ul>
              <Link href="/courses" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                Learn more <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Program 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-purple-600 mb-4">
                <FaSearch className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Certificate Verification</h3>
              <p className="text-gray-600 mb-4">
                Verify your Certificate if you have completed Insurance training with us
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Instant Verification</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Secure System</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Employer Access</span>
                </li>
              </ul>
              <Link href="/verification-certificate" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                Verify Now <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="my-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ACCREDITATION LETTER</h2>
          
          {/* Clickable text version */}
          {/* <div 
            className="flex items-center justify-center space-x-2 text-blue-600 cursor-pointer mb-4"
            onClick={() => setShowImageModal(true)}
          >
            <span className="font-medium hover:underline">Click to view accreditation letter</span>
            <Download size={18} />
          </div> */}
          
          {/* OR Accordion version */}
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={toggleAccordion}
              className="flex items-center justify-between w-full text-left text-gray-700 font-medium"
            >
              <span>View Accreditation Letter</span>
              {isAccordionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isAccordionOpen ? 'auto' : 0,
                opacity: isAccordionOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Image
                  src="/prove.jpg" // Replace with your image path
                  alt="Accreditation Letter"
                  width={800}
                  height={1000}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Image Modal */}
      {/* {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <div className="p-6">
              <Image
                src="/logo2.webp" // Replace with your image path
                alt="Accreditation Letter"
                width={1000}
                height={1400}
                className="w-full h-auto"
              />
              <div className="mt-4 flex justify-center">
                <a
                  href="/path-to-your-accreditation-letter-image.jpg"
                  download="accreditation-letter.jpg"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  <Download className="mr-2" size={18} />
                  Download Letter
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )} */}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Insurance Career?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our expert-led training programs and take the first step towards a successful career in insurance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-colors">
                Enroll Now
              </Link>
              <Link href="/contact" className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg border border-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_320/https://balajitraining.in/wp-content/uploads/2025/03/Balaji-Training.png" // Replace with your CTA image
              alt="Start Your Insurance Career"
              className="opacity-80 w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}