'use client'
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check, User, Crown, Award, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  // Form state and handlers
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setFormData({
          name: '',
          mobile: '',
          email: '',
          message: ''
        });
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Team data
  const teamMembers = [
    {
      name: "Rai Singh Verma",
      position: "Chairman",
      company: "Balaji Group",
      icon: <Crown className="text-yellow-500" size={20} />,
      contacts: []
    },
    {
      name: "Rekha Kohli",
      position: "Incharge",
      contacts: [
        { type: "phone", value: "9352793163", icon: <Phone className="text-blue-500" size={16} /> },
        { type: "whatsapp", value: "9352793163", icon: <FaWhatsapp className="text-green-500" size={16} /> },
        { type: "email", value: "incharge.balajitraining@gmail.com", icon: <Mail className="text-red-500" size={16} /> }
      ]
    },
    {
      name: "Suresh Mandiya",
      position: "Project Manager/Coordinator",
      contacts: [
        { type: "phone", value: "9928552283", icon: <Phone className="text-blue-500" size={16} /> },
        { type: "whatsapp", value: "9928552283", icon: <FaWhatsapp className="text-green-500" size={16} /> }
      ]
    },
    {
      name: "Yashwant Kumar Gupta",
      position: "Faculty (Full Time)",
      qualification: "ASSOCIATE (III)",
      icon: <GraduationCap className="text-purple-500" size={20} />,
      contacts: []
    },
    {
      name: "Mamraj Choudhary",
      position: "Faculty (Full Time)",
      qualification: "LICENTIATE (III)",
      icon: <BookOpen className="text-green-600" size={20} />,
      contacts: []
    }
  ];

  // Animation variants
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
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 pt-28">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">We are Happy to Help You</h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for any questions or support
          </p>
        </motion.div>

        {/* Contact Info and Form Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Info Card */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 bg-white p-8 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Call Support</h2>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                    Balaji Shikshan Sansthan Samiti<br />
                    523 mansarovar Jaipur rajasthan 302020
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Phone className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    Mobile: +91 9352793163
                  </p>
                  <p className="text-gray-600">
                    WhatsApp: +91 9928552283
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Email</h3>
                  <a href="mailto:incharge.balajitraining@gmail.com" className="text-blue-600 hover:underline">
                    incharge.balajitraining@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 bg-white p-8 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your Mobile"
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your Email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center ${isSubmitting || isSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                whileHover={!isSubmitting && !isSuccess ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                disabled={isSubmitting || isSuccess}
              >
                {isSuccess ? (
                  <>
                    <Check className="mr-2" size={20} />
                    Thank you! We'll contact you soon
                  </>
                ) : isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Meet the dedicated professionals who make Balaji Shikshan Sansthan exceptional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-full mr-4">
                      {member.icon || <User className="text-blue-500" size={20} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.position}</p>
                      {member.qualification && (
                        <p className="text-sm text-gray-500 mt-1">{member.qualification}</p>
                      )}
                      {member.company && (
                        <p className="text-sm text-gray-700 mt-1">{member.company}</p>
                      )}
                    </div>
                  </div>

                  {member.contacts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">CONTACT</h4>
                      <div className="space-y-3">
                        {member.contacts.map((contact, i) => (
                          <div key={i} className="flex items-center">
                            <span className="mr-2">{contact.icon}</span>
                            <span className="text-gray-700">
                              {contact.type === 'whatsapp' ? (
                                <a 
                                  href={`https://wa.me/91${contact.value}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-green-600 hover:underline"
                                >
                                  {contact.value}
                                </a>
                              ) : contact.type === 'email' ? (
                                <a 
                                  href={`mailto:${contact.value}`}
                                  className="hover:text-red-600 hover:underline"
                                >
                                  {contact.value}
                                </a>
                              ) : (
                                <a 
                                  href={`tel:${contact.value}`}
                                  className="hover:text-blue-600 hover:underline"
                                >
                                  {contact.value}
                                </a>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactPage;
