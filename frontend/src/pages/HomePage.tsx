import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: HeartIcon,
      title: 'Bespoke Matching',
      description: 'Our expert matchmakers create personalized introductions based on your values, goals, and preferences.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy & Security',
      description: 'Your privacy is our priority. All profiles are thoroughly verified and your data is protected.',
    },
    {
      icon: UserGroupIcon,
      title: 'Female-Focused',
      description: 'Designed specifically for African women in the UK, creating a safe and empowering space.',
    },
    {
      icon: SparklesIcon,
      title: 'Quality Over Quantity',
      description: 'We focus on meaningful connections rather than endless swiping.',
    },
  ];

  const testimonials = [
    {
      name: 'Adunni O.',
      location: 'London',
      quote: 'I found my perfect match through this platform. The personalized approach made all the difference.',
      image: '/images/success-story-couple.jpg',
    },
    {
      name: 'Kemi A.',
      location: 'Manchester',
      quote: 'Finally, a dating service that understands my values and culture. Highly recommend!',
      image: '/images/hero-african-woman.jpg',
    },
    {
      name: 'Asha M.',
      location: 'Birmingham',
      quote: 'The screening process gave me confidence that I was meeting quality people.',
      image: '/images/dating-coach.jpg',
    },
  ];

  const safetyFeatures = [
    'Identity verification',
    'Background checks',
    'Video call screening',
    'Secure messaging',
    'Photo verification',
    '24/7 support',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 female-centric-gradient opacity-70"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight">
                Find Your
                <span className="text-gradient block">Perfect Match</span>
              </h1>
              <p className="text-xl text-neutral-600 mt-6 leading-relaxed">
                A premium, secure matchmaking platform designed specifically for African women in the UK. 
                Start with a <span className="font-semibold text-primary-600">free screening session</span> to discover your perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
to="/register"
                  className="btn-primary text-center text-lg px-8 py-4"
                >
                  Get Started - Free Screening
                </Link>
              </div>
              <div className="mt-4 text-sm text-neutral-600">
                <span className="font-medium">Free consultation:</span> Begin with a complimentary screening session to understand your preferences and goals.
              </div>
              <div className="safe-space-indicator mt-8">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Safe, verified, and respectful community</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:ml-8"
            >
              <div className="relative">
                <div className="aspect-w-4 aspect-h-5 rounded-3xl overflow-hidden shadow-soft-lg">
                  <img
                    src="/images/hero-african-woman.jpg"
                    alt="Beautiful African woman smiling"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-soft">
                  <div className="text-sm text-neutral-600">Success Rate</div>
                  <div className="text-3xl font-bold text-primary-600">87%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We understand the unique needs of African women seeking meaningful relationships. 
              Our platform is built with your values, safety, and success in mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Screening Process */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Your Journey Starts with a Free Screening
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Before we introduce you to potential matches, we invest time in understanding 
              who you are and what you're looking for in a meaningful relationship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Personal Consultation
              </h3>
              <p className="text-neutral-600">
                A confidential 45-minute session to discuss your values, lifestyle, and relationship goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Profile Development
              </h3>
              <p className="text-neutral-600">
                We help craft your profile to authentically represent who you are and attract compatible matches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Matching Strategy
              </h3>
              <p className="text-neutral-600">
                Based on your screening, we develop a personalized matching strategy tailored to your needs.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-soft">
              <CheckCircleIcon className="w-5 h-5 text-success-600" />
              <span className="font-medium text-neutral-900">100% Private Service • No Fancy Algorithms • Completely Confidential</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20 bg-gradient-to-r from-accent-sage-50 to-accent-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
                Your Safety is Our Priority
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We've implemented comprehensive safety measures to ensure you can focus on 
                finding meaningful connections in a secure environment.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {safetyFeatures.map((feature, index) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-success-600 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-soft-lg">
                <img
                  src="/images/tech-background.jpg"
                  alt="Secure and safe environment"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="trust-badge absolute top-4 left-4">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Verified Platform</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-neutral-600">
              Hear from women who found their perfect match through our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{testimonial.location}</div>
                  </div>
                </div>
                <p className="text-neutral-600 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Begin with a complimentary screening session where we'll understand your values, 
              preferences, and relationship goals before introducing you to compatible matches.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-warm text-lg"
            >
              Book Your Free Screening
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
