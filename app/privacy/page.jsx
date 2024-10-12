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

const PolicyPage = () => {
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
            <BreadcrumbPage>Policy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='max-w-3xl mx-auto'
      >
        <motion.h1 variants={itemVariants} className='text-4xl font-bold mb-6'>
          Our Policy
        </motion.h1>

        <motion.section variants={itemVariants} className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Privacy Policy</h2>
          <p className='mb-4'>
            At MandiPrices.in, we are committed to protecting your privacy. We
            collect only necessary information to provide our services and
            improve user experience. We do not sell or share your personal
            information with third parties.
          </p>
          <p>
            For more details on how we collect, use, and protect your data,
            please contact us.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Terms of Service</h2>
          <p className='mb-4'>
            By using MandiPrices.in, you agree to our terms of service. Our
            platform is intended for informational purposes only, and we strive
            to provide accurate and up-to-date information on agricultural
            market prices.
          </p>
          <p>
            We reserve the right to modify or discontinue our service at any
            time without notice. Users are responsible for using the information
            provided on our platform at their own discretion.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Data Usage Policy</h2>
          <p className='mb-4'>
            The data presented on MandiPrices.in is sourced from public
            government APIs. We process and present this data to make it more
            accessible and user-friendly. Users are free to use this data for
            personal or non-commercial purposes.
          </p>
          <p>
            For commercial use of our data or API access, please contact us for
            more information and licensing details.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>Updates to Our Policy</h2>
          <p>
            We may update our policies from time to time. We encourage users to
            check this page periodically for any changes. Your continued use of
            our service after any policy changes constitutes your acceptance of
            the new terms.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PolicyPage;
