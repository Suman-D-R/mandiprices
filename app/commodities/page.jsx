'use client';

import React, { useState } from 'react';
import { commoditiesArray } from '@/lib/constants';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { getCommodityImage } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

export default function CommoditiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommodities = commoditiesArray.filter((commodity) =>
    commodity.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Commodities</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.h1
        className='text-4xl font-bold mb-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Commodities
      </motion.h1>
      <motion.p
        className='text-muted-foreground mb-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        See the latest mandi prices for all commodities
      </motion.p>

      <motion.div
        className='mb-6'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className='relative max-w-md mx-auto'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Search commodities...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {filteredCommodities.map((commodity) => (
          <motion.div key={commodity} variants={itemVariants}>
            <Card className='hover:shadow-lg transition-shadow duration-300 h-full'>
              <Link
                href={`/commodities/${commodity.toLowerCase()}`}
                className='block h-full'
              >
                <CardContent className='p-4 sm:p-6 flex flex-col h-full'>
                  <div className='mb-4 flex justify-center'>
                    <Image
                      src={getCommodityImage(commodity)}
                      alt={commodity}
                      width={60}
                      height={60}
                      className='object-cover'
                    />
                  </div>
                  <h2 className='text-lg sm:text-xl font-semibold mb-2 text-center'>
                    {commodity}
                  </h2>
                  <p className='text-sm text-muted-foreground mb-4 flex-grow text-center'>
                    View prices across all markets
                  </p>
                  <div className='flex items-center justify-center text-primary mt-auto'>
                    <span className='sr-only'>See more about {commodity}</span>
                    <ArrowRight className='h-4 w-4' />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredCommodities.length === 0 && (
        <motion.p
          className='text-center text-muted-foreground mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No commodities found. Please try a different search term.
        </motion.p>
      )}
    </div>
  );
}
