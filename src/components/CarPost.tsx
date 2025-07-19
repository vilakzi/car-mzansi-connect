import { Heart, MapPin, Calendar, Fuel, Settings, Eye, MessageCircle, Share2, CheckCircle, Star, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { openWhatsApp, generateCarInquiryMessage } from '@/utils/whatsapp';

interface CarPostProps {
  id: string;
  dealership: {
    name: string;
    location: string;
    verified: boolean;
    whatsapp?: string;
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
  rating?: number;
  reviewCount?: number;
  onLike: () => void;
  onBook: () => void;
  onFinance: () => void;
  onWriteReview?: () => void;
  onApply?: () => void;
}

export const CarPost = ({
  id,
  dealership,
  car,
  description,
  postedAt,
  likes,
  rating = 0,
  reviewCount = 0,
  onLike,
  onBook,
  onFinance,
  onWriteReview,
  onApply,
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-orange text-orange' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const handleWhatsAppClick = () => {
    if (dealership.whatsapp) {
      const message = generateCarInquiryMessage(car, dealership);
      openWhatsApp(dealership.whatsapp, message);
    }
  };

  return (
    <Card className="overflow-hidden bg-card border-border shadow-elegant hover:shadow-premium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center shadow-orange-glow">
              <span className="text-orange-foreground font-bold text-lg">
                {dealership.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{dealership.name}</h3>
                {dealership.verified && (
                  <Badge className="text-xs bg-blue-600 text-white border-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
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
          <div className="flex items-center space-x-2">
            <WishlistButton carId={id} variant="icon" />
            <span className="text-sm text-muted-foreground">{postedAt}</span>
          </div>
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
            <Badge className="bg-background/90 text-foreground border-border">
              {car.year}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-orange text-orange-foreground font-bold shadow-orange-glow">
              {formatPrice(car.price)}
            </Badge>
          </div>
        </div>

        {/* Car Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">
              {car.make} {car.model}
            </h2>
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(Math.round(rating))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {rating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground mb-4">{description}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-orange" />
              <span className="text-foreground">{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Fuel className="w-4 h-4 text-orange" />
              <span className="text-foreground">{car.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Settings className="w-4 h-4 text-orange" />
              <span className="text-foreground">{car.transmission}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-4 h-4 rounded-full bg-orange border-2 border-orange-light" />
              <span className="text-foreground">{car.color}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onLike} className="text-muted-foreground hover:text-red-500">
              <Heart className="w-4 h-4 mr-1" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
            {onWriteReview && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onWriteReview}
                className="text-muted-foreground hover:text-orange"
              >
                <Star className="w-4 h-4 mr-1" />
                Review
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>

          <div className="flex space-x-2">
            {dealership.whatsapp && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleWhatsAppClick}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            )}
            
            {onApply && (
              <Button 
                variant="orange-outline" 
                size="sm" 
                onClick={onApply}
              >
                <FileText className="w-4 h-4 mr-1" />
                Apply
              </Button>
            )}
            
            <Button variant="orange-outline" size="sm" onClick={onFinance}>
              Finance
            </Button>
            <Button variant="orange" size="sm" onClick={onBook} className="shadow-orange-glow">
              Book Test Drive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
