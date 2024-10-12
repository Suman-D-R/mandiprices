'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'description', title: '2. Description of Service' },
  { id: 'modifications', title: '3. Modifications to Terms' },
  { id: 'privacy', title: '4. Privacy Policy' },
  { id: 'contact', title: '5. Contact Information' },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='bg-gradient-to-br from-background-50 to-purple-300 min-h-screen'>
      <div className='container mx-auto px-4 py-12 max-w-4xl'>
        <motion.h1
          className=' font-bold mb-8 text-center text-2xl text-primary-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Terms of Service
        </motion.h1>

        <div className='flex flex-col md:flex-row gap-8'>
          <motion.nav
            className='md:w-64 flex-shrink-0'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='sticky top-8'>
              <h2 className='text-xl font-semibold mb-4 text-primary-800'>
                Table of Contents
              </h2>
              <ul className='space-y-2'>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block py-1 px-2 rounded transition-colors ${
                        activeSection === section.id
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>

          <motion.div
            className='flex-grow'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <section id='acceptance' className='mb-12'>
              <h2 className=' font-semibold mb-4 text-primary-800'>
                1. Acceptance of Terms
              </h2>
              <p className='mb-4 text-gray-700 leading-relaxed'>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. In addition,
                when using this website's particular services, you shall be
                subject to any posted guidelines or rules applicable to such
                services, which may be posted and modified from time to time.
              </p>
            </section>

            <section id='description' className='mb-12'>
              <h2 className=' font-semibold mb-4 text-primary-800'>
                2. Description of Service
              </h2>
              <p className='mb-4 text-gray-700 leading-relaxed'>
                Our website provides users with access to a rich collection of
                resources, including various communications tools, forums,
                shopping services, personalized content, and branded programming
                through its network of properties which may be accessed through
                any various medium or device now known or hereafter developed.
              </p>
            </section>

            <section id='modifications' className='mb-12'>
              <h2 className=' font-semibold mb-4 text-primary-800'>
                3. Modifications to Terms
              </h2>
              <p className='mb-4 text-gray-700 leading-relaxed'>
                We reserve the right to change these terms or modify any
                features of the service at any time. The most current version of
                the Terms of Service will be posted on the site. Any changes or
                modifications will be effective immediately upon posting the
                revisions. You are responsible for reviewing the Terms of
                Service periodically to be aware of any modifications.
              </p>
            </section>

            <section id='privacy' className='mb-12'>
              <h2 className=' font-semibold mb-4 text-primary-800'>
                4. Privacy Policy
              </h2>
              <p className='mb-4 text-gray-700 leading-relaxed'>
                Please review our Privacy Policy, which also governs your visit
                to our website, to understand our practices. The Privacy Policy
                is incorporated into these Terms of Service by reference.
              </p>
            </section>

            <section id='contact' className='mb-12'>
              <h2 className=' font-semibold mb-4 text-primary-800'>
                5. Contact Information
              </h2>
              <p className='mb-4 text-gray-700 leading-relaxed'>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <address className='not-italic bg-white p-4 rounded-lg shadow-md'>
                <p className='mb-2'>
                  Email:{' '}
                  <a
                    href='mailto:support@example.com'
                    className='text-blue-600 hover:underline'
                  >
                    mandirateupdates@gmail.com
                  </a>
                </p>
                <p className='mb-2'>Phone: +91 9902696211</p>
                <p>Address: Bengaluru, Karnataka, India</p>
              </address>
            </section>
          </motion.div>
        </div>

        <motion.footer
          className='mt-12 text-center text-sm text-gray-600'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className='mt-2'>
            <Link href='/' className='text-blue-600 hover:underline'>
              Return to Home
            </Link>
          </p>
        </motion.footer>

        <motion.button
          className='fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors'
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} />
          <span className='sr-only'>Scroll to top</span>
        </motion.button>
      </div>
    </div>
  );
}
