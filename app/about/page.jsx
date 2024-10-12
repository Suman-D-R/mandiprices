'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
            <BreadcrumbPage>About Us</BreadcrumbPage>
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
        <motion.h1
          className='text-4xl font-bold text-center mb-8 text-primary-800'
          variants={fadeIn}
        >
          About Us
        </motion.h1>

        <motion.p className='text-md text-primary-600 mb-8' variants={fadeIn}>
          Welcome to <span className='font-semibold'>Mandi Pricesnpm</span>,
          your go-to platform for accessing daily commodity prices from markets
          across India. Powered by the government's open data initiative at
          data.gov.in, we provide accurate and timely information about the
          prices of essential commodities like grains, fruits, vegetables, and
          more, collected directly from official sources.
        </motion.p>

        <motion.h2
          className='text-2xl font-semibold mb-4 text-primary-800'
          variants={fadeIn}
        >
          What We Offer
        </motion.h2>

        <motion.p className='text-md text-primary-600 mb-8' variants={fadeIn}>
          Our platform is designed to help users stay updated on the latest
          market prices, track historical trends, and make informed decisions
          whether you're a consumer, trader, or researcher. With real-time data
          from markets all over India, we aim to bridge the gap between the
          producers and consumers by providing transparent access to commodity
          pricing information.
        </motion.p>

        <motion.h3
          className='text-xl font-semibold mb-4 text-primary-800'
          variants={fadeIn}
        >
          Key Features:
        </motion.h3>

        <motion.ul
          className='list-disc list-inside text-md text-primary-600 mb-8 space-y-2'
          variants={fadeIn}
        >
          <li>
            Daily Market Prices: View the latest prices of commodities across
            major markets in India, updated daily for accuracy.
          </li>
          <li>
            Historical Price Trends: Analyze historical price data to understand
            market trends and price fluctuations over time.
          </li>
          <li>
            Interactive Market Search: Easily find market-specific prices by
            searching with keywords or location.
          </li>
          <li>
            Comprehensive Data: Access detailed data on various commodities
            including grains, vegetables, fruits, pulses, and more.
          </li>
        </motion.ul>

        <div ref={ref}>
          {inView && (
            <motion.div
              initial='hidden'
              animate='visible'
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.h2
                className='text-2xl font-semibold mb-4 text-primary-800'
                variants={fadeIn}
              >
                Why Use Our Platform?
              </motion.h2>

              <motion.ul
                className='list-disc list-inside text-md text-primary-600 mb-8 space-y-2'
                variants={fadeIn}
              >
                <li>
                  Trusted Data Source: All the data is sourced from the
                  government's open data platform, ensuring its credibility and
                  accuracy.
                </li>
                <li>
                  User-Friendly Interface: We prioritize making complex data
                  easy to understand, with clean visualizations and an intuitive
                  design.
                </li>
                <li>
                  Free to Use: As part of our commitment to transparency, all
                  features on our platform are available for free.
                </li>
                <li>
                  Custom Alerts & Notifications: Sign up to receive updates on
                  commodity price changes directly to your inbox or phone.
                </li>
              </motion.ul>

              <motion.h2
                className='text-2xl font-semibold mb-4 text-primary-800'
                variants={fadeIn}
              >
                Disclaimer
              </motion.h2>

              <motion.p
                className='text-md text-primary-600 mb-8'
                variants={fadeIn}
              >
                While we strive to ensure the accuracy and reliability of the
                data presented on our platform, please note that actual market
                prices may sometimes vary. The data is sourced from official
                government websites, but there may be occasional discrepancies
                due to delays, updates, or human error in the reporting process.
                Therefore, we cannot be held responsible for any financial loss
                or decisions made based on the information provided on our
                platform.
              </motion.p>

              <motion.p
                className='text-md text-primary-600 mb-8'
                variants={fadeIn}
              >
                We advise users to double-check the information from local
                sources when making critical financial decisions.
              </motion.p>

              <motion.h2
                className='text-2xl font-semibold mb-4 text-primary-800'
                variants={fadeIn}
              >
                Our Mission
              </motion.h2>

              <motion.p
                className='text-md text-primary-600 mb-8'
                variants={fadeIn}
              >
                At Mandi Pricesnpm, our mission is to empower farmers, traders,
                and consumers with real-time access to vital market data,
                fostering transparency and better decision-making in the Indian
                agricultural and consumer goods sectors. We believe that open
                access to information leads to smarter choices and a more
                efficient market ecosystem.
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
