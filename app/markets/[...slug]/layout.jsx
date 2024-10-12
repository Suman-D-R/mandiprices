import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const district = slug[0].replace(/%20/g, ' '); // Assuming the first part of the slug is the district name
  const commodity = slug[1] || 'vegetables'; // If there's a second part, use it as the commodity, otherwise default to 'vegetables'

  const title = `${district} ${commodity} prices | MandiPrices.in`;
  const description = `${commodity} prices history in ${district} district. Get the latest mandi rates and market information for ${district}.`;

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
          alt: `${district} Mandi Prices`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://mandiprices.in/twitter-image.jpg'],
    },
    keywords: `${district} mandi prices, ${commodity} prices, agricultural market rates, ${district} vegetable prices, mandi rates`,
  };
}

function Layout({ children }) {
  return <div>{children}</div>;
}

export default Layout;
