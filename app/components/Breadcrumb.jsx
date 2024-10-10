import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex space-x-2'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={segment}>
              <span className='mx-2'>/</span>
              {isLast ? (
                <span className='font-semibold'>{segment}</span>
              ) : (
                <Link href={href}>{segment}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
