import { Heart, MapPin, Calendar, Fuel, Settings, Eye, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarPostProps {
  id: string;
  dealership: {
    name: string;
    location: string;
    verified: boolean;
  };
  car: {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    color: string;
    images: string[];
  };
  description: string;
  postedAt: string;
  likes: number;
  onLike: () => void;
  onBook: () => void;
  onFinance: () => void;
}

export const CarPost = ({
  dealership,
  car,
  description,
  postedAt,
  likes,
  onLike,
  onBook,
  onFinance,
}: CarPostProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString('en-ZA')} km`;
  };

  return (
    <Card className="overflow-hidden bg-gradient-card border-border/50 shadow-elegant hover:shadow-premium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {dealership.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{dealership.name}</h3>
                {dealership.verified && (
                  <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {dealership.location}
              </div>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{postedAt}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Car Image */}
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-background/90 text-foreground border-border/50">
              {car.year}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold">
              {formatPrice(car.price)}
            </Badge>
          </div>
        </div>

        {/* Car Details */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {car.make} {car.model}
          </h2>
          <p className="text-muted-foreground mb-4">{description}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Fuel className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{car.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{car.transmission}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-4 h-4 rounded-full bg-muted border-2 border-border" />
              <span className="text-foreground">{car.color}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onLike} className="text-muted-foreground hover:text-red-500">
              <Heart className="w-4 h-4 mr-1" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onFinance}>
              Finance
            </Button>
            <Button variant="premium" size="sm" onClick={onBook}>
              Book Test Drive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};