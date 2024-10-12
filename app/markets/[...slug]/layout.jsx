import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata({ params }) {
  const slug = params.slug;

  return {
    title: `Market: ${slug.join('/')}`,
    description: `Explore market information for ${slug.join('/')}`,
    openGraph: {
      title: `Market: ${slug.join('/')}`,
      description: `Explore market information for ${slug.join('/')}`,
      type: 'website',
      url: `https://yourwebsite.com/markets/${slug.join('/')}`,
      images: [
        {
          url: 'https://yourwebsite.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Market Overview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Market: ${slug.join('/')}`,
      description: `Explore market information for ${slug.join('/')}`,
      images: ['https://yourwebsite.com/twitter-image.jpg'],
    },
  };
}

function Layout({ children }) {
  return <div>{children}</div>;
}

export default Layout;
