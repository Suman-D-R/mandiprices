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

function TermsAndConditions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
            <BreadcrumbPage>Terms and Conditions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <motion.div
        className='max-w-4xl mx-auto'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1 className='text-3xl font-bold mb-6' variants={itemVariants}>
          Terms and Conditions
        </motion.h1>

        <motion.section className='mb-8' variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>
            1. Acceptance of Terms
          </h2>
          <p className='mb-4'>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
        </motion.section>

        <motion.section className='mb-8' variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>2. Use License</h2>
          <p className='mb-4'>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on our website for personal,
            non-commercial transitory viewing only.
          </p>
        </motion.section>

        <motion.section className='mb-8' variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>3. Disclaimer</h2>
          <p className='mb-4'>
            The materials on our website are provided on an 'as is' basis. We
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
        </motion.section>

        <motion.section className='mb-8' variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>4. Limitations</h2>
          <p className='mb-4'>
            In no event shall we or our suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on our website.
          </p>
        </motion.section>

        <motion.section className='mb-8' variants={itemVariants}>
          <h2 className='text-2xl font-semibold mb-4'>
            5. Revisions and Errata
          </h2>
          <p className='mb-4'>
            The materials appearing on our website could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on our website are accurate, complete or current.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default TermsAndConditions;
