'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { districtsArray } from '@/lib/constants';

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = districtsArray.filter((market) =>
    market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <motion.div
      className='container mx-auto px-4 py-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Markets</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.h1
        className='text-3xl font-bold mb-6 text-center'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Agricultural Markets
      </motion.h1>

      <motion.div
        className='mb-6 max-w-md mx-auto'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Input
          type='text'
          placeholder='Search markets...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full'
        />
      </motion.div>

      <motion.div
        className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'
        variants={containerVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {filteredMarkets.map((market) => (
            <motion.div
              key={market}
              variants={itemVariants}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className='flex flex-col h-full'>
                <CardHeader>
                  <CardTitle className='text-sm sm:text-base'>
                    {market}
                  </CardTitle>
                </CardHeader>
                <CardFooter className='mt-auto'>
                  <Button asChild className='w-full text-xs sm:text-sm'>
                    <Link href={`/markets/${market}`}>View Commodities</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filteredMarkets.length === 0 && (
          <motion.p
            className='text-center mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            No markets found matching your search.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
