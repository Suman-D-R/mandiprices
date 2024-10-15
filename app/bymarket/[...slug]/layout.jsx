import { districtsArray } from '@/lib/constants';

export async function generateMetadata({ params }) {
  const district = params.slug[0];
  const capitalizedDistrict =
    district.charAt(0).toUpperCase() + district.slice(1);

  return {
    title: `Today's  vegetables rates in ${capitalizedDistrict} | Commodity Prices in ${capitalizedDistrict} | Daily Market Rates of ${capitalizedDistrict}`,
    description: `vegetable price in ${capitalizedDistrict}, vegetables price in ${capitalizedDistrict} today, ${capitalizedDistrict} vegetable price, ${capitalizedDistrict} vegetable market price, vegetables price list in ${capitalizedDistrict} today, all vegetable price in ${capitalizedDistrict}, vegetable cost in ${capitalizedDistrict}, ${capitalizedDistrict} vegetable price list, ${capitalizedDistrict} market vegetable price , vegetables rate today ${capitalizedDistrict}, today vegetable price in ${capitalizedDistrict}, ${capitalizedDistrict} vegetable market price today, ${capitalizedDistrict} price list of vegetables, ${capitalizedDistrict} vegetable price names, today vegetable market price list ${capitalizedDistrict}, ${capitalizedDistrict} vegetable rate list  make this discription of eso more use full  Get the latest vegetables prices and daily market rates for ${capitalizedDistrict}. Compare prices across different markets in the district.`,
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
