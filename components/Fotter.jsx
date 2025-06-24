'use client'
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, url: "#", name: "Facebook" },
    { icon: <Twitter size={18} />, url: "#", name: "Twitter" },
    { icon: <Instagram size={18} />, url: "#", name: "Instagram" },
    { icon: <Linkedin size={18} />, url: "#", name: "LinkedIn" },
    { icon: <Youtube size={18} />, url: "#", name: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "LIC Certificate", url: "/lic" },
    { name: "Help Center", url: "/help" },
    { name: "Contact Us", url: "/contact" },
  ];

  const trainingLinks = [
    { name: "Courses", url: "/courses" },
    { name: "FAQs", url: "/faqs" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Cookie Policy", url: "#" },
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

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Balaji Insurance Training & Online Solutions</h3>
            <p className="mb-6">
              We will provide Pre-License Training courses in India, for more information contact with as or submit quary.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={link.url} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Training Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Training</h3>
            <ul className="space-y-2">
              {trainingLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.url} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3">
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-start"
              >
                <MapPin className="text-blue-400 mt-1 mr-3" size={18} />
                <div>
                  <p>523 mansarovar Jaipur rajasthan 302020</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center"
              >
                <Phone className="text-blue-400 mr-3" size={18} />
                <div>
                  <p>Mobile: +91 9352793163</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center"
              >
                <Mail className="text-blue-400 mr-3" size={18} />
                <a href="mailto:info@icallinsurance.com" className="hover:text-white">
                  incharge.balajitraining@gmail.com
                </a>
              </motion.div>
            </address>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.hr 
          className="border-gray-700 my-8"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <img 
              src="/logo2.webp" 
              alt="LIC Approved Training" 
              className="h-16 mr-4 object-contain"
            />
            <a 
              href="https://www.icallinsurance.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              https://balajitraining.in/
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm">
            <div className="flex gap-4">
              {legalLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Balaji Insurance Training Soft Pvt Ltd. All rights reserved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;