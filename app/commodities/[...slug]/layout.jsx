import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const name = slug[0].replace(/%20/g, ' ');

  const title = `${name} prices in all markets | MandiPrices.in`;
  const description = `${name} prices history in all mandi markets. Get the latest mandi rates and market information for mandiprices.in.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://mandiprices.in/markets/${slug.join('/')}`,
      images: [
        {
          url: 'https://mandiprices.in/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${name} Mandi Prices`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://mandiprices.in/twitter-image.jpg'],
    },
    keywords: `${name} mandi prices, ${name} prices, agricultural market rates, ${name} vegetable prices, mandi rates`,
  };
}

function Layout({ children }) {
  return <div>{children}</div>;
}

export default Layout;
