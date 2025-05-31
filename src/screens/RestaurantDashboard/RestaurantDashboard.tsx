import React from 'react';
import { Bar, ChevronDown, ChevronUp, Menu, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Chart from 'react-apexcharts';

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
  name: string;
  image: string;
  soldCount: number;
}

interface TopRatedFood {
  name: string;
  image: string;
  rating: number;
  reviews: number;
}

export const RestaurantDashboard = () => {
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
      name: "Medu Vada",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      soldCount: 9
    },
    {
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      soldCount: 5
    },
    {
      name: "Chicken Shawarma",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      soldCount: 2
    }
  ];

  const topRatedFoods: TopRatedFood[] = [
    {
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      rating: 4.5,
      reviews: 3
    },
    {
      name: "Masala Poori",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      rating: 0,
      reviews: 0
    },
    {
      name: "Idli",
      image: "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg",
      rating: 0,
      reviews: 0
    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4">
              <Menu className="h-6 w-6" />
            </Button>
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
                {topSellingFoods.map((food, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
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
                {topRatedFoods.map((food, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow">
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