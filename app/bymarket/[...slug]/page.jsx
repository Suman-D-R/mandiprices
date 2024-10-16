import HomeComponent from '../../HomeComponent';
import { StoreProvider } from '../../context/store';
import { Metadata } from 'next';

export const metadata = {
  title:
    'Mandi rates today | Live RMC  vegetables rates  | vegetables market rates',
  description:
    'Get the latest mandi prices for vegetables and commodities with real-time updates. Check today’s market rates for RMC vegetables and stay informed on price trends in your local area.',
  openGraph: {
    title: 'Mandi Prices | Home',
    description:
      'Welcome to Mandi Prices - Get the latest mandi prices for vegetables and commodities with real-time updates. Check today’s market rates for RMC vegetables and stay informed on price trends in your local area.',
    url: 'https://mandiprices.in',
    siteName: 'Mandi Prices',
    images: [
      {
        url: 'https://mandiprices.in/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mandi Prices | Home',
    description:
      'Welcome to Mandi Prices - Get the latest mandi prices for vegetables and commodities with real-time updates. Check today’s market rates for RMC vegetables and stay informed on price trends in your local area.',
    images: ['https://mandiprices.in/twitter-image.jpg'],
  },
};

export default function Home() {
  return (
    <StoreProvider>
      <div className='bg-background'>
        <HomeComponent />
      </div>
    </StoreProvider>
  );
}
