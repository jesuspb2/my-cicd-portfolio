import { motion } from 'framer-motion';
import pythonImg from '../assets/skills/python.svg'
import sqlImg from '../assets/skills/sql.svg'
import TypeScript from '../assets/skills/typescript.svg'
import AWS from '../assets/skills/aws.svg'
import Jenkins from '../assets/skills/jenkins.svg'
import Terraform from '../assets/skills/terraform.svg'
import Docker from '../assets/skills/docker.svg'
import Selenium from '../assets/skills/selenium.svg'
import Playwright from '../assets/skills/playwright.svg'
import Cucumber from '../assets/skills/cucumber.svg'

const skills = [
  { name: 'Python', logo: pythonImg },
  { name: 'SQL', logo: sqlImg },
  { name: 'TypeScript', logo: TypeScript },
  { name: 'AWS', logo: AWS },
  { name: 'Jenkins', logo: Jenkins },
  { name: 'Terraform', logo: Terraform },
  { name: 'Docker', logo: Docker },
  { name: 'Selenium', logo: Selenium },
  { name: 'Playwright', logo: Playwright },
  { name: 'Cucumber', logo: Cucumber },
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
            Tech Stack 💻
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