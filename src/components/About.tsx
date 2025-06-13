import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I am a passionate developer with expertise in building modern web applications.
                My journey in software development has equipped me with a strong foundation
                in both frontend and backend technologies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I believe in writing clean, maintainable code and creating intuitive user
                experiences. When I'm not coding, you can find me exploring new technologies
                and contributing to open-source projects.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {/* Add your profile image here */}
                <span className="text-4xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 