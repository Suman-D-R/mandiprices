'use client';

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useParams } from 'next/navigation';

function page() {
  const params = useParams();
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
            <BreadcrumbLink href='/markets' className='text-lg'>
              Markets
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-lg'>
              {params.slug[0]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default page;
