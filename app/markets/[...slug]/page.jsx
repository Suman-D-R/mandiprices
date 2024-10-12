'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { GET } from '@/app/apis/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowUpDown,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { getCommodityImage } from '@/lib/utils';
import { commoditiesArray } from '@/lib/constants';

// Add these new components
const TableSkeleton = () => (
  <div className='animate-pulse'>
    {/* Add skeleton rows here */}
    {[...Array(5)].map((_, index) => (
      <div key={index} className='h-10 bg-gray-200 mt-2 rounded'></div>
    ))}
  </div>
);

const MobileCardSkeleton = () => (
  <div className='animate-pulse'>
    {/* Add skeleton cards here */}
    {[...Array(3)].map((_, index) => (
      <div key={index} className='h-32 bg-gray-200 mt-4 rounded'></div>
    ))}
  </div>
);

function Page() {
  const params = useParams();

  // Initialize state variables
  const [apiParams, setApiParams] = useState({
    'api-key': '579b464db66ec23bdd00000122ff16e7e3394772573f4047cabb7e79',
    format: 'json',
    limit: 2000,
    offset: null,
    filters: {
      'District.keyword': params.slug[0].replace(/%20/g, ' '),
    },
    range: {
      Arrival_Date: {
        gte: format(
          new Date(new Date().setDate(new Date().getDate() - 3)),
          'yyyy-MM-dd'
        ),
        lte: format(new Date(), 'yyyy-MM-dd'),
      },
    },
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceUnit, setPriceUnit] = useState('kg');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedCommodity, setSelectedCommodity] = useState('all');
  const [selectedVariety, setSelectedVariety] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedDateFrom, setSelectedDateFrom] = useState(
    new Date().setDate(new Date().getDate() - 3)
  );
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('paginated');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const [expandedCards, setExpandedCards] = useState({});
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [error, setError] = useState(null);

  // Dummy data for dropdowns (replace with actual data)
  const markets = ['Market 1', 'Market 2'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await GET(
          '35985678-0d79-46b4-9ed6-6f13308a1d24',
          apiParams
        );
        setData(response.records || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiParams]);

  //api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?format=json&api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&filters[State.keyword]=Karnataka&filters[District.keyword]=Mysore&range[Arrival_Date][gte]=2024-10-07&range[Arrival_Date][lte]=2024-10-09&sort[Market.keyword]=asc

  useEffect(() => {
    if (selectedDateFrom && selectedDateTo) {
      setApiParams((prevParams) => {
        const newFilters = { ...prevParams.filters };

        if (selectedCommodity !== 'all') {
          newFilters['Commodity.keyword'] = selectedCommodity;
        } else {
          delete newFilters['Commodity.keyword'];
        }

        return {
          ...prevParams,
          filters: newFilters,
          range: {
            Arrival_Date: {
              gte: format(selectedDateFrom, 'yyyy-MM-dd'),
              lte: format(selectedDateTo, 'yyyy-MM-dd'),
            },
          },
        };
      });
    }
  }, [selectedDateFrom, selectedDateTo, selectedCommodity]);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      })
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriceUnit('kg');
    setSelectedMarket('all');
    setSelectedCommodity('all');
    setSelectedVariety('all');
    setSelectedGrade('all');
    setItemsPerPage(10);
    setViewMode('paginated');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'ascending' });
  };

  const downloadCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const csvData = data.map((row) => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${csvData}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'market_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getCurrentPageData = () => {
    if (viewMode === 'scroll') {
      return filteredData;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function DataItem({ label, value }) {
    return (
      <div>
        <p className='text-xs font-medium text-muted-foreground'>{label}</p>
        <p className='text-sm font-medium truncate'>{value}</p>
      </div>
    );
  }

  function PriceItem({ label, value, unit }) {
    return (
      <div className='text-center'>
        <p className='text-xs font-medium text-muted-foreground'>{label}</p>
        <p className='text-sm font-bold'>{value}</p>
        <p className='text-xs text-muted-foreground'>/{unit}</p>
      </div>
    );
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push('...');
      }
    }
    return pageNumbers;
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatPrice = (price) => {
    // Implement price formatting logic
    return price;
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6 '>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href='/markets'>Markets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {params.slug[0].replace(/%20/g, ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={`min-h-screen bg`}>
        <div className='container mx-auto p-4'>
          <h2 className='text-2xl font-semibold mb-4'>
            Price History of Various Commodities in
            {params.slug[0].replace(/%20/g, ' ')}
          </h2>

          {/* Add this new div to display the total number of entries */}
          <div className='text-sm text-muted-foreground mb-4'>
            Total entries: {filteredData.length}
          </div>

          <div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
            <Input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full md:w-64'
            />
            <div className='flex gap-4'>
              <span className='hidden md:block'>
                <Button
                  onClick={resetFilters}
                  variant='outline'
                  className='flex items-center'
                >
                  <RotateCcw className='mr-2 h-4 w-4' />
                  Reset Filters
                </Button>
              </span>
              <Button onClick={downloadCSV} className='flex items-center'>
                <Download className='mr-2 h-4 w-4' />
                Download CSV
              </Button>
            </div>
            {/* Hide these on mobile, show on desktop */}
            <div className='hidden md:flex flex-wrap items-center gap-4'>
              <Select value={priceUnit} onValueChange={setPriceUnit}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Price unit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='kg'>Price in Kg</SelectItem>
                  <SelectItem value='quintal'>Price in Quintal</SelectItem>
                </SelectContent>
              </Select>

              {/* Add similar Select components for district, commodity, grade, and varieties */}

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
                  {commoditiesArray.map((commodity) => (
                    <SelectItem key={commodity} value={commodity}>
                      {commodity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant={'outline'}
                    className={`w-[300px] justify-start text-left font-normal ${
                      !selectedDateFrom && 'text-muted-foreground'
                    }`}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDateFrom && selectedDateTo ? (
                      <>
                        {format(selectedDateFrom, 'LLL dd, y')} -{' '}
                        {format(selectedDateTo, 'LLL dd, y')}
                      </>
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={selectedDateFrom || new Date()}
                    selected={{
                      from: selectedDateFrom,
                      to: selectedDateTo,
                    }}
                    onSelect={({ from, to }) => {
                      setSelectedDateFrom(from);
                      setSelectedDateTo(to);
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Always visible on both mobile and desktop */}
            <div className='flex flex-wrap items-center lg:gap-4 gap-2'>
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
            </div>
          </div>

          {error && <div className='text-red-500 mb-4'>{error}</div>}

          {isLoading ? (
            <>
              <div className='hidden md:block h-[600px] overflow-y-auto'>
                <TableSkeleton />
              </div>
              <div className='md:hidden'>
                <MobileCardSkeleton />
              </div>
            </>
          ) : (
            <>
              {/* Desktop view */}
              <div
                className={`hidden md:block h-[450px] ${
                  viewMode === 'scroll'
                    ? 'overflow-y-auto'
                    : 'overflow-y-scroll'
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
                        <TableCell>{item.State}</TableCell>
                        <TableCell>{item.District}</TableCell>
                        <TableCell>{item.Market}</TableCell>
                        <TableCell>
                          <div className='flex items-center'>
                            <Image
                              src={getCommodityImage(item.Commodity)}
                              alt={item.Commodity}
                              width={20}
                              height={20}
                              className='mr-2'
                            />
                            {item.Commodity}
                          </div>
                        </TableCell>
                        <TableCell>{item.Variety}</TableCell>
                        <TableCell>{item.Grade}</TableCell>
                        <TableCell>{item.Arrival_Date}</TableCell>
                        <TableCell>
                          {formatPrice(item.Min_Price)}/
                          <span className='text-xs'>{priceUnit}</span>
                        </TableCell>
                        <TableCell>
                          {formatPrice(item.Max_Price)}/
                          <span className='text-xs'>{priceUnit}</span>
                        </TableCell>
                        <TableCell>
                          {formatPrice(item.Modal_Price)}/
                          <span className='text-xs '>{priceUnit}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className='md:hidden space-y-4'>
                {getCurrentPageData().map((item, index) => (
                  <Card key={index} className='overflow-hidden'>
                    <CardHeader className='p-4'>
                      <CardTitle className='text-lg flex items-center space-x-2'>
                        <span className='truncate'>
                          {`${(currentPage - 1) * itemsPerPage + index + 1}. ${
                            item.Commodity
                          }`}
                        </span>
                        <Image
                          src={getCommodityImage(item.Commodity)}
                          alt={item.Commodity}
                          width={24}
                          height={24}
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 pt-0'>
                      <div className='grid grid-cols-2 gap-y-3'>
                        <DataItem label='State' value={item.State} />
                        <DataItem label='District' value={item.District} />
                        <DataItem label='Market' value={item.Market} />
                        <DataItem label='Variety' value={item.Variety} />
                        <DataItem label='Grade' value={item.Grade} />
                        <DataItem
                          label='Arrival Date'
                          value={item.Arrival_Date}
                        />
                      </div>
                      <div className='mt-4 grid grid-cols-3 gap-2 bg-muted p-2 rounded-md'>
                        <PriceItem
                          label='Min'
                          value={formatPrice(item.Min_Price)}
                          unit={priceUnit}
                        />
                        <PriceItem
                          label='Max'
                          value={formatPrice(item.Max_Price)}
                          unit={priceUnit}
                        />
                        <PriceItem
                          label='Modal'
                          value={formatPrice(item.Modal_Price)}
                          unit={priceUnit}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {viewMode === 'paginated' && filteredData.length > 0 && (
                <Pagination className='mt-4 w-full flex lg:justify-end cursor-pointer'>
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
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        disabled={
                          currentPage === totalPages ||
                          filteredData.length === 0
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>

        {/* Mobile filter drawer */}
        <div className='md:hidden'>
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='fixed bottom-5 right-5 z-50'
              >
                <Filter className='h-4 w-4 text-purple-500' />
              </Button>
            </SheetTrigger>
            <SheetContent side='bottom' className='h-[80vh] overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Adjust your search filters here
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Page;
