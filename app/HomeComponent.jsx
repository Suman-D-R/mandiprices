'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GET } from './apis/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowUpDown,
  Download,
  BarChart2,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Check,
  ChevronsUpDown,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton'; // Add this import at the top of the file
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';

export default function EnhancedHomeComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('paginated');
  const [showChart, setShowChart] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});
  const [priceUnit, setPriceUnit] = useState('kg');

  // Add new state variables for API parameters
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedVariety, setSelectedVariety] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [grades, setGrades] = useState([]);

  const params = {
    'api-key': '579b464db66ec23bdd00000122ff16e7e3394772573f4047cabb7e79',
    format: 'json',
    limit: 20000,
    state: selectedState !== 'all' ? selectedState : '',
    district: selectedDistrict !== 'all' ? selectedDistrict : '',
    market: selectedMarket !== 'all' ? selectedMarket : '',
    commodity: selectedCommodity !== 'all' ? selectedCommodity : '',
    variety: selectedVariety !== 'all' ? selectedVariety : '',
    grade: selectedGrade !== 'all' ? selectedGrade : '',
    offset: null,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await GET(
        '9ef84268-d588-465a-a308-a864a43d0070',
        params
      );
      setData(response.records || []);
      setTotalPages(Math.ceil((response.records || []).length / itemsPerPage));
      setIsLoading(false);

      // Extract unique values for each parameter
      setStates([...new Set(response.records.map((item) => item.state))]);
      setDistricts([...new Set(response.records.map((item) => item.district))]);
      setMarkets([...new Set(response.records.map((item) => item.market))]);
      setVarieties([...new Set(response.records.map((item) => item.variety))]);
      setGrades([...new Set(response.records.map((item) => item.grade))]);
    };
    fetchData();
  }, [
    selectedState,
    selectedDistrict,
    selectedMarket,
    selectedCommodity,
    selectedVariety,
    selectedGrade,
  ]);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === 'string' &&
          val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when search changes
  }, [filteredData, itemsPerPage]);

  const getCurrentPageData = () => {
    if (viewMode === 'scroll') return filteredData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pageNumbers;
  };

  const downloadCSV = () => {
    const headers = [
      'No.',
      'State',
      'District',
      'Market',
      'Commodity',
      'Variety',
      'Grade',
      'Arrival Date',
      'Min Price',
      'Max Price',
      'Modal Price',
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map((item, index) =>
        [
          index + 1,
          item.state,
          item.district,
          item.market,
          item.commodity,
          item.variety,
          item.grade,
          item.arrival_date,
          Number(item.min_price) < 1000
            ? Number(item.min_price) * 100
            : item.min_price,
          Number(item.max_price) < 1000
            ? Number(item.max_price) * 100
            : item.max_price,
          Number(item.modal_price) < 1000
            ? Number(item.modal_price) * 100
            : item.modal_price,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'commodity_prices.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getChartData = () => {
    const commodityData = filteredData.filter(
      (item) => item.commodity === selectedCommodity
    );
    return commodityData.map((item) => ({
      market: item.market,
      minPrice: formatPrice(item.min_price),
      maxPrice: formatPrice(item.max_price),
      modalPrice: formatPrice(item.modal_price),
    }));
  };

  const uniqueCommodities = [...new Set(data.map((item) => item.commodity))];

  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatPrice = (price) => {
    let numPrice = Number(price);
    if (numPrice <= 1000) {
      numPrice = numPrice * 100;
    }
    if (priceUnit === 'kg') {
      return (numPrice / 100).toFixed(2);
    }
    return numPrice.toFixed(2);
  };

  const TableSkeleton = () => (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          {[...Array(11)].map((_, index) => (
            <TableHead key={index}>
              <Skeleton className='h-8 w-full' />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(11)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className='h-8 w-full' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const chartConfig = {
    minPrice: {
      label: 'Min Price',
      color: 'hsl(var(--primary))',
    },
    maxPrice: {
      label: 'Max Price',
      color: 'hsl(var(--secondary))',
    },
    modalPrice: {
      label: 'Modal Price',
      color: 'hsl(var(--accent))',
    },
  };

  // Add this new function to get the commodity symbol
  const getCommoditySymbol = (commodity) => {
    const symbolMap = {
      Rice: '🍚',
      Wheat: '🌾',
      Maize: '🌽',
      Jowar: '🌿',
      Bajra: '🌾',
      Ragi: '🌾',
      Arhar: '🥜',
      Tur: '🥜',
      Urad: '🥜',
      Moong: '🥜',
      Masur: '🥜',
      Gram: '🥜',
      Groundnut: '🥜',
      Mustard: '🌱',
      Soyabean: '🫘',
      Sunflower: '🌻',
      Cotton: '🧵',
      Jute: '🧵',
      Sugarcane: '🍭',
      Onion: '🧅',
      Potato: '🥔',
      Tomato: '🍅',
      // Add more commodities and their symbols as needed
    };
    return symbolMap[commodity] || '🌿'; // Default to a generic plant symbol if not found
  };

  return (
    <div className={`min-h-screen bg`}>
      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-semibold mb-4'>
          Current Daily Price of Various Commodities
        </h2>

        <div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full md:w-64'
          />
          <div className='flex flex-wrap items-center  gap-4'>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className='w-32'>
                <SelectValue placeholder='Items per page' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10 per page</SelectItem>
                <SelectItem value='50'>50 per page</SelectItem>
                <SelectItem value='100'>100 per page</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select view mode' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='paginated'>Paginated</SelectItem>
                <SelectItem value='scroll'>Scroll</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={downloadCSV} className='flex items-center'>
              <Download className='mr-2 h-4 w-4' />
              Download CSV
            </Button>
            <Button
              onClick={() => setShowChart(!showChart)}
              className='flex items-center'
            >
              <BarChart2 className='mr-2 h-4 w-4' />
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </Button>
            <Select value={priceUnit} onValueChange={setPriceUnit}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Price unit' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='kg'>Price in Kg</SelectItem>
                <SelectItem value='quintal'>Price in Quintal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add new Select components for each parameter */}
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select State' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select District' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Districts</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select Market' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Markets</SelectItem>
              {markets.map((market) => (
                <SelectItem key={market} value={market}>
                  {market}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCommodity}
            onValueChange={setSelectedCommodity}
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select Commodity' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Commodities</SelectItem>
              {uniqueCommodities.map((commodity) => (
                <SelectItem key={commodity} value={commodity}>
                  {commodity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedVariety} onValueChange={setSelectedVariety}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select Variety' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Varieties</SelectItem>
              {varieties.map((variety) => (
                <SelectItem key={variety} value={variety}>
                  {variety}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select Grade' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showChart && (
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Price Comparison Chart</CardTitle>
              <CardDescription>
                Commodity Prices for {selectedCommodity || 'Selected Commodity'}
              </CardDescription>
            </CardHeader>
            <Select
              value={selectedCommodity}
              onValueChange={setSelectedCommodity}
            >
              <SelectTrigger className='w-[200px] mb-4 ml-6'>
                <SelectValue placeholder='Select Commodity' />
              </SelectTrigger>
              <SelectContent>
                {uniqueCommodities.map((commodity) => (
                  <SelectItem key={commodity} value={commodity}>
                    {commodity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CardContent className=' overflow-scroll p-4'>
              {' '}
              <span>
                {selectedCommodity && (
                  <ChartContainer config={chartConfig} className='h-[200px] '>
                    {' '}
                    {/* Reduced height here */}
                    <BarChart data={getChartData()} accessibilityLayer>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey='market'
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                          value.slice(0, 15) + (value.length > 15 ? '...' : '')
                        }
                      />
                      <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator='dashed' />}
                      />
                      <Bar
                        dataKey='minPrice'
                        fill='var(--color-minPrice)'
                        radius={4}
                      />
                      <Bar
                        dataKey='maxPrice'
                        fill='var(--color-maxPrice)'
                        radius={4}
                      />
                      <Bar
                        dataKey='modalPrice'
                        fill='var(--color-modalPrice)'
                        radius={4}
                      />
                    </BarChart>
                  </ChartContainer>
                )}
              </span>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              <div className='flex gap-2 font-medium leading-none'>
                Showing price comparison for{' '}
                {selectedCommodity || 'selected commodity'}
              </div>
              <div className='leading-none text-muted-foreground'>
                Min, Max, and Modal prices across different markets
              </div>
            </CardFooter>
          </Card>
        )}

        {isLoading ? (
          <div className='hidden md:block h-[600px] overflow-y-auto'>
            {' '}
            {/* Add fixed height and overflow */}
            <TableSkeleton />
          </div>
        ) : (
          <>
            {/* Desktop view */}
            <div
              className={`hidden md:block h-[600px] ${
                viewMode === 'scroll' ? 'overflow-y-auto' : 'overflow-y-scroll'
              }`}
            >
              <Table className='w-full'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'>No.</TableHead>
                    <TableHead
                      className='w-32 cursor-pointer'
                      onClick={() => sortData('state')}
                    >
                      State{' '}
                      {sortConfig.key === 'state' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-32 cursor-pointer'
                      onClick={() => sortData('district')}
                    >
                      District{' '}
                      {sortConfig.key === 'district' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-32 cursor-pointer'
                      onClick={() => sortData('market')}
                    >
                      Market{' '}
                      {sortConfig.key === 'market' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-48 cursor-pointer'
                      onClick={() => sortData('commodity')}
                    >
                      Commodity{' '}
                      {sortConfig.key === 'commodity' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead className='w-32'>Variety</TableHead>
                    <TableHead className='w-24'>Grade</TableHead>
                    <TableHead
                      className='w-32 cursor-pointer'
                      onClick={() => sortData('arrival_date')}
                    >
                      Arrival Date{' '}
                      {sortConfig.key === 'arrival_date' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-24 cursor-pointer'
                      onClick={() => sortData('min_price')}
                    >
                      Min Price{' '}
                      {sortConfig.key === 'min_price' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-24 cursor-pointer'
                      onClick={() => sortData('max_price')}
                    >
                      Max Price{' '}
                      {sortConfig.key === 'max_price' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                    <TableHead
                      className='w-24 cursor-pointer'
                      onClick={() => sortData('modal_price')}
                    >
                      Modal Price{' '}
                      {sortConfig.key === 'modal_price' && (
                        <ArrowUpDown className='inline ml-2 h-4 w-4' />
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentPageData().map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className='text-center'>
                        {viewMode === 'paginated'
                          ? (currentPage - 1) * itemsPerPage + index + 1
                          : index + 1}
                      </TableCell>
                      <TableCell>{item.state}</TableCell>
                      <TableCell>{item.district}</TableCell>
                      <TableCell>{item.market}</TableCell>
                      <TableCell>
                        {getCommoditySymbol(item.commodity)} {item.commodity}
                      </TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.grade}</TableCell>
                      <TableCell>{item.arrival_date}</TableCell>
                      <TableCell>
                        {formatPrice(item.min_price)}/
                        <span className='text-xs'>{priceUnit}</span>
                      </TableCell>
                      <TableCell>
                        {formatPrice(item.max_price)}/
                        <span className='text-xs'>{priceUnit}</span>
                      </TableCell>
                      <TableCell>
                        {formatPrice(item.modal_price)}/
                        <span className='text-xs '>{priceUnit}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile view */}
            <div className='md:hidden space-y-4'>
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <Card key={index} className='overflow-hidden'>
                      <CardHeader className='p-4'>
                        <Skeleton className='h-6 w-3/4' />
                      </CardHeader>
                      <CardContent className='p-4 pt-0'>
                        <div className='space-y-2'>
                          {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className='h-4 w-full' />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : getCurrentPageData().map((item, index) => (
                    <Card key={index} className='overflow-hidden'>
                      <CardHeader className='p-4'>
                        <CardTitle className='text-lg flex justify-between items-center'>
                          <span className='truncate'>
                            {`${
                              (currentPage - 1) * itemsPerPage + index + 1
                            }. ${getCommoditySymbol(item.commodity)} ${
                              item.commodity
                            }`}
                          </span>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => toggleCardExpansion(index)}
                          >
                            {expandedCards[index] ? (
                              <ChevronUp className='h-4 w-4' />
                            ) : (
                              <ChevronDown className='h-4 w-4' />
                            )}
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='p-4 pt-0'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div>
                            <p className='text-sm font-medium'>State:</p>
                            <p className='text-sm truncate'>{item.state}</p>
                          </div>
                          <div>
                            <p className='text-sm font-medium'>District:</p>
                            <p className='text-sm truncate'>{item.district}</p>
                          </div>
                          <div>
                            <p className='text-sm font-medium'>Market:</p>
                            <p className='text-sm truncate'>{item.market}</p>
                          </div>
                          <div>
                            <p className='text-sm font-medium'>Variety:</p>
                            <p className='text-sm truncate'>{item.variety}</p>
                          </div>
                        </div>
                        {expandedCards[index] && (
                          <div className='mt-4 grid grid-cols-2 gap-2'>
                            <div>
                              <p className='text-sm font-medium'>Grade:</p>
                              <p className='text-sm truncate'>{item.grade}</p>
                            </div>
                            <div>
                              <p className='text-sm font-medium'>
                                Arrival Date:
                              </p>
                              <p className='text-sm truncate'>
                                {item.arrival_date}
                              </p>
                            </div>
                            <div>
                              <p className='text-sm font-medium'>Min Price:</p>
                              <p className='text-sm truncate'>
                                {formatPrice(item.min_price)}/{priceUnit}
                              </p>
                            </div>
                            <div>
                              <p className='text-sm font-medium'>Max Price:</p>
                              <p className='text-sm truncate'>
                                {formatPrice(item.max_price)}/{priceUnit}
                              </p>
                            </div>
                            <div>
                              <p className='text-sm font-medium'>
                                Modal Price:
                              </p>
                              <p className='text-sm truncate'>
                                {formatPrice(item.modal_price)}/{priceUnit}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
            </div>

            {/* Pagination */}
            {viewMode === 'paginated' && filteredData.length > 0 && (
              <Pagination className='mt-4 w-full flex lg:justify-end'>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={
                        currentPage === totalPages || filteredData.length === 0
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
}
