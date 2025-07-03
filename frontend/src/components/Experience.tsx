import { motion } from 'framer-motion';
import align from '../assets/experience/align.png'
import siemens from '../assets/experience/siemens.svg'

const experiences = [
  {
    title: 'Software Engineer in Test',
    company: 'Align Technology',
    period: '2023 - Present',
    logo: align,
    bullets: [
      'Developed and executed functional, regression, and end-to-end automated tests using Python with Behave and Pytest frameworks, improving overall test coverage and reliability.',
      'Developed E2E integration and contract tests for event-driven microservices using pytest, Behave (BDD), and Kafka-based messaging',
      'Implemented CI/CD pipelines using Bamboo, ensuring automated build, test, and deploy processes.',
      'Monitored test results and cloud system behavior using CloudWatch and Splunk.',
      'Designed and implemented AWS Step Functions pipelines to orchestrate test data creation workflows, improving scalability of test environments.',
    ]
  },
  {
    title: 'QA Engineer',
    company: 'SIEMENS',
    period: '2020 - 2023',
    logo: siemens,
    bullets: [
      'Conducted manual testing of critical user flows, identifying and reporting bugs with clear documentation and reproducible steps.',
      'Developed and maintained automated UI tests using Selenium WebDriver with Python/Java, improving test coverage and accelerating regression cycles',
      'Wrote and executed SQL queries to validate backend data, ensuring consistency between frontend and database layers',
      'Performed API testing with Postman to validate REST endpoints and verify data integrity across systems',
      'Participated in requirements reviews and sprint planning to provide testability feedback and improve overall product quality'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Experience 💼
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-gray-800 dark:border-gray-300"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-800 dark:bg-gray-300" />
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-16 h-16 object-contain rounded-lg p-1 ml-3"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-sky-800 dark:text-g font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="ml-4">
                        {bullet}
                      </li>
                    ))}
                  </ul>
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