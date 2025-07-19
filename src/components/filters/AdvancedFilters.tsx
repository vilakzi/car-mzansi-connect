
import { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface FilterState {
  priceRange: [number, number];
  mileageRange: [number, number];
  yearRange: [number, number];
  makes: string[];
  fuelTypes: string[];
  transmissions: string[];
  locations: string[];
  verified: boolean;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const carMakes = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Nissan', 
    'Ford', 'Volkswagen', 'Mazda', 'Hyundai', 'Kia', 'Volvo'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['Manual', 'Automatic', 'CVT'];
  const locations = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 
    'Port Elizabeth', 'Bloemfontein', 'East London', 'Kimberley'
  ];

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  };

  const handleMileageChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, mileageRange: [value[0], value[1]] }));
  };

  const handleYearChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, yearRange: [value[0], value[1]] }));
  };

  const handleMakeToggle = (make: string) => {
    setFilters(prev => ({
      ...prev,
      makes: prev.makes.includes(make)
        ? prev.makes.filter(m => m !== make)
        : [...prev.makes, make]
    }));
  };

  const handleFilterToggle = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: (prev[filterType] as string[]).includes(value)
        ? (prev[filterType] as string[]).filter(item => item !== value)
        : [...(prev[filterType] as string[]), value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 2000000],
      mileageRange: [0, 200000],
      yearRange: [2015, 2024],
      makes: [],
      fuelTypes: [],
      transmissions: [],
      locations: [],
      verified: false,
    };
    setFilters(resetFilters);
  };

  const getActiveFiltersCount = () => {
    return (
      filters.makes.length +
      filters.fuelTypes.length +
      filters.transmissions.length +
      filters.locations.length +
      (filters.verified ? 1 : 0)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-end">
      <Card className="w-full max-w-md h-full rounded-none bg-card border-l border-border shadow-premium overflow-y-auto">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-foreground">
              <Filter className="w-5 h-5 mr-2 text-orange" />
              Advanced Filters
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 bg-orange text-orange-foreground">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Price Range</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={2000000}
              min={0}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R{filters.priceRange[0].toLocaleString()}</span>
              <span>R{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Mileage Range */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Mileage (km)</Label>
            <Slider
              value={filters.mileageRange}
              onValueChange={handleMileageChange}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.mileageRange[0].toLocaleString()} km</span>
              <span>{filters.mileageRange[1].toLocaleString()} km</span>
            </div>
          </div>

          {/* Year Range */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Year</Label>
            <Slider
              value={filters.yearRange}
              onValueChange={handleYearChange}
              max={2024}
              min={2015}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
          </div>

          {/* Car Makes */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Car Makes</Label>
            <div className="grid grid-cols-2 gap-2">
              {carMakes.map(make => (
                <div key={make} className="flex items-center space-x-2">
                  <Checkbox
                    id={make}
                    checked={filters.makes.includes(make)}
                    onCheckedChange={() => handleMakeToggle(make)}
                  />
                  <Label
                    htmlFor={make}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {make}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Fuel Type</Label>
            <div className="space-y-2">
              {fuelTypes.map(fuel => (
                <div key={fuel} className="flex items-center space-x-2">
                  <Checkbox
                    id={fuel}
                    checked={filters.fuelTypes.includes(fuel)}
                    onCheckedChange={() => handleFilterToggle('fuelTypes', fuel)}
                  />
                  <Label
                    htmlFor={fuel}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {fuel}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Transmission</Label>
            <div className="space-y-2">
              {transmissions.map(transmission => (
                <div key={transmission} className="flex items-center space-x-2">
                  <Checkbox
                    id={transmission}
                    checked={filters.transmissions.includes(transmission)}
                    onCheckedChange={() => handleFilterToggle('transmissions', transmission)}
                  />
                  <Label
                    htmlFor={transmission}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {transmission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Location</Label>
            <div className="space-y-2">
              {locations.map(location => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() => handleFilterToggle('locations', location)}
                  />
                  <Label
                    htmlFor={location}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Dealerships */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => 
                setFilters(prev => ({ ...prev, verified: !!checked }))
              }
            />
            <Label
              htmlFor="verified"
              className="text-sm text-foreground cursor-pointer"
            >
              Verified Dealerships Only
            </Label>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <div className="border-t border-border p-6 space-y-3">
          <Button
            onClick={handleApply}
            className="w-full bg-orange hover:bg-orange/90 text-orange-foreground shadow-orange-glow"
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="ghost"
            className="w-full text-foreground hover:text-orange"
          >
            Reset All Filters
          </Button>
        </div>
      </Card>
    </div>
  );
};
