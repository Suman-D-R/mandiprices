'use client';

import { useEffect } from 'react';
import HomeComponent from './HomeComponent';
import { StoreProvider } from './context/store';
import Header from './components/Header';
import Footer from './components/Footer';
import { app, analytics } from './firebase';

export default function Home() {
  useEffect(() => {
    // Firebase is now initialized when the component mounts
    console.log('Firebase initialized');
  }, []);

  return (
    <StoreProvider>
      <div className='bg-background '>
        <HomeComponent />
      </div>
    </StoreProvider>
  );
}
