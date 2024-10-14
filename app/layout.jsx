import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Footer from './components/Footer';
import Header from './components/Header';
import { Analytics } from '@vercel/analytics/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Mandi Prices',
  description: 'Get the latest mandi prices for all markets in India',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6317238898652998'
          crossorigin='anonymous'
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <Header />
          {children}
        </ThemeProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
