import React, { useState } from 'react';
import { Ban as Bar, ChevronDown, ChevronUp, Menu, Star, X, Home, ShoppingBag, Package, Store } from 'lucide-react';
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
            className="absolute right-2 top-2 p-1 bg-white rounded-full z-10 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">
              {product.inStock ? "Ce produit est en stock." : "Ce produit est en rupture de stock."}
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 text-[#ff6600] hover:text-[#ff6600]/80 border-[#ff6600]"
                onClick={onClose}
              >
                Me le rappeler plus tard
              </Button>
              <Button
                className="flex-1 bg-[#ff6600] text-white hover:bg-[#ff6600]/90"
                onClick={onClose}
              >
                Voir les détails
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboard']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'GESTION DES COMMANDES',
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
        { name: 'Toutes', count: 63 },
        { name: 'En cours', count: 0 },
        { name: 'En attente', count: 35 },
        { name: 'Confirmées', count: 1 },
        { name: 'Prêtes', count: 1 },
        { name: 'En livraison', count: 1 },
        { name: 'Livrées', count: 23 },
        { name: 'Échec paiement', count: 0 },
        { name: 'Annulées', count: 0 },
      ]
    },
    {
      name: 'GESTION DES PLATS',
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { name: 'Catégories' },
        { name: 'Ajouter nouveau' },
        { name: 'Liste', count: 20 },
      ]
    },
    {
      name: 'PROFIL DU RESTAURANT',
      icon: <Store className="h-5 w-5" />,
      subItems: [
        { name: 'Mon restaurant' },
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
      name: "Pizza Viande",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      soldCount: 5,
      inStock: false
    },
    {
      id: 3,
      name: "Shawarma Poulet",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      soldCount: 2,
      inStock: true
    }
  ];

  const topRatedFoods: TopRatedFood[] = [
    {
      id: 4,
      name: "Pizza Viande",
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
      },
      height: '100%',
      width: '100%',
      fontFamily: 'Poppins, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
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
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif',
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Montant (€)',
        style: {
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif',
        },
        formatter: (value: number) => `${value.toFixed(0)}€`
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        opacityFrom: 0.9,
        opacityTo: 0.6,
      }
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toFixed(2) + "€"
        }
      },
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif'
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: ['#4318FF', '#6AD2FF'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom',
          offsetY: 7
        }
      }
    }]
  };

  const chartSeries = [
    {
      name: 'Commission',
      data: [182, 145, 198, 167, 145, 198, 167, 145, 198, 167, 145, 198]
    },
    {
      name: 'Revenu total',
      data: [1634, 1458, 1847, 1458, 1634, 1458, 1847, 1458, 1634, 1458, 1847, 1458]
    }
  ];

  const renderMenuItem = (item: SidebarItem, isNested: boolean = false) => {
    const isExpanded = expandedSections.includes(item.name);
    const isActive = activeMenuItem === item.name;

    return (
      <div key={item.name} className={cn(
        "transition-all duration-200",
        isNested && "ml-4"
      )}>
        <div
          onClick={() => {
            setActiveMenuItem(item.name);
            if (item.subItems) toggleSection(item.name);
          }}
          className={cn(
            "flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
            isActive 
              ? "bg-[#ff6600] text-white" 
              : "text-gray-300 hover:bg-gray-700",
            !isSidebarCollapsed && "space-x-3"
          )}
        >
          <div className={cn(
            "flex items-center",
            !isSidebarCollapsed && "w-full"
          )}>
            <span className={cn(
              "p-2 rounded-lg",
              isActive && "bg-white/20"
            )}>
              {item.icon}
            </span>
            {!isSidebarCollapsed && (
              <>
                <span className="ml-3 flex-1 text-sm font-medium">{item.name}</span>
                {item.subItems && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded && "transform rotate-180"
                  )} />
                )}
              </>
            )}
          </div>
        </div>

        {!isSidebarCollapsed && item.subItems && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.subItems.map((subItem, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between py-2 px-4 rounded-lg text-sm",
                  "transition-all duration-200 cursor-pointer",
                  "text-gray-400 hover:text-white hover:bg-gray-700/50"
                )}
              >
                <span className="ml-8">{subItem.name}</span>
                {subItem.count !== undefined && (
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    subItem.count > 0 ? "bg-[#ff6600] text-white" : "bg-gray-700 text-gray-300"
                  )}>
                    {subItem.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden md:flex flex-col bg-[#2D2D2D] text-white transition-all duration-300 h-screen sticky top-0",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img src="/hungry-puppets-logo.png" alt="Logo" className="w-8 h-8" />
            {!isSidebarCollapsed && (
              <span className="font-bold text-lg">Hungry Puppets</span>
            )}
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

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sidebarItems.map(item => renderMenuItem(item))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#ff6600] flex items-center justify-center">
              <span className="text-white font-semibold">HP</span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <p className="text-sm font-medium text-white">Hungry Puppets</p>
                <p className="text-xs text-gray-400">Restaurant Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2D2D2D] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 bg-[#2D2D2D] text-white w-64 transform transition-transform duration-300 ease-in-out md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <img src="/hungry-puppets-logo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">Hungry Puppets</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {sidebarItems.map(item => renderMenuItem(item))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#ff6600] flex items-center justify-center">
                <span className="text-white font-semibold">HP</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Hungry Puppets</p>
                <p className="text-xs text-gray-400">Restaurant Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 md:ml-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Order Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Confirmées"
              value={orderStats.confirmed}
              bgColor="bg-green-100"
              icon={<ChevronUp className="h-4 w-4 text-green-600" />}
            />
            <StatCard
              label="En cours"
              value={orderStats.cooking}
              bgColor="bg-pink-100"
              icon={<ChevronDown className="h-4 w-4 text-red-600" />}
            />
            <StatCard
              label="Prêtes"
              value={orderStats.readyForDelivery}
              bgColor="bg-orange-100"
              icon={<ChevronUp className="h-4 w-4 text-green-600" />}
            />
            <StatCard
              label="En route"
              value={orderStats.onTheWay}
              bgColor="bg-red-100"
              icon={<ChevronUp className="h-4 w-4 text-green-600" />}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Livrées"
              value={orderStats.delivered}
              showIcon="🚚"
            />
            <StatCard
              label="Remboursées"
              value={orderStats.refunded}
              showIcon="↩️"
            />
            <StatCard
              label="Planifiées"
              value={orderStats.scheduled}
              showIcon="📅"
            />
            <StatCard
              label="Total"
              value={orderStats.total}
              showIcon="📊"
            />
          </div>

          {/* Yearly Statistics */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Statistiques annuelles</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span className="w-3 h-3 bg-[#4318FF] rounded-full"></span>
                <span>Commission : 182.00€</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#6AD2FF] rounded-full"></span>
                <span>Revenu total : 1,634.00€</span>
              </div>
            </div>
            <div className="h-[300px] md:h-[400px]">
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
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Plats les plus vendus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topSellingFoods.map((food) => (
                  <div
                    key={food.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleProductClick(food)}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white p-2">
                      <p className="text-sm font-medium truncate">{food.name}</p>
                      <p className="text-xs">Vendus : {food.soldCount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Rated Foods */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Plats les mieux notés</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topRatedFoods.map((food) => (
                  <div
                    key={food.id}
                    className="bg-white rounded-lg p-4 shadow-sm cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleProductClick(food)}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                      loading="lazy"
                    />
                    <h3 className="font-medium text-sm mb-1 truncate">{food.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{food.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({food.reviews} avis)
                      </span>
                    </div>
                  </div>
                ))}
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
  <div className={`${bgColor || 'bg-white'} p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-600 text-sm truncate">{label}</span>
      {showIcon && <span className="text-xl">{showIcon}</span>}
      {icon && <div className="bg-white rounded-full p-1 shadow-sm">{icon}</div>}
    </div>
    <p className="text-xl md:text-2xl font-bold mt-2">{value}</p>
  </div>
);