import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', logo: '/src/assets/skills/python.svg' },
  { name: 'SQL', logo: '/src/assets/skills/sql.svg' },
  { name: 'TypeScript', logo: '/src/assets/skills/typescript.svg' },
  { name: 'AWS', logo: '/src/assets/skills/aws.svg' },
  { name: 'Jenkins', logo: '/src/assets/skills/jenkins.svg' },
  { name: 'Terraform', logo: '/src/assets/skills/terraform.svg' },
  { name: 'Docker', logo: '/src/assets/skills/docker.svg' },
  { name: 'Selenium', logo: '/src/assets/skills/selenium.svg' },
  { name: 'Playwright', logo: '/src/assets/skills/playwright.svg' },
  { name: 'Cucumber', logo: '/src/assets/skills/cucumber.svg' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Skills & Expertise 📊
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center cursor-pointer"
              >
                {skill.logo && (
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;