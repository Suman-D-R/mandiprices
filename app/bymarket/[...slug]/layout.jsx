import { Metadata } from 'next';
import { districtsArray } from '@/lib/constants';

export async function generateMetadata({ params }) {
  const district = params.slug[0];
  const capitalizedDistrict =
    district.charAt(0).toUpperCase() + district.slice(1);

  return {
    title: `Today's  vegetables rates in ${capitalizedDistrict} | Commodity Prices in ${capitalizedDistrict} | Daily Market Rates of ${capitalizedDistrict}`,
    description: `Get the latest vegetables prices and daily market rates for ${capitalizedDistrict}. Compare prices across different markets in the district.`,
    keywords: `${capitalizedDistrict}, commodity prices, market rates, agricultural prices, ${districtsArray.join(
      ', '
    )}`,
  };
}

export async function generateStaticParams() {
  return districtsArray.map((district) => ({
    slug: [district.toLowerCase()],
  }));
}

// Add this new layout component
export default function DistrictLayout({ children }) {
  return <>{children}</>;
}
