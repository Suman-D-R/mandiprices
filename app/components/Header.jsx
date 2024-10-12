'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Markets', href: '/markets' },
    { name: 'Commodities', href: '/commodities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <header className='bg-background border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center '>
          <Link
            href='/'
            className='text-2xl flex items-end justify-end gap-2 font-bold text-primary'
          >
            <Image
              src='/assets/logo.png'
              alt='Mandi Prices'
              width={30}
              height={30}
            />
            <span>Mandi Prices</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-6'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme toggle and Mobile Navigation */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
              {theme === 'dark' ? (
                <Moon className='h-5 w-5 text-foreground' />
              ) : (
                <Sun className='h-5 w-5 text-foreground' />
              )}
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className='md:hidden'>
                <Button variant='outline' size='icon'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <nav className='flex flex-col space-y-4 mt-8'>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`transition-colors ${
                        pathname === item.href
                          ? 'text-primary font-semibold'
                          : 'text-foreground hover:text-primary'
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
