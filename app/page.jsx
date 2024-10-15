import HomeComponent from '../HomeComponent';
import { StoreProvider } from '../context/store';
import { Metadata } from 'next';

export const metadata = {
  title:
    'Get the latest mandi prices for vegetables and commodities with real-time updates. Check today’s market rates for RMC vegetables and stay informed on price trends in your local area.',
  description:
    'price of vegetables, price of vegetables today, vegetables price,  vegetables price list,  vegetables price list today,  vegetable price in india,  vegetable price in india today,  vegetable rate list,  vegetable rate today,  vegetable rate in india,  vegetables daily market Price,  today vegetable price in india, price of Vegetables Today, vegetable today price Get the latest mandi prices for vegetables and commodities with real-time updates. Check today’s market rates for RMC vegetables and stay informed on price trends in your local area. Vegetable Today Price (14th Oct 2024): Find Today Vegetable Market Price List Per Kg in major cities of India including tomato, onion, potato brinjal, beans and other vegetable rates at Oneindia.',
  keywords:
    'vegetable price, vegetables price today, vegetables price list, vegetables price list today, vegetable price in india, vegetable price in india today, vegetable rate list, vegetable rate today, vegetable rate in india, vegetables daily market Price, today vegetable price in india, price of Vegetables Today, vegetable today price',
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
