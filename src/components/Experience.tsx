import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Led the development of multiple web applications using React and TypeScript. Implemented CI/CD pipelines and improved application performance.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    period: '2020 - 2022',
    description: 'Developed and maintained various client projects using modern web technologies. Collaborated with designers and backend developers.',
  },
  {
    title: 'Junior Developer',
    company: 'Startup Inc',
    period: '2019 - 2020',
    description: 'Worked on frontend development tasks and learned various web technologies. Contributed to team projects and participated in code reviews.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Work Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {exp.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 