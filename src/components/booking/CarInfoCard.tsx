
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CarInfoCardProps {
  car: {
    make: string;
    model: string;
    year: number;
  };
  dealership: {
    name: string;
    location: string;
  };
}

export function CarInfoCard({ car, dealership }: CarInfoCardProps) {
  return (
    <Card className="bg-muted/50 border-0">
      <CardContent className="p-4">
        <h3 className="font-semibold">{car.year} {car.make} {car.model}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="w-3 h-3" />
          {dealership.name}, {dealership.location}
        </div>
      </CardContent>
    </Card>
  );
}
