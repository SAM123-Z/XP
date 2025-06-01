import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { Ban as Bar, ChevronDown, Menu, Home, ShoppingBag, Package, Store } from 'lucide-react';
import { BasicInformation, ChangePassword, OrdersList, FoodList, Categories } from './pages';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  count?: number;
  subItems?: { name: string; path: string; count?: number }[];
}

export const RestaurantDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('dashboard');

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      path: '/restaurant-dashboard'
    },
    {
      name: 'ORDER MANAGEMENT',
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
        { name: 'All', path: '/restaurant-dashboard/orders', count: 63 },
        { name: 'Cooking', path: '/restaurant-dashboard/orders?status=cooking', count: 0 },
        { name: 'Pending', path: '/restaurant-dashboard/orders?status=pending', count: 35 },
        { name: 'Confirmed', path: '/restaurant-dashboard/orders?status=confirmed', count: 1 },
        { name: 'Ready For Delivery', path: '/restaurant-dashboard/orders?status=ready', count: 1 },
        { name: 'Food On The Way', path: '/restaurant-dashboard/orders?status=on-way', count: 1 },
        { name: 'Delivered', path: '/restaurant-dashboard/orders?status=delivered', count: 23 },
        { name: 'Payment Failed', path: '/restaurant-dashboard/orders?status=failed', count: 0 },
        { name: 'Canceled', path: '/restaurant-dashboard/orders?status=canceled', count: 0 },
      ]
    },
    {
      name: 'FOOD MANAGEMENT',
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { name: 'Categories', path: '/restaurant-dashboard/categories' },
        { name: 'Add New', path: '/restaurant-dashboard/food/new' },
        { name: 'List', path: '/restaurant-dashboard/food', count: 20 },
      ]
    },
    {
      name: 'PROFIL DU RESTAU',
      icon: <Store className="h-5 w-5" />,
      subItems: [
        { name: 'Basic Information', path: '/restaurant-dashboard/profile' },
        { name: 'Change Password', path: '/restaurant-dashboard/change-password' },
      ]
    },
  ];

  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/restaurant-dashboard/profile':
        return <BasicInformation />;
      case '/restaurant-dashboard/change-password':
        return <ChangePassword />;
      case '/restaurant-dashboard/orders':
        return <OrdersList />;
      case '/restaurant-dashboard/food':
        return <FoodList />;
      case '/restaurant-dashboard/categories':
        return <Categories />;
      default:
        return <OrdersList />;
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setActivePage(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#2D2D2D] text-white transition-all duration-300 h-screen",
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
              <div 
                className={cn(
                  "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer",
                  !isSidebarCollapsed && "space-x-2",
                  item.path && location.pathname === item.path && "bg-gray-700"
                )}
                onClick={() => item.path && handleNavigation(item.path)}
              >
                {item.icon}
                {!isSidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.count !== undefined && (
                      <span className="bg-blue-500 px-2 py-0.5 rounded-full text-xs">
                        {item.count}
                      </span>
                    )}
                    {item.subItems && <ChevronDown className="h-4 w-4" />}
                  </>
                )}
              </div>
              {!isSidebarCollapsed && item.subItems && (
                <div className="pl-10 pr-4">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={cn(
                        "flex items-center justify-between py-2 text-sm text-gray-400 hover:text-white cursor-pointer",
                        location.pathname === subItem.path && "text-white"
                      )}
                      onClick={() => handleNavigation(subItem.path)}
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
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};