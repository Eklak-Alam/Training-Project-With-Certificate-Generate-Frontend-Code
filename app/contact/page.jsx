'use client'
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check, User, Crown, Award, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
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
    else if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
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
    // Simulate form submission
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
      }, 3000);
    }, 1500);
  };

  const teamMembers = [
    {
      name: "Rai Singh Verma",
      position: "Chairman",
      company: "Balaji Group",
      icon: <Crown className="text-yellow-500" size={20} />,
      contacts: []
    },
    {
      name: "Suresh Kumar Mahawar",
      position: "Incharge",
      contacts: [
        { type: "phone", value: "9352793163", icon: <Phone size={16} /> },
        { type: "whatsapp", value: "9352793163", icon: <FaWhatsapp size={16} /> },
        { type: "email", value: "incharge.balajitraining@gmail.com", icon: <Mail size={16} /> }
      ]
    },
    {
      name: "Suresh Mandiya",
      position: "Project Manager/Coordinator",
      contacts: [
        { type: "phone", value: "9928552283", icon: <Phone size={16} /> },
        { type: "whatsapp", value: "9928552283", icon: <FaWhatsapp size={16} /> }
      ]
    },
    {
      name: "Yashwant Kumar Gupta",
      position: "Faculty (Full Time)",
      qualification: "ASSOCIATE (III)",
      icon: <GraduationCap className="text-purple-500" size={20} />,
      contacts: [
        { type: "phone", value: "9828223331", icon: <Phone size={16} /> }
      ]
    },
    {
      name: "Mamraj Choudhary",
      position: "Faculty (Full Time)",
      qualification: "LICENTIATE (III)",
      icon: <BookOpen className="text-green-600" size={20} />,
      contacts: [
        { type: "phone", value: "9887899081", icon: <Phone size={16} /> }
      ]
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

  const cardHover = {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Our Team</h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reach out to us for any questions, support, or partnership opportunities
          </p>
        </motion.div>

        {/* Contact Info and Form Section */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mb-20">
          {/* Contact Info Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardHover}
            className="lg:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Head Office Address</h3>
                  <p className="text-gray-600">
                    Balaji Shikshan Sansthan Samiti<br />
                    523 Mansarovar, Jaipur<br />
                    Rajasthan - 302020
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Phone Support</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <a href="tel:+919352793163" className="hover:text-blue-600 hover:underline">
                        +91 9352793163
                      </a>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaWhatsapp size={16} className="text-gray-500" />
                      <a 
                        href="https://wa.me/919928552283" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-green-600 hover:underline"
                      >
                        +91 9928552283 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Email Support</h3>
                  <a 
                    href="mailto:incharge.balajitraining@gmail.com" 
                    className="text-blue-600 hover:underline"
                  >
                    incharge.balajitraining@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardHover}
            className="lg:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  isSubmitting || isSuccess 
                    ? 'bg-green-600' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors shadow-md`}
                whileHover={!isSubmitting && !isSuccess ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting && !isSuccess ? { scale: 0.99 } : {}}
                disabled={isSubmitting || isSuccess}
              >
                {isSuccess ? (
                  <>
                    <Check size={18} />
                    Message Sent Successfully!
                  </>
                ) : isSubmitting ? (
                  'Sending Your Message...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-12"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Leadership Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect directly with our dedicated team members for specific inquiries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                variants={cardHover}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-full">
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
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">CONTACT DETAILS</h4>
                      <div className="space-y-3">
                        {member.contacts.map((contact, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-gray-500">
                              {contact.icon}
                            </span>
                            <span className="text-gray-700">
                              {contact.type === 'whatsapp' ? (
                                <a 
                                  href={`https://wa.me/91${contact.value}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-green-600 hover:underline flex items-center gap-1"
                                >
                                  {contact.value} <span className="text-xs text-gray-500">(WhatsApp)</span>
                                </a>
                              ) : contact.type === 'email' ? (
                                <a 
                                  href={`mailto:${contact.value}`}
                                  className="hover:text-blue-600 hover:underline"
                                >
                                  {contact.value}
                                </a>
                              ) : (
                                <a 
                                  href={`tel:${contact.value}`}
                                  className="hover:text-blue-600 hover:underline"
                                >
                                  +91 {contact.value}
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