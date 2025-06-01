import { useState } from 'react';
import { 
  BasicInformation,
  ChangePassword,
  OrdersList,
  FoodList,
  Categories
} from './pages';

export const RestaurantDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Dashboard':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Contenu existant du dashboard... */}
          </div>
        );
      case 'GESTION DES COMMANDES':
        return <OrdersList />;
      case 'GESTION DES PLATS':
        return <FoodList />;
      case 'Categories':
        return <Categories />;
      case 'PROFIL DU RESTAURANT':
        return (
          <div className="space-y-6">
            <BasicInformation />
            <ChangePassword />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 md:ml-0 transition-all duration-300">
      {renderContent()}
    </div>
  );
};