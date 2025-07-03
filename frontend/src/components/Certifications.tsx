import { motion } from 'framer-motion';
import awsArchitect from '../assets/certifications/architect.png'
import awsPractitioner from '../assets/certifications/practitioner.png'

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    logo: awsArchitect,
    link: 'https://www.credly.com/badges/81c75231-8837-41ab-8964-af9ac9e6ea5c/public_url'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023',
    logo: awsPractitioner,
    link: 'https://www.credly.com/badges/093478e0-dcc0-452d-92f5-5095fffa3a40/public_url'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Certifications 🎓
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          className="h-24 w-24 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Issued: {cert.date}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications; 