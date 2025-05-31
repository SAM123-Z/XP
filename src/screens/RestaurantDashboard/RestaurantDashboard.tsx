import React, { useState } from 'react';
import { Ban as Bar, ChevronDown, ChevronUp, Menu, Star, X, Home, ShoppingBag, Package, Store, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Chart from 'react-apexcharts';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { cn } from '../../lib/utils';

interface OrderStats {
  confirmed: number;
  cooking: number;
  readyForDelivery: number;
  onTheWay: number;
  delivered: number;
  refunded: number;
  scheduled: number;
  total: number;
}

interface TopSellingFood {
  id: number;
  name: string;
  image: string;
  soldCount: number;
  inStock: boolean;
}

interface TopRatedFood {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: TopSellingFood | TopRatedFood | null;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  count?: number;
  subItems?: { name: string; count?: number }[];
}

const ProductDialog = ({ isOpen, onClose, product }: ProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="relative rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-1 bg-white rounded-full z-10"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">
              {product.inStock ? "This product is in stock." : "This product is out of stock."}
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 text-blue-600 hover:text-blue-700"
                onClick={() => {
                  onClose();
                }}
              >
                Remind me later
              </Button>
              <Button
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  onClose();
                }}
              >
                Click To View
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const RestaurantDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState<TopSellingFood | TopRatedFood | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'ORDER MANAGEMENT',
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
        { name: 'All', count: 63 },
        { name: 'Cooking', count: 0 },
        { name: 'Pending', count: 35 },
        { name: 'Confirmed', count: 1 },
        { name: 'Ready For Delivery', count: 1 },
        { name: 'Food On The Way', count: 1 },
        { name: 'Delivered', count: 23 },
        { name: 'Payment Failed', count: 0 },
        { name: 'Canceled', count: 0 },
      ]
    },
    {
      name: 'FOOD MANAGEMENT',
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { name: 'Categories' },
        { name: 'Add New' },
        { name: 'List', count: 20 },
      ]
    },
    {
      name: 'PROFIL DU RESTAU',
      icon: <Store className="h-5 w-5" />,
      subItems: [
        { name: 'My Shop' },
      ]
    },
  ];

  const orderStats: OrderStats = {
    confirmed: 1,
    cooking: 0,
    readyForDelivery: 1,
    onTheWay: 1,
    delivered: 23,
    refunded: 0,
    scheduled: 1,
    total: 68
  };

  const topSellingFoods: TopSellingFood[] = [
    {
      id: 1,
      name: "Medu Vada",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      soldCount: 9,
      inStock: true
    },
    {
      id: 2,
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      soldCount: 5,
      inStock: false
    },
    {
      id: 3,
      name: "Chicken Shawarma",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      soldCount: 2,
      inStock: true
    }
  ];

  const topRatedFoods: TopRatedFood[] = [
    {
      id: 4,
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      rating: 4.5,
      reviews: 3,
      inStock: true
    },
    {
      id: 5,
      name: "Masala Poori",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      rating: 0,
      reviews: 0,
      inStock: false
    },
    {
      id: 6,
      name: "Idli",
      image: "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg",
      rating: 0,
      reviews: 0,
      inStock: true
    }
  ];

  const handleProductClick = (product: TopSellingFood | TopRatedFood) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const chartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: '$ (Currency Symbol)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val
        }
      }
    },
    colors: ['#4318FF', '#6AD2FF']
  };

  const chartSeries = [
    {
      name: 'Commission given',
      data: [182, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Total earning',
      data: [1634, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#2D2D2D] text-white transition-all duration-300",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/hungry-puppets-logo.png" alt="Logo" className="w-8 h-8" />
            {!isSidebarCollapsed && <span className="font-bold">Hungry Puppets</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-white hover:bg-gray-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <div className={cn(
                "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer",
                !isSidebarCollapsed && "space-x-2"
              )}>
                {item.icon}
                {!isSidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.count !== undefined && (
                      <span className="bg-blue-500 px-2 py-0.5 rounded-full text-xs">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!isSidebarCollapsed && item.subItems && (
                <div className="pl-10 pr-4">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between py-2 text-sm text-gray-400 hover:text-white cursor-pointer"
                    >
                      <span>{subItem.name}</span>
                      {subItem.count !== undefined && (
                        <span className="bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {subItem.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bar className="h-6 w-6" />
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-white rounded-lg border px-4 py-2">
                <option>Overall Statistics</option>
              </select>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Confirmed"
                value={orderStats.confirmed}
                bgColor="bg-green-100"
                icon={<ChevronUp className="h-4 w-4 text-green-600" />}
              />
              <StatCard
                label="Cooking"
                value={orderStats.cooking}
                bgColor="bg-pink-100"
                icon={<ChevronDown className="h-4 w-4 text-red-600" />}
              />
              <StatCard
                label="Ready for delivery"
                value={orderStats.readyForDelivery}
                bgColor="bg-orange-100"
                icon={<ChevronUp className="h-4 w-4 text-green-600" />}
              />
              <StatCard
                label="Food on the way"
                value={orderStats.onTheWay}
                bgColor="bg-red-100"
                icon={<ChevronUp className="h-4 w-4 text-green-600" />}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Delivered"
                value={orderStats.delivered}
                showIcon="🚚"
              />
              <StatCard
                label="Refunded"
                value={orderStats.refunded}
                showIcon="↩️"
              />
              <StatCard
                label="Scheduled"
                value={orderStats.scheduled}
                showIcon="📅"
              />
              <StatCard
                label="All"
                value={orderStats.total}
                showIcon="📊"
              />
            </div>

            {/* Yearly Statistics */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Yearly Statistics</h2>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#4318FF] rounded-full"></span>
                  <span>Commission given: $182.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#6AD2FF] rounded-full"></span>
                  <span>Total earning: $1,634.00</span>
                </div>
              </div>
              <div className="h-64">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height="100%"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Selling Foods */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Top Selling Foods</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topSellingFoods.map((food) => (
                    <div
                      key={food.id}
                      className="relative rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(food)}
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                        <p className="text-sm font-medium">{food.name}</p>
                        <p className="text-xs">Sold: {food.soldCount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Rated Foods */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Top Rated Foods</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topRatedFoods.map((food) => (
                    <div
                      key={food.id}
                      className="bg-white rounded-lg p-4 shadow cursor-pointer"
                      onClick={() => handleProductClick(food)}
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-medium text-sm mb-1">{food.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{food.rating}</span>
                        <span className="text-xs text-gray-500">
                          ({food.reviews} Reviews)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

const StatCard = ({ 
  label, 
  value, 
  bgColor,
  showIcon,
  icon
}: { 
  label: string; 
  value: number;
  bgColor?: string;
  showIcon?: string;
  icon?: React.ReactNode;
}) => (
  <div className={`${bgColor || 'bg-white'} p-4 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-600 text-sm">{label}</span>
      {showIcon && <span className="text-xl">{showIcon}</span>}
      {icon && <div className="bg-white rounded-full p-1 shadow-sm">{icon}</div>}
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);