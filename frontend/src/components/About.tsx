import { motion } from 'framer-motion';
import profileImg from '../assets/aboutme/profile.jpeg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            About Me 👨🏻‍💻
          </h2>
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-300">
              Software Engineer in Test (<span className='font-bold text-black dark:text-white'>SDET</span>) with 
              <span className='font-bold text-black dark:text-white'> 4+ years of experience</span> designing and implementing 
              automated testing frameworks for scalable cloud-native applications. 
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
              Specialized in testing <span className='font-bold text-black dark:text-white'>serverless</span> and <span className='font-bold text-black dark:text-white'>event-driven </span>  
              architectures on AWS, with deep expertise in <span className='font-bold text-black dark:text-white'>API testing</span>, <span className='font-bold text-black dark:text-white'>CI/CD Integration</span>, 
              and <span className='font-bold text-black dark:text-white'>cloud observability</span>.
              </p>
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative w-64 h-64 rounded-full overflow-hidden"
              >
                <img
                  src={profileImg}
                  alt="Jesús Prian"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 