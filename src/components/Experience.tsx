import { motion } from 'framer-motion';
import align from '../assets/experience/align.svg'
import siemens from '../assets/experience/siemens.svg'

const experiences = [
  {
    title: 'Software Engineer in Test',
    company: 'Align Technology',
    period: '2023 - Present',
    logo: align,
    bullets: [
      'Designed and implemented automated test frameworks for AWS serverless applications, including Step Functions, Lambda, EventBridge, and DynamoDB.',
      'Developed E2E integration and contract tests for event-driven microservices using pytest, Behave (BDD), and Kafka-based messaging',
      'Implemented CI/CD pipelines using Bamboo, ensuring automated build, test, and deploy processes.',
      'Monitored test results and cloud system behavior using CloudWatch and Splunk.'
    ]
  },
  {
    title: 'QA Engineer',
    company: 'SIEMENS',
    period: '2020 - 2023',
    logo: siemens,
    bullets: [
      'Developed and maintained automated test suites for e-commerce platforms',
      'Created API testing frameworks using Python and Postman',
      'Collaborated with development teams to implement testing best practices',
      'Improved test coverage by 40% through automation initiatives'
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
            Work Experience 💼
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