// components/AboutUs.tsx
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              About us{" "}
              <span className="block text-blue-600 mt-2 text-2xl md:text-3xl lg:text-4xl">
                Empowering Insurance Professionals with Expert Training & Skill
                Development
              </span>
            </h2>

            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              We strive to be a top training institute, dedicated to providing
              high-quality education and skill development in the insurance
              industry. Our structured Pre-License and License Renewal Training
              Programs help aspiring and existing professionals build expertise
              in Life, General, and Health Insurance.
            </p>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              With our mandatory 25-hour and 15-hour training programs, we
              prepare individuals for licensing and career growth in the
              insurance sector. Our goal is to equip professionals with
              practical knowledge, ensuring their success in the ever-evolving
              insurance market in India and beyond.
            </p>

            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full border-2 border-blue-600 transition-colors hover:bg-transparent hover:text-blue-600"
            >
              <Link href='/about'>Know more about us</Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full h-80 md:h-96 lg:h-[500px] relative rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600/https://balajitraining.in/wp-content/uploads/2025/03/Untitled-design-4.png"
              alt="Insurance professionals training"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;