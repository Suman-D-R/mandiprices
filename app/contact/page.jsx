'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='max-w-2xl mx-auto'
      >
        <motion.h1
          variants={itemVariants}
          className='text-4xl font-bold text-center mb-8 text-primary-800'
        >
          Contact Us
        </motion.h1>

        <motion.p variants={itemVariants} className='mb-6'>
          We'd love to hear from you! Whether you have a question about our
          services, need help with using our platform, or just want to say
          hello, don't hesitate to reach out.
        </motion.p>

        <motion.div variants={itemVariants} className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Get in Touch</h2>
          <p>Email: support@mandiprices.com</p>
          <p>Phone: +91 9902696211</p>
        </motion.div>

        {/* <motion.div variants={itemVariants} className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Visit Us</h2>
          <p>123 Agri Street</p>
          <p>New Delhi, 110001</p>
          <p>India</p>
        </motion.div> */}

        <motion.div variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-2'>Follow Us</h2>
          <p>
            Stay connected with us on social media for the latest updates and
            news.
          </p>
          <div className='flex space-x-4 mt-2'>
            <a href='#' className='text-blue-500 hover:text-blue-600'>
              Twitter
            </a>
            <a href='#' className='text-blue-500 hover:text-blue-600'>
              Facebook
            </a>
            <a href='#' className='text-blue-500 hover:text-blue-600'>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
