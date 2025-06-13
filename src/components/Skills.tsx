import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 'Advanced' },
  { name: 'TypeScript', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Tailwind CSS', level: 'Advanced' },
  { name: 'Python', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 