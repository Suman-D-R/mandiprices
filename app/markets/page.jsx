'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { marketsArray } from '@/lib/constants';

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = marketsArray.filter((market) =>
    market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6 '>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/' className='text-lg'>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-lg'>Markets</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='text-3xl font-bold mb-6 text-center'>
        Agricultural Markets
      </h1>

      <div className='mb-6'>
        <Input
          type='text'
          placeholder='Search markets...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredMarkets.map((market) => (
          <Card key={market} className='flex flex-col'>
            <CardHeader>
              <CardTitle>{market}</CardTitle>
            </CardHeader>

            <CardFooter>
              <Button asChild className='w-full'>
                <Link href={`/markets/${market}`}>View Commodities</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMarkets.length === 0 && (
        <p className='text-center mt-6'>
          No markets found matching your search.
        </p>
      )}
    </div>
  );
}
