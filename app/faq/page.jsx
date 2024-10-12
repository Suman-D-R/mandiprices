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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQPage = () => {
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

  const faqItems = [
    {
      question: 'What is MandiPrices.in?',
      answer:
        'MandiPrices.in is a platform that provides up-to-date information on agricultural market prices across various markets in India. We source our data from public government APIs to ensure accuracy and reliability.',
    },
    {
      question: 'How often is the price data updated?',
      answer:
        'Our price data is updated daily, reflecting the most recent information available from our data sources. However, the exact timing may vary depending on when the source data is made available.',
    },
    {
      question: 'Can I use the data from MandiPrices.in for my business?',
      answer:
        'The data on MandiPrices.in is free to use for personal and non-commercial purposes. For commercial use or API access, please contact us to discuss licensing options.',
    },
    {
      question: 'How do I search for a specific commodity or market?',
      answer:
        'You can use the search bar on our homepage or navigate through the Markets section to find specific commodities or markets. We also provide filters to help you narrow down your search.',
    },
    {
      question: 'Is there a mobile app for MandiPrices.in?',
      answer:
        "Currently, we don't have a mobile app, but our website is fully responsive and works well on mobile devices. You can access all features through your mobile browser.",
    },
    {
      question: 'How can I report an error or suggest an improvement?',
      answer:
        "We appreciate your feedback! Please use the Contact Us page to report any errors or suggest improvements. We're constantly working to enhance our service based on user input.",
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>FAQ</BreadcrumbPage>
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
          Frequently Asked Questions
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Accordion type='single' collapsible className='w-full'>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQPage;
