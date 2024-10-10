import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-background text-primary border-t'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Mandi Prices</h3>
            <p className='text-sm text-gray-600'>
              Your trusted source for daily agricultural commodity prices across
              India.
            </p>
          </div>
          <div>
            <h4 className='text-md font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/markets'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  href='/commodities'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Commodities
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-md font-semibold mb-4'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/faq'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/api'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  API Access
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-gray-600 hover:text-gray-900'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-md font-semibold mb-4'>Connect With Us</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Facebook</span>
                <Facebook className='h-6 w-6' />
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Twitter</span>
                <Twitter className='h-6 w-6' />
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Instagram</span>
                <Instagram className='h-6 w-6' />
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Email</span>
                <Mail className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-200 pt-8 flex justify-between items-center'>
          <p className='text-sm text-gray-500'>
            &copy; 2024 Mandi Prices. All rights reserved.
          </p>
          <div className='flex space-x-6'>
            <Link
              href='/terms'
              className='text-sm text-gray-500 hover:text-gray-900'
            >
              Terms
            </Link>
            <Link
              href='/privacy'
              className='text-sm text-gray-500 hover:text-gray-900'
            >
              Privacy
            </Link>
            <Link
              href='/cookies'
              className='text-sm text-gray-500 hover:text-gray-900'
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
