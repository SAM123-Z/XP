import React from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

export const BasicInformation = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Informations de base</h1>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              defaultValue="Yacin"
              className="rounded-lg border-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              defaultValue="Nicay"
              className="rounded-lg border-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Téléphone <span className="text-gray-500">(Optionnel)</span>
          </Label>
          <Input
            id="phone"
            defaultValue="0606060606"
            className="rounded-lg border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue="y**********@gmail.com"
            className="rounded-lg border-2"
            disabled
          />
        </div>

        <div className="flex justify-end">
          <Button 
            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
          >
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};