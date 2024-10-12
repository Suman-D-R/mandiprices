import React from 'react';
import { Metadata } from 'next';

export const metadata = {
  title: 'Mandi Markets List',
  description: 'Explore the list of all mandi markets in India',
};

function Layout({ children }) {
  return <div>{children}</div>;
}

export default Layout;
