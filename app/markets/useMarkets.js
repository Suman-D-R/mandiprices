import { useState, useEffect, useRef, useCallback } from 'react';
import { districtsArray } from '@/lib/constants';

export function useMarkets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedMarkets, setDisplayedMarkets] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef(null);

  const filteredMarkets = districtsArray.filter((market) =>
    market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setDisplayedMarkets(filteredMarkets.slice(0, visibleCount));
  }, [searchTerm, visibleCount]);

  const handleLazyLoading = useCallback(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        displayedMarkets.length < filteredMarkets.length
      ) {
        setVisibleCount((prevCount) => prevCount + 10);
      }
    },
    [displayedMarkets.length, filteredMarkets.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleLazyLoading, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleLazyLoading]);

  return {
    searchTerm,
    setSearchTerm,
    displayedMarkets,
    filteredMarkets,
    observerRef,
  };
}
