
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CarPost } from '@/components/CarPost';
import { FinanceCalculator } from '@/components/FinanceCalculator';
import { BookingModal } from '@/components/BookingModal';
import { WriteReviewModal } from '@/components/reviews/WriteReviewModal';
import { ApplicationModal } from '@/components/applications/ApplicationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Car, Star } from 'lucide-react';

// Import car images
import heroImage from '@/assets/hero-cars.jpg';
import car1 from '@/assets/car-1.jpg';
import car2 from '@/assets/car-2.jpg';
import car3 from '@/assets/car-3.jpg';

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    car?: any;
    dealership?: any;
  }>({ isOpen: false });
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    car?: any;
    dealership?: any;
  }>({ isOpen: false });
  const [applicationModal, setApplicationModal] = useState<{
    isOpen: boolean;
    car?: any;
    dealership?: any;
  }>({ isOpen: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  // Sample car data with WhatsApp numbers
  const carPosts = [
    {
      id: '1',
      dealership: {
        name: 'Premium Motors JHB',
        location: 'Sandton, Johannesburg',
        verified: true,
        whatsapp: '+27123456789', // Add WhatsApp number
      },
      car: {
        make: 'BMW',
        model: '320i M Sport',
        year: 2022,
        price: 599000,
        mileage: 25000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        color: 'Mineral Grey',
        images: [car1],
      },
      description: 'Stunning BMW 320i M Sport in pristine condition. Full service history, premium features, and exceptional performance. Perfect for the discerning driver.',
      postedAt: '2 hours ago',
      likes: 24,
      rating: 4.5,
      reviewCount: 12,
    },
    {
      id: '2',
      dealership: {
        name: 'Cape Town Luxury Cars',
        location: 'V&A Waterfront, Cape Town',
        verified: true,
        whatsapp: '+27987654321',
      },
      car: {
        make: 'Mercedes-Benz',
        model: 'C200 AMG Line',
        year: 2023,
        price: 750000,
        mileage: 12000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        color: 'Polar White',
        images: [car2],
      },
      description: 'Immaculate Mercedes-Benz C200 with AMG styling package. Advanced safety features, luxury interior, and Mercedes reliability.',
      postedAt: '4 hours ago',
      likes: 18,
      rating: 4.8,
      reviewCount: 8,
    },
    {
      id: '3',
      dealership: {
        name: 'Pretoria Auto Elite',
        location: 'Menlyn, Pretoria',
        verified: false,
        whatsapp: '+27111222333',
      },
      car: {
        make: 'Audi',
        model: 'A4 2.0T FSI',
        year: 2021,
        price: 520000,
        mileage: 35000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        color: 'Moonlight Silver',
        images: [car3],
      },
      description: 'Well-maintained Audi A4 with excellent fuel economy and sophisticated design. Great value for luxury sedan enthusiasts.',
      postedAt: '6 hours ago',
      likes: 12,
      rating: 4.2,
      reviewCount: 5,
    },
  ];

  const applyFilters = (posts: any[], filters: any) => {
    if (!filters) return posts;

    return posts.filter(post => {
      // Price filter
      if (post.car.price < filters.priceRange[0] || post.car.price > filters.priceRange[1]) {
        return false;
      }

      // Mileage filter
      if (post.car.mileage < filters.mileageRange[0] || post.car.mileage > filters.mileageRange[1]) {
        return false;
      }

      // Year filter
      if (post.car.year < filters.yearRange[0] || post.car.year > filters.yearRange[1]) {
        return false;
      }

      // Makes filter
      if (filters.makes.length > 0 && !filters.makes.includes(post.car.make)) {
        return false;
      }

      // Fuel type filter
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(post.car.fuelType)) {
        return false;
      }

      // Transmission filter
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(post.car.transmission)) {
        return false;
      }

      // Location filter
      if (filters.locations.length > 0) {
        const matchesLocation = filters.locations.some((location: string) => 
          post.dealership.location.includes(location)
        );
        if (!matchesLocation) return false;
      }

      // Verified filter
      if (filters.verified && !post.dealership.verified) {
        return false;
      }

      return true;
    });
  };

  let filteredPosts = carPosts.filter(post => 
    searchQuery === '' || 
    post.car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.dealership.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply advanced filters
  filteredPosts = applyFilters(filteredPosts, appliedFilters);

  const handleBooking = (car: any, dealership: any) => {
    setBookingModal({
      isOpen: true,
      car,
      dealership,
    });
  };

  const handleWriteReview = (car: any, dealership: any) => {
    setReviewModal({
      isOpen: true,
      car,
      dealership,
    });
  };

  const handleApply = (car: any, dealership: any) => {
    setApplicationModal({
      isOpen: true,
      car,
      dealership,
    });
  };

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleFinance = (car: any) => {
    setShowCalculator(true);
  };

  const handleFiltersChange = (filters: any) => {
    setAppliedFilters(filters);
  };

  if (showCalculator) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          onSearchChange={setSearchQuery}
          onShowCalculator={() => setShowCalculator(true)}
          onFiltersChange={handleFiltersChange}
        />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setShowCalculator(false)}
            className="mb-6 text-foreground hover:text-orange"
          >
            ← Back to Feed
          </Button>
          <FinanceCalculator />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onSearchChange={setSearchQuery}
        onShowCalculator={() => setShowCalculator(true)}
        onFiltersChange={handleFiltersChange}
      />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={heroImage}
          alt="Car Mzansi Ride Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Car Mzansi
                <span className="block text-orange font-bold">RIDE HUB</span>
              </h1>
              <p className="text-xl text-foreground/90 mb-8">
                South Africa's premier social platform for car enthusiasts, dealerships, and buyers.
              </p>
              <div className="flex gap-4">
                <Button variant="orange" size="lg" className="shadow-orange-glow">
                  Browse Cars
                </Button>
                <Button variant="orange-outline" size="lg">
                  Join Dealership
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-card border-border text-center shadow-elegant hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <Car className="w-8 h-8 text-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">Cars Listed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center shadow-elegant hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground">Dealerships</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center shadow-elegant hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center shadow-elegant hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">4.8/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Car Feed */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Latest Cars</h2>
            {(searchQuery || appliedFilters) && (
              <p className="text-muted-foreground">
                {searchQuery && `Showing results for "${searchQuery}"`}
                {appliedFilters && " with filters applied"}
              </p>
            )}
          </div>

          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <CarPost
                key={post.id}
                {...post}
                onLike={() => handleLike(post.id)}
                onBook={() => handleBooking(post.car, post.dealership)}
                onFinance={() => handleFinance(post.car)}
                onWriteReview={() => handleWriteReview(post.car, post.dealership)}
                onApply={() => handleApply(post.car, post.dealership)}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (searchQuery || appliedFilters) && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No cars found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters, or browse all cars.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false })}
        car={bookingModal.car}
        dealership={bookingModal.dealership}
      />

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false })}
        car={reviewModal.car}
        dealership={reviewModal.dealership}
      />

      {/* Application Modal */}
      <ApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={() => setApplicationModal({ isOpen: false })}
        car={applicationModal.car}
        dealership={applicationModal.dealership}
      />
    </div>
  );
};

export default Index;
